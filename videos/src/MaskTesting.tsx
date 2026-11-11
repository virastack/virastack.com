import type { CSSProperties, ReactNode } from "react";

import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { colors, inter, mono, sora } from "./theme";

const FPS = 30;
const scenes = { hook: 120, code: 150, form: 210, seed: 240, outro: 100 } as const;
export const maskTestingDuration = Object.values(scenes).reduce((a, b) => a + b, 0);

// Real output of @virastack/mask/testing 2.3.0, so every value on screen passes isValidTCKN / isValidIBAN.
const tckn = "49537717654";
const iban = "TR510006205723862795695348";
const ibanSpaced = iban.replace(/(.{4})/g, "$1 ").trim();

const typed = (text: string, frame: number, start: number, cps = 14) =>
  text.slice(0, Math.max(0, Math.floor(((frame - start) / FPS) * cps)));

function useAppear(start: number, distance = 24) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: { damping: 200 }, durationInFrames: 18 });
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` } satisfies CSSProperties;
}

function Scene({ duration, children }: { duration: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, alignItems: "center", justifyContent: "center", gap: 56 }}>
      {children}
    </AbsoluteFill>
  );
}

function Heading({ children, start = 0 }: { children: ReactNode; start?: number }) {
  return (
    <h1
      style={{
        ...useAppear(start),
        margin: 0,
        fontFamily: sora,
        fontWeight: 800,
        fontSize: 92,
        letterSpacing: "-0.03em",
        color: colors.fg,
        textAlign: "center",
      }}
    >
      {children}
    </h1>
  );
}

function Status({ ok, children }: { ok: boolean; children: ReactNode }) {
  const color = ok ? colors.valid : colors.invalid;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 18px",
        borderRadius: 999,
        fontFamily: inter,
        fontWeight: 600,
        fontSize: 26,
        color,
        background: `${color}1f`,
        border: `1px solid ${color}55`,
      }}
    >
      {ok ? "✓" : "✕"} {children}
    </span>
  );
}

function Field({
  label,
  value,
  state,
  caret,
  badge,
  size = 38,
}: {
  label: string;
  value: string;
  state: "idle" | "valid" | "invalid";
  caret: boolean;
  badge?: ReactNode;
  size?: number;
}) {
  const ring =
    state === "valid" ? colors.valid : state === "invalid" ? colors.invalid : colors.mask;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 44,
        }}
      >
        <span style={{ fontFamily: inter, fontWeight: 500, fontSize: 24, color: colors.muted }}>
          {label}
        </span>
        {badge}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 88,
          padding: "0 28px",
          borderRadius: 18,
          background: colors.bg,
          border: `2px solid ${ring}`,
          boxShadow: `0 0 0 6px ${ring}22`,
          fontFamily: mono,
          fontSize: size,
          color: colors.fg,
          whiteSpace: "pre",
        }}
      >
        {value}
        {caret && <span style={{ color: colors.mask }}>|</span>}
      </div>
    </div>
  );
}

function Card({
  width,
  children,
  style,
}: {
  width: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        padding: 48,
        borderRadius: 32,
        background: colors.card,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Hook() {
  const frame = useCurrentFrame();
  const value = typed("12345678901", frame, 14, 16);
  const invalid = frame >= 50;
  const second = useAppear(64);
  return (
    <Scene duration={scenes.hook}>
      <Heading>Fake test data fails.</Heading>
      <Card width={900}>
        <Field
          label="TCKN"
          value={value}
          state={invalid ? "invalid" : "idle"}
          caret={!invalid}
          badge={invalid ? <Status ok={false}>Invalid TCKN</Status> : null}
        />
      </Card>
      <p
        style={{
          ...second,
          margin: 0,
          fontFamily: sora,
          fontWeight: 800,
          fontSize: 64,
          color: colors.mask,
        }}
      >
        Generated data passes.
      </p>
    </Scene>
  );
}

type Token = readonly [string, string];
type CodeLineSpec = { tokens: readonly Token[] };

const syntax = {
  kw: "#c084fc",
  str: "#86efac",
  fn: "#93c5fd",
  dim: "#737373",
  fg: colors.fg,
  ok: colors.valid,
};

function CodeLine({
  tokens,
  start,
  size,
}: {
  tokens: readonly Token[];
  start: number;
  size: number;
}) {
  const style = useAppear(start, 10);
  return (
    <div style={{ ...style, minHeight: size * 1.5, whiteSpace: "pre" }}>
      {tokens.map(([text, color], i) => (
        <span key={i} style={{ color }}>
          {text}
        </span>
      ))}
    </div>
  );
}

/** Lines drop in one after another, top to bottom, `step` frames apart. */
function CodeWindow({
  lines,
  width,
  size,
  from = 6,
  step = 4,
  children,
}: {
  lines: readonly CodeLineSpec[];
  width: number;
  size: number;
  from?: number;
  step?: number;
  children?: ReactNode;
}) {
  return (
    <Card width={width} style={{ padding: "36px 40px", gap: 24 }}>
      <div style={{ display: "flex", gap: 10 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c }} />
        ))}
      </div>
      <div style={{ fontFamily: mono, fontSize: size }}>
        {lines.map(({ tokens }, i) => (
          <CodeLine key={i} tokens={tokens} size={size} start={from + i * step} />
        ))}
      </div>
      {children}
    </Card>
  );
}

function Code() {
  const { kw, str, fn, dim, fg, ok } = syntax;
  const lines: readonly CodeLineSpec[] = [
    {
      tokens: [
        ["import", kw],
        [" { ", fg],
        ["generateTCKN", fn],
        [" } ", fg],
        ["from", kw],
        [' "@virastack/mask/testing"', str],
      ],
    },
    { tokens: [] },
    {
      tokens: [
        ["generateTCKN", fn],
        ["({ seed: 1 })", fg],
      ],
    },
    {
      tokens: [
        ["// → ", dim],
        [`"${tckn}"`, ok],
      ],
    },
  ];
  const badge = useAppear(40);
  return (
    <Scene duration={scenes.code}>
      <Heading>One call. A valid number.</Heading>
      <CodeWindow lines={lines} width={1360} size={34} from={6} step={6}>
        <div style={{ ...badge, fontFamily: mono, fontSize: 28, color: colors.muted }}>
          isValidTCKN(<span style={{ color: colors.fg }}>…</span>) →{" "}
          <span style={{ color: colors.valid }}>true</span>
        </div>
      </CodeWindow>
    </Scene>
  );
}

function Running() {
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "8px 18px",
        borderRadius: 999,
        fontFamily: inter,
        fontWeight: 600,
        fontSize: 26,
        color: colors.mask,
        background: `${colors.mask}1f`,
        border: `1px solid ${colors.mask}55`,
      }}
    >
      ▶ Running test…
    </span>
  );
}

function Form() {
  const frame = useCurrentFrame();
  const { kw, fn, str, dim, fg } = syntax;
  const tcknValue = typed(tckn, frame, 72, 18);
  const ibanValue = typed(ibanSpaced, frame, 108, 26);
  const tcknDone = tcknValue.length === tckn.length;
  const ibanDone = ibanValue.length === ibanSpaced.length;
  const hint = useAppear(150, 12);
  const run = useAppear(44, 8);
  const passed = frame >= 66;
  const live = interpolate(frame, [60, 72], [0.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lines: readonly CodeLineSpec[] = [
    {
      tokens: [
        ["const", kw],
        [" tckn = ", fg],
        ["generateTCKN", fn],
        ["({ seed: 1 })", fg],
      ],
    },
    {
      tokens: [
        ["const", kw],
        [" iban = ", fg],
        ["generateIBAN", fn],
        ["(", fg],
        ['"TR"', str],
        [", { seed: 1, bank: ", fg],
        ['"0062"', str],
        [" })", fg],
      ],
    },
    { tokens: [] },
    {
      tokens: [
        ["await", kw],
        [" user.", fg],
        ["type", fn],
        ["(tcknInput, tckn)", fg],
      ],
    },
    {
      tokens: [
        ["await", kw],
        [" user.", fg],
        ["type", fn],
        ["(ibanInput, iban)", fg],
        ["  // Mask spaces it", dim],
      ],
    },
  ];
  return (
    <Scene duration={scenes.form}>
      <Heading>Type it. Mask formats it.</Heading>
      <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
        <CodeWindow lines={lines} width={980} size={26} from={6} step={5}>
          <div style={{ ...run, display: "flex", alignItems: "center", gap: 14 }}>
            {passed ? <Status ok>1 passed</Status> : <Running />}
          </div>
        </CodeWindow>
        <Card width={760} style={{ opacity: live }}>
          <span style={{ fontFamily: sora, fontWeight: 600, fontSize: 34, color: colors.fg }}>
            New customer
          </span>
          <Field
            label="TCKN"
            value={tcknValue}
            size={32}
            state={tcknDone ? "valid" : "idle"}
            caret={!tcknDone && frame >= 72}
            badge={tcknDone ? <Status ok>Valid</Status> : null}
          />
          <Field
            label="IBAN"
            value={ibanValue}
            size={32}
            state={ibanDone ? "valid" : "idle"}
            caret={tcknDone && !ibanDone}
            badge={ibanDone ? <Status ok>Valid</Status> : null}
          />
          <div style={{ ...hint, fontFamily: inter, fontSize: 26, color: colors.muted }}>
            Bank: <strong style={{ color: colors.fg }}>T. GARANTİ BANKASI A.Ş.</strong>
          </div>
        </Card>
      </div>
    </Scene>
  );
}

// Real generateTCKN / generateIBAN("TR") output for seeds 0-3.
const customers = [
  { name: "Customer 1", tckn: "11353206292", iban: "TR60 0020 5090 1720 1519 4012 33" },
  { name: "Customer 2", tckn: "49537717654", iban: "TR87 0013 8072 3862 7956 9534 82" },
  { name: "Customer 3", tckn: "66426508490", iban: "TR60 0014 6044 0220 0907 9043 07" },
  { name: "Customer 4", tckn: "48325469034", iban: "TR24 0013 8033 8654 0676 8827 39" },
] as const;

function Seed() {
  const { kw, fn, str, dim, fg } = syntax;
  const lines: readonly CodeLineSpec[] = [
    { tokens: [["// prisma/seed.ts", dim]] },
    {
      tokens: [
        ["import", kw],
        [" { ", fg],
        ["generateIBAN", fn],
        [", ", fg],
        ["generateTCKN", fn],
        [" } ", fg],
        ["from", kw],
        [' "@virastack/mask/testing"', str],
      ],
    },
    { tokens: [] },
    {
      tokens: [
        ["const", kw],
        [" customers = Array.", fg],
        ["from", fn],
        ["({ length: 50 }, (_, i) => ({", fg],
      ],
    },
    {
      tokens: [
        ["  name: ", fg],
        ["`Customer ${i + 1}`", str],
        [",", fg],
      ],
    },
    {
      tokens: [
        ["  tckn: ", fg],
        ["generateTCKN", fn],
        ["({ seed: i }),", fg],
      ],
    },
    {
      tokens: [
        ["  iban: ", fg],
        ["generateIBAN", fn],
        ["(", fg],
        ['"TR"', str],
        [", { seed: i }),", fg],
      ],
    },
    { tokens: [["}))", fg]] },
    { tokens: [] },
    { tokens: [["// the same 50 customers on every run", dim]] },
  ];
  return (
    <Scene duration={scenes.seed}>
      <Heading>The same 50 customers, every run.</Heading>
      <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
        <CodeWindow lines={lines} width={1000} size={22} from={6} step={4} />
        <Card width={720} style={{ gap: 20, padding: "36px 40px" }}>
          {customers.map((c, i) => (
            <CustomerRow key={c.name} index={i} {...c} />
          ))}
          <span
            style={{ ...useAppear(110, 8), fontFamily: inter, fontSize: 24, color: colors.muted }}
          >
            + 46 more · run 2, run 3 … identical
          </span>
        </Card>
      </div>
    </Scene>
  );
}

function CustomerRow({
  index,
  name,
  tckn: id,
  iban: account,
}: {
  index: number;
  name: string;
  tckn: string;
  iban: string;
}) {
  const style = useAppear(56 + index * 12, 12);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        paddingBottom: 16,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: inter, fontWeight: 600, fontSize: 26, color: colors.fg }}>
          {name}
        </span>
        <span style={{ fontFamily: mono, fontSize: 26, color: colors.valid }}>{id}</span>
      </div>
      <span style={{ fontFamily: mono, fontSize: 22, color: colors.muted }}>{account}</span>
    </div>
  );
}

function Outro() {
  const lockup = useAppear(2);
  const sub = useAppear(14, 16);
  return (
    <Scene duration={scenes.outro}>
      <div
        style={{
          ...lockup,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <span
          style={{
            fontFamily: sora,
            fontWeight: 800,
            fontSize: 72,
            color: colors.bg,
            WebkitTextStroke: "4px rgba(255,255,255,0.55)",
            paintOrder: "stroke fill",
            letterSpacing: "-0.02em",
          }}
        >
          ViraStack
        </span>
        <span
          style={{
            fontFamily: sora,
            fontWeight: 800,
            fontSize: 200,
            color: colors.mask,
            lineHeight: 1,
          }}
        >
          Mask
        </span>
      </div>
      <div
        style={{ ...sub, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
      >
        <code
          style={{
            fontFamily: mono,
            fontSize: 40,
            color: colors.fg,
            padding: "14px 32px",
            borderRadius: 16,
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          @virastack/mask/testing
        </code>
        <span style={{ fontFamily: inter, fontSize: 28, color: colors.muted }}>
          Valid TCKN and IBAN test data, the same on every run. Never in your production bundle.
        </span>
      </div>
    </Scene>
  );
}

const starts = {
  hook: 0,
  code: scenes.hook,
  form: scenes.hook + scenes.code,
  seed: scenes.hook + scenes.code + scenes.form,
  outro: scenes.hook + scenes.code + scenes.form + scenes.seed,
} as const;

export function MaskTesting() {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 700px at 50% 0%, ${colors.mask}33, transparent 70%), ${colors.bg}`,
      }}
    >
      <Sequence from={starts.hook} durationInFrames={scenes.hook}>
        <Hook />
      </Sequence>
      <Sequence from={starts.code} durationInFrames={scenes.code}>
        <Code />
      </Sequence>
      <Sequence from={starts.form} durationInFrames={scenes.form}>
        <Form />
      </Sequence>
      <Sequence from={starts.seed} durationInFrames={scenes.seed}>
        <Seed />
      </Sequence>
      <Sequence from={starts.outro} durationInFrames={scenes.outro}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
}
