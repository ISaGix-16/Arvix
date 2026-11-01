import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingAudience, landingHero } from "@/app/_data/landing";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import ClosingCtaSection from "@/components/landing/ClosingCtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  const highlightedIndex = landingHero.headline.indexOf(
    landingHero.highlightedWord,
  );
  const headlineBefore = landingHero.headline.slice(0, highlightedIndex);
  const headlineAfter = landingHero.headline.slice(
    highlightedIndex + landingHero.highlightedWord.length,
  );

  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[calc(100svh-4.5rem)] w-full items-center justify-center overflow-hidden bg-background px-6 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-subtle/70 px-3.5 py-1.5 text-sm font-medium text-brand">
            <Sparkles aria-hidden="true" className="size-4" />
            {landingHero.eyebrow}
          </div>

          <h1
            id="hero-heading"
            className="mx-auto max-w-4xl font-heading text-4xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl">
            {headlineBefore}
            <span className="whitespace-nowrap text-brand">
              {landingHero.highlightedWord}
            </span>
            {headlineAfter}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
            {landingHero.description}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-brand px-6 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-brand-hover focus-visible:ring-brand">
              <Link href={landingHero.primaryCta.href}>
                {landingHero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="ml-1 size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-border/80 bg-background/70 px-6 text-base font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-brand-subtle hover:text-brand focus-visible:ring-brand">
              <Link href={landingHero.secondaryCta.href}>
                {landingHero.secondaryCta.label}
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            {landingHero.supportingText}
          </p>
        </div>
      </section>

      <section
        aria-label={landingAudience.label}
        className="border-y border-border bg-background px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:gap-6">
          <p className="text-center text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            {landingAudience.label}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8 lg:gap-x-12">
            {landingAudience.groups.map((group, index) => (
              <li
                key={group}
                className={`text-sm font-medium text-foreground/80 sm:text-base ${
                  index > 0 ? "border-l border-border pl-5 sm:pl-8 lg:pl-12" : ""
                }`}>
                {group}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <ClosingCtaSection />
      <LandingFooter />
    </main>
  );
}
