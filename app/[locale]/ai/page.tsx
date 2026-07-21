import { AiRulesHeroDescription } from "./hero-description";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";
import { TypingAnimation as MagicTypingAnimation } from "@/components/ui/typing-animation";
import { X, Check } from "lucide-react";
import { InteractiveWorkflowDemo } from "./interactive-workflow-demo";
import { GithubStarButton } from "@/components/github-star-button";
import { ViraStackProjectHeading } from "@/components/virastack-project-heading";
import { highlightCode } from "@/lib/utils/highlight";
import { CopyButton } from "./copy-button";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params?.locale || "en";
  const t = await getTranslations({ locale, namespace: "AIRules" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AiRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AIRules");

  const beforeCode = `export default function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}`;

  const afterCode = `import { useQuery } from '@tanstack/react-query';
import { userKeys, fetchUser } from '@/features/users/api';
import { Skeleton } from '@/components/ui/skeleton';

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: ({ signal }) => fetchUser(userId, signal),
  });

  if (isLoading) return <Skeleton className="w-full h-32 rounded-xl" />;
  if (isError || !user) return <ErrorState message="Failed to load user" />;

  return (
    <article className="p-6 border rounded-xl bg-card">
      <h2 className="text-xl font-bold">{user.name}</h2>
    </article>
  );
}`;

  const beforeHtml = await highlightCode(beforeCode, "github-dark");
  const afterHtml = await highlightCode(afterCode, "github-dark");

  return (
    <main className="flex min-h-[calc(100vh-160px)] 2xl:max-w-5xl 2xl:mx-auto flex-col gap-16 mb-20 md:mb-40">
      <section className="py-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <ViraStackProjectHeading
            projectName={t("hero.projectName")}
            accentClassName="text-fuchsia-500"
            textCenter
          />
          <AiRulesHeroDescription />
          <GithubStarButton href="https://github.com/virastack/ai" />
        </div>

        <Terminal
          sequence={false}
          className="shadow-2xl text-left border-border mx-auto mt-10"
        >
          <div className="flex items-center justify-between w-full pr-4">
            <TypingAnimation>&gt; npx @virastack/ai init</TypingAnimation>
            <CopyButton text="npx @virastack/ai init" />
          </div>

          <AnimatedSpan delay={2000} className="text-muted-foreground">
            {t("terminal.loading")}
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500">
            {t("terminal.created")}
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500">
            {t("terminal.generated")}
          </AnimatedSpan>

          <AnimatedSpan
            delay={4500}
            className="text-fuchsia-400 font-semibold mt-2"
          >
            {t("terminal.ready")}
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-fuchsia-400 font-semibold">
            {t("terminal.try")}
          </AnimatedSpan>
        </Terminal>
      </section>

      <section className="flex flex-col gap-12 mt-16 w-full">
        {/* Prompt Section */}
        <div className="flex flex-col items-center text-center gap-2 text-sm px-6 mt-10 md:w-1/2 mx-auto">
          <span className="text-muted-foreground font-mono">
            {t("comparison.promptLabel")}
          </span>
          <p className="font-medium text-lg">
            <MagicTypingAnimation duration={50} loop={false}>
              {t("comparison.promptText")}
            </MagicTypingAnimation>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before Column */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold tracking-wider w-fit">
                {t("comparison.before.badge")}
              </div>
              <h3 className="text-2xl font-bold">
                {t("comparison.before.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("comparison.before.description")}
              </p>
            </div>

            <ul className="flex flex-col gap-3 text-[15px] text-muted-foreground mb-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{t("comparison.before.list1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{t("comparison.before.list2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{t("comparison.before.list3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{t("comparison.before.list4")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{t("comparison.before.list5")}</span>
              </li>
            </ul>

            <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117] flex-1">
              <div
                className="text-sm font-mono [&_pre]:p-4 [&_pre]:m-0 [&_figure]:m-0 [&_pre]:overflow-x-auto h-full"
                dangerouslySetInnerHTML={{ __html: beforeHtml }}
              />
            </div>
          </div>

          {/* After Column */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-600/10 border border-green-500/20 text-green-600 text-xs font-semibold tracking-wider w-fit">
                {t("comparison.after.badge")}
              </div>
              <h3 className="text-2xl font-bold">
                {t("comparison.after.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("comparison.after.description")}
              </p>
            </div>

            <ul className="flex flex-col gap-3 text-[15px] text-muted-foreground mb-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">
                    {t("comparison.after.list1Highlight")}
                  </strong>{" "}
                  {t("comparison.after.list1Text")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">
                    {t("comparison.after.list2Highlight")}
                  </strong>{" "}
                  {t("comparison.after.list2Text")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">
                    {t("comparison.after.list3Highlight")}
                  </strong>{" "}
                  {t("comparison.after.list3Text")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">
                    {t("comparison.after.list4Highlight")}
                  </strong>{" "}
                  {t("comparison.after.list4Text")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-semibold">
                    {t("comparison.after.list5Highlight")}
                  </strong>{" "}
                  {t("comparison.after.list5Text")}
                </span>
              </li>
            </ul>

            <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117] flex-1">
              <div
                className="text-sm font-mono [&_pre]:p-4 [&_pre]:m-0 [&_figure]:m-0 [&_pre]:overflow-x-auto h-full"
                dangerouslySetInnerHTML={{ __html: afterHtml }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="flex flex-col gap-8 mt-12">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-3xl font-bold mb-4">{t("principles.title")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("principles.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <h3 className="font-semibold">{t("principles.card1.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("principles.card1.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏗️</span>
              <h3 className="font-semibold">{t("principles.card2.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("principles.card2.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <h3 className="font-semibold">{t("principles.card3.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("principles.card3.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <h3 className="font-semibold">{t("principles.card4.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("principles.card4.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>
              <h3 className="font-semibold">{t("principles.card5.title")}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("principles.card5.description")}
            </p>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="flex flex-col gap-10 mt-20 max-w-4xl mx-auto w-full"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">{t("workflow.title")}</h2>
          <p className="text-muted-foreground mb-6">
            {t("workflow.description")}
          </p>
        </div>

        <InteractiveWorkflowDemo />
      </section>
    </main>
  );
}
