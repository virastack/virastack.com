const SKIP_HOSTS: readonly string[] = ["youtube.com", "www.youtube.com", "youtu.be", "github.com"];

/**
 * Appends Academy UTM parameters to an absolute URL.
 * Returns the original href when it is not a URL, or when the host strips campaign parameters.
 */
export function withUtm(href: string, campaign: string): string {
  if (!URL.canParse(href)) {
    return href;
  }

  const url = new URL(href);
  if (SKIP_HOSTS.includes(url.hostname)) {
    return href;
  }

  url.searchParams.set("utm_source", "virastack.com");
  url.searchParams.set("utm_medium", "academy");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}
