import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { landingClosingCta } from "@/app/_data/landing";
import { Button } from "@/components/ui/button";

export default function ClosingCtaSection() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="bg-background px-6 py-12 sm:px-8 sm:py-16">
      <div className="topo-bg mx-auto flex max-w-5xl flex-col items-center gap-7 overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="max-w-3xl">
          <h2
            id="closing-cta-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {landingClosingCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {landingClosingCta.description}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="h-12 rounded-xl bg-brand px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-brand-hover focus-visible:ring-brand">
          <Link href={landingClosingCta.cta.href}>
            {landingClosingCta.cta.label}
            <ArrowRight aria-hidden="true" className="ml-1 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
