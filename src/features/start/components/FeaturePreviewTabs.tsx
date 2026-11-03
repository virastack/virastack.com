"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureCodeViewer } from "@/features/start/components/FeatureCodeViewer";
import { getPathname } from "@/i18n/routing";

type View = "preview" | "code";

/** Phone below Tailwind's `sm` (640px), tablet at `md` (768px), desktop as wide as the page. */
const DEVICES = [
  { id: "mobile", width: "375px", Icon: SmartphoneIcon },
  { id: "tablet", width: "768px", Icon: TabletIcon },
  { id: "desktop", width: "100%", Icon: MonitorIcon },
] as const;

type Device = (typeof DEVICES)[number]["id"];

/** Room for the demo's dialogs while its content is still short or loading. */
const MIN_FRAME_HEIGHT = 560;

/** The demo page in an iframe, so its breakpoints follow the frame width; its height follows the content. */
function FeaturePreviewFrame({ src, width, title }: { src: string; width: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_FRAME_HEIGHT);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;

    const observe = () => {
      observer?.disconnect();
      const frameWindow = frame.contentWindow as (Window & typeof globalThis) | null;
      const root = frame.contentDocument?.querySelector("[data-feature-preview]");
      if (!frameWindow || !root) return;

      // The frame's own `ResizeObserver`, since the element lives in its document.
      observer = new frameWindow.ResizeObserver(() => {
        const contentHeight = Math.ceil(root.getBoundingClientRect().height);
        // A hidden tab measures 0; keep the last height until it shows again.
        if (contentHeight > 0) setHeight(Math.max(contentHeight, MIN_FRAME_HEIGHT));
      });
      observer.observe(root);
    };

    observe();
    frame.addEventListener("load", observe);

    return () => {
      frame.removeEventListener("load", observe);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-center overflow-hidden rounded-2xl border border-border bg-muted/30">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        height={height}
        style={{ maxWidth: width }}
        className={cn(
          "block w-full bg-background transition-[max-width] duration-300 ease-out motion-reduce:transition-none",
          // A ring, not a border, so the frame's viewport stays exactly the device width.
          width !== "100%" && "ring-1 ring-border",
        )}
      />
    </div>
  );
}

/** Preview and Code tabs, device widths for the preview, and `actions` at the row's end. */
export function FeaturePreviewTabs({ feature, actions }: { feature: string; actions?: ReactNode }) {
  const t = useTranslations("StartFeatureCatalog.detail");
  const locale = useLocale();
  const [view, setView] = useState<View>("preview");
  const [device, setDevice] = useState<Device>("desktop");
  const width = DEVICES.find(({ id }) => id === device)?.width ?? "100%";

  return (
    <Tabs value={view} onValueChange={(value) => setView(value as View)}>
      <div className="flex flex-wrap items-center gap-2">
        <TabsList>
          <TabsTrigger value="preview" className="px-3">
            {t("previewTab")}
          </TabsTrigger>
          <TabsTrigger value="code" className="px-3">
            {t("codeTab")}
          </TabsTrigger>
        </TabsList>
        {/* On phones the copy buttons wrap under the tabs and start at the left edge. */}
        <div className="flex min-w-0 flex-wrap items-center gap-2 md:ml-auto">
          {/* Same segmented look and height as the tabs beside it. */}
          <div
            role="group"
            aria-label={t("deviceGroup")}
            className="flex h-9 items-center gap-0.5 rounded-lg bg-muted p-[3px] max-md:hidden"
          >
            {DEVICES.map(({ id, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={device === id}
                aria-label={t(`device.${id}`)}
                title={t(`device.${id}`)}
                onClick={() => {
                  setDevice(id);
                  setView("preview");
                }}
                className={cn(
                  "flex h-full w-8 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none",
                  "hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  "aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm [&_svg]:size-4",
                )}
              >
                <Icon aria-hidden />
              </button>
            ))}
          </div>
          {actions}
        </div>
      </div>
      {/* Kept mounted so the demo keeps its state while the code is open. */}
      <TabsContent value="preview" keepMounted>
        <FeaturePreviewFrame
          src={getPathname({ href: `/start/preview/${feature}`, locale })}
          width={width}
          title={t("preview")}
        />
      </TabsContent>
      <TabsContent value="code">
        <FeatureCodeViewer feature={feature} />
      </TabsContent>
    </Tabs>
  );
}
