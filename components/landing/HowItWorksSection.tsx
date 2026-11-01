import { landingHowItWorks } from "@/app/_data/landing";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-background px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {landingHowItWorks.heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {landingHowItWorks.description}
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 left-5 top-5 w-px bg-brand/35 md:bottom-auto md:left-[16.666%] md:right-[16.666%] md:top-6 md:h-px md:w-auto"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {landingHowItWorks.steps.map((step) => (
              <li
                key={step.number}
                className="relative z-10 flex items-start gap-4 md:flex-col md:items-center md:gap-5 md:text-center">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/50 bg-background font-mono text-xs font-semibold text-brand ring-4 ring-background sm:size-12 md:text-sm">
                  {step.number}
                </span>
                <div className="pt-1 md:pt-0">
                  <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground sm:leading-7 md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
