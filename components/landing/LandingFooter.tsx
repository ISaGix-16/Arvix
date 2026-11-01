import Image from "next/image";
import Link from "next/link";
import { landingFooter } from "@/app/_data/landing";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:gap-5 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            href="/"
            aria-label={landingFooter.brandName}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <Image
              src="/logos/arvix-logo-dark.png"
              alt={landingFooter.brandName}
              width={314}
              height={160}
              className="hidden h-8 w-auto dark:block"
            />
            <Image
              src="/logos/arvix-logo-light.png"
              alt={landingFooter.brandName}
              width={314}
              height={160}
              className="block h-8 w-auto dark:hidden"
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            {landingFooter.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {landingFooter.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-muted-foreground">
          {landingFooter.copyrightPrefix}
          {new Date().getFullYear()}
          {landingFooter.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
