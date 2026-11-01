"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTable } from "@clerk/nextjs";

const PRICING_TAB =
  "rounded-full px-5 py-2 text-sm font-medium transition-colors " +
  "text-muted-foreground hover:text-foreground " +
  "data-[state=active]:bg-brand " +
  "data-[state=active]:text-primary-foreground " +
  "data-[state=active]:shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-background px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        {/* Section heading */}
        <div className="mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand">
            SIMPLE, TRANSPARENT PRICING
          </p>

          <h2
            id="pricing-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Find your flow with <span className="text-brand">Arvix.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Start for free, upgrade when you need more. Choose a plan that fits
            the way you create and collaborate.
          </p>
        </div>

        {/* Personal / Team pricing */}
        <Tabs
          defaultValue="user"
          className="flex w-full flex-col items-center gap-8">
          <TabsList className="h-auto rounded-full border border-border bg-muted/60 p-1.5">
            <TabsTrigger value="user" className={PRICING_TAB}>
              Personal
            </TabsTrigger>

            <TabsTrigger value="organization" className={PRICING_TAB}>
              Team & Organization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="w-full">
            <PricingTable for="user" />
          </TabsContent>

          <TabsContent value="organization" className="w-full">
            <PricingTable for="organization" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
