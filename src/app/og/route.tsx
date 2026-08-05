import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/config/site.config";

import { getOgAccent, getOgProductName, OG_COLORS, OG_SIZE } from "@/lib/og";

export const runtime = "nodejs";

const MAX_DESCRIPTION = 160;

function truncate(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

async function loadFonts() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [regular, medium, bold, black, mediumItalic] = await Promise.all([
    readFile(join(fontsDir, "Inter-Regular.ttf")),
    readFile(join(fontsDir, "Inter-Medium.ttf")),
    readFile(join(fontsDir, "Inter-Bold.ttf")),
    readFile(join(fontsDir, "Inter-Black.ttf")),
    readFile(join(fontsDir, "Inter-MediumItalic.ttf")),
  ]);

  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: black, weight: 900 as const, style: "normal" as const },
    { name: "Inter", data: mediumItalic, weight: 500 as const, style: "italic" as const },
  ];
}

async function loadLogoDataUrl(): Promise<string> {
  const logo = await readFile(join(process.cwd(), "public/logo-icon.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title")?.trim() || null;
  const description = truncate(
    searchParams.get("description")?.trim() || siteConfig.description,
    MAX_DESCRIPTION,
  );
  const product = searchParams.get("product");
  const path = searchParams.get("path")?.trim() || "";
  const productName = getOgProductName(product);
  const accent = getOgAccent(product);
  const footerUrl = `virastack.com${path.startsWith("/") || path === "" ? path : `/${path}`}`;

  const isProductLanding =
    Boolean(productName) && (!title || title === productName || title === siteConfig.name);
  const pageTitle = !isProductLanding && title && title !== siteConfig.name ? title : null;

  const [fonts, logoSrc] = await Promise.all([loadFonts(), loadLogoDataUrl()]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: OG_COLORS.background,
        color: OG_COLORS.foreground,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "64px 72px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires raw img */}
          <img src={logoSrc} width={48} height={48} alt="" style={{ borderRadius: 10 }} />
          <div
            style={{
              marginLeft: 16,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: OG_COLORS.foreground,
            }}
          >
            {siteConfig.brandMark}
          </div>
          {productName && pageTitle ? (
            <div
              style={{
                marginLeft: 20,
                fontSize: 24,
                fontWeight: 500,
                fontStyle: "italic",
                color: accent,
              }}
            >
              {productName}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          {isProductLanding ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                {siteConfig.name}
              </div>
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: accent,
                  marginTop: 4,
                }}
              >
                {productName}
              </div>
            </div>
          ) : pageTitle ? (
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {pageTitle}
            </div>
          ) : (
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {siteConfig.name}
            </div>
          )}

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.35,
              color: OG_COLORS.muted,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 500,
            color: OG_COLORS.muted,
          }}
        >
          <div>Frontend toolkit</div>
          <div>{footerUrl}</div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 14,
          backgroundColor: accent,
        }}
      />
    </div>,
    {
      ...OG_SIZE,
      fonts,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=3600",
      },
    },
  );
}
