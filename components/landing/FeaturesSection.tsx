import {
  ArrowDown,
  Check,
  Circle,
  FileText,
  MousePointer2,
  Network,
  Shapes,
  Sparkles,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  landingFeatures,
  type LandingFeature,
} from "@/app/_data/landing";

const featureIcons: Record<LandingFeature["id"], LucideIcon> = {
  canvas: Workflow,
  docs: FileText,
  "team-board": UsersRound,
};

function CanvasMockup({
  content,
}: {
  content: Extract<LandingFeature, { id: "canvas" }>["mockup"];
}) {
  return (
    <div className="canvas-grid-bg relative overflow-hidden rounded-xl border border-border p-4 sm:p-5">
      <div className="relative z-10 flex min-h-10 items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {content.workspaceLabel}
          </p>
          <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
            {content.workspaceName}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
          <Check aria-hidden="true" className="size-3 text-success" />
          {content.statusLabel}
        </span>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
        {content.toolLabels.map((label, index) => {
          const ToolIcon = [MousePointer2, Shapes, Network][index];
          return (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] ${
                index === 0
                  ? "border-brand/30 bg-brand-subtle text-brand"
                  : "border-border bg-card/90 text-muted-foreground"
              }`}>
              <ToolIcon aria-hidden="true" className="size-3" />
              {label}
            </span>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto mt-5 flex max-w-xs flex-col items-center">
        <span className="rounded-full border border-success/40 bg-card px-4 py-2 text-center text-xs font-medium text-foreground shadow-sm">
          {content.startLabel}
        </span>
        <ArrowDown
          aria-hidden="true"
          className="my-1.5 size-4 text-canvas-connector"
        />
        <span className="rounded-lg border border-brand/40 bg-card px-4 py-2 text-center text-xs font-medium text-foreground shadow-sm">
          {content.processLabel}
        </span>
        <ArrowDown
          aria-hidden="true"
          className="my-1.5 size-4 text-canvas-connector"
        />
        <div className="flex items-center gap-2">
          <span className="flex size-24 rotate-45 items-center justify-center rounded-md border border-brand/45 bg-brand-subtle/80">
            <span className="-rotate-45 px-1 text-center text-[10px] font-medium leading-tight text-foreground">
              {content.decisionLabel}
            </span>
          </span>
          <span className="absolute ml-28 -mt-2 rounded bg-background px-1.5 py-0.5 text-[9px] text-muted-foreground">
            {content.decisionYesLabel}
          </span>
        </div>
        <ArrowDown
          aria-hidden="true"
          className="my-1.5 size-4 text-canvas-connector"
        />
        <span className="rounded-full border border-success/40 bg-card px-4 py-2 text-center text-xs font-medium text-foreground shadow-sm">
          {content.endLabel}
        </span>
      </div>
    </div>
  );
}

function DocsMockup({
  content,
}: {
  content: Extract<LandingFeature, { id: "docs" }>["mockup"];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <FileText aria-hidden="true" className="size-4 shrink-0 text-brand" />
          <span className="truncate text-xs font-medium text-foreground">
            {content.workspaceName}
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          {content.statusLabel}
        </span>
      </div>
      <article className="px-5 py-5 sm:px-7 sm:py-6">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {content.documentTitle}
        </h3>
        <div className="mt-5 space-y-4">
          <section>
            <h4 className="text-xs font-semibold text-foreground">
              {content.sectionHeading}
            </h4>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {content.sectionParagraph}
            </p>
          </section>
          <section>
            <h4 className="text-xs font-semibold text-foreground">
              {content.secondHeading}
            </h4>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              {content.secondParagraph}
            </p>
            <ul className="mt-2 space-y-1">
              {content.listItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                  <Circle
                    aria-hidden="true"
                    className="mt-1 size-1.5 shrink-0 fill-brand text-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <aside className="rounded-lg border border-brand/20 bg-brand-subtle/50 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand">
              <Sparkles aria-hidden="true" className="size-3" />
              {content.aiLabel}
            </div>
            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
              {content.aiNote}
            </p>
          </aside>
        </div>
      </article>
    </div>
  );
}

function TeamBoardMockup({
  content,
}: {
  content: Extract<LandingFeature, { id: "team-board" }>["mockup"];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <UsersRound aria-hidden="true" className="size-4 shrink-0 text-brand" />
          <span className="truncate text-xs font-semibold text-foreground">
            {content.workspaceName}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[10px] text-muted-foreground sm:inline">
            {content.collaboratorLabel}
          </span>
          <div className="flex -space-x-1.5">
            {content.collaborators.map((person, index) => (
              <span
                key={person.initials}
                aria-label={person.name}
                className={`flex size-6 items-center justify-center rounded-full border-2 border-card text-[8px] font-semibold text-white ${
                  index === 0 ? "bg-brand" : "bg-info"
                }`}>
                {person.initials}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2.5 sm:gap-3 sm:p-4">
        {content.columns.map((column, columnIndex) => (
          <section
            key={column.title}
            className="min-w-0 rounded-lg bg-muted/60 p-2 sm:p-2.5">
            <div className="mb-2 flex items-center justify-between gap-1">
              <h3 className="truncate text-[10px] font-semibold text-foreground sm:text-xs">
                {column.title}
              </h3>
              <span className="text-[9px] text-muted-foreground">
                {column.cards.length}
              </span>
            </div>
            <ul className="space-y-2">
              {column.cards.map((card, cardIndex) => (
                <li
                  key={card}
                  className="relative min-h-14 rounded-md border border-border bg-card p-2 sm:min-h-16 sm:p-2.5">
                  <span className="mb-1.5 block h-1 w-6 rounded-full bg-brand/70" />
                  <span className="block text-[9px] leading-3 text-foreground sm:text-[10px] sm:leading-4">
                    {card}
                  </span>
                  {columnIndex === 1 && cardIndex === 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 -right-1 z-10 flex size-4 items-center justify-center rounded-full border border-card bg-brand text-[7px] font-semibold text-white">
                      {content.collaborators[0].initials}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function FeatureMockup({ feature }: { feature: LandingFeature }) {
  switch (feature.id) {
    case "canvas":
      return <CanvasMockup content={feature.mockup} />;
    case "docs":
      return <DocsMockup content={feature.mockup} />;
    case "team-board":
      return <TeamBoardMockup content={feature.mockup} />;
  }
}

export default function FeaturesSection() {
  return (
    <section
      id="product"
      aria-labelledby="features-heading"
      className="bg-background px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="features-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {landingFeatures.heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {landingFeatures.introduction}
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24 lg:mt-24">
          {landingFeatures.items.map((feature) => {
            const Icon = featureIcons[feature.id];

            return (
              <article
                key={feature.id}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div
                  className={`${
                    feature.id === "docs" ? "lg:order-2" : "lg:order-1"
                  }`}>
                  <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-brand/20 bg-brand-subtle text-brand">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {feature.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm leading-6 text-foreground/85">
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-brand"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`${
                    feature.id === "docs" ? "lg:order-1" : "lg:order-2"
                  }`}>
                  <FeatureMockup feature={feature} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
