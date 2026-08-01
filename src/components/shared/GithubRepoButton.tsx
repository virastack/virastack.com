import { GithubIcon } from "@/components/icons";
import { Button } from "@/ui/button";

type GithubRepoButtonProps = {
  href: string;
  /** Short label, e.g. `virastack/start` or `virastack`. */
  label: string;
};

export function GithubRepoButton({ href, label }: GithubRepoButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      nativeButton={false}
      render={<a href={href} target="_blank" rel="noreferrer" />}
    >
      <GithubIcon data-icon="inline-start" className="size-3.5" />
      <span>{label}</span>
    </Button>
  );
}
