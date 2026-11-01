export interface LandingHeroContent {
  eyebrow: string;
  headline: string;
  highlightedWord: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  supportingText: string;
}

interface CanvasMockupContent {
  type: "canvas";
  workspaceLabel: string;
  workspaceName: string;
  statusLabel: string;
  toolLabels: [string, string, string];
  startLabel: string;
  processLabel: string;
  decisionLabel: string;
  endLabel: string;
  decisionYesLabel: string;
}

interface DocsMockupContent {
  type: "docs";
  workspaceName: string;
  statusLabel: string;
  documentTitle: string;
  sectionHeading: string;
  sectionParagraph: string;
  secondHeading: string;
  secondParagraph: string;
  listItems: [string, string, string];
  aiLabel: string;
  aiNote: string;
}

interface TeamBoardMockupContent {
  type: "team-board";
  workspaceName: string;
  collaboratorLabel: string;
  columns: [
    { title: string; cards: [string, string] },
    { title: string; cards: [string, string] },
    { title: string; cards: [string, string] },
  ];
  collaborators: [{ initials: string; name: string }, { initials: string; name: string }];
}

export type LandingFeature =
  | {
      id: "canvas";
      title: string;
      description: string;
      benefits: [string, string, string];
      mockup: CanvasMockupContent;
    }
  | {
      id: "docs";
      title: string;
      description: string;
      benefits: [string, string, string];
      mockup: DocsMockupContent;
    }
  | {
      id: "team-board";
      title: string;
      description: string;
      benefits: [string, string, string];
      mockup: TeamBoardMockupContent;
    };

export const landingHero: LandingHeroContent = {
  eyebrow: "Your ideas, brought to life",
  headline: "Turn any idea into a visual with Arvix.",
  highlightedWord: "Arvix.",
  description:
    "From a simple prompt to a complete visual canvas. Explore your ideas, understand every detail, and bring complex concepts to life with AI.",
  primaryCta: {
    label: "Start building free",
    href: "/sign-up",
  },
  secondaryCta: {
    label: "See how it works",
    href: "#how-it-works",
  },
  supportingText: "Your next big idea starts here.",
};

export const landingAudience = {
  label: "BUILT FOR TEAMS THAT THINK VISUALLY",
  groups: ["Product teams", "Founders", "Solo builders", "Agencies", "Consultants"],
} as const;

export const landingFeatures = {
  heading: "One agent, one workspace, your whole team.",
  introduction:
    "Arvix connects visual thinking, documentation, and team collaboration in one AI-powered workspace.",
  items: [
    {
      id: "canvas",
      title: "Canvas",
      description:
        "An infinite whiteboard where your agent builds and edits diagrams shape by shape. Ask Arvix for flowcharts, entity-relationship diagrams, software architecture, or org charts, then refine the result directly on the existing canvas.",
      benefits: [
        "Flowcharts, ERDs, architecture diagrams, and org charts.",
        "Diagrams built from individual editable shapes and connectors.",
        "Natural-language edits that update the existing canvas in place.",
      ],
      mockup: {
        type: "canvas",
        workspaceLabel: "Workspace",
        workspaceName: "Checkout flow",
        statusLabel: "All changes saved",
        toolLabels: ["Select", "Shapes", "Connect"],
        startLabel: "Customer places order",
        processLabel: "Validate payment",
        decisionLabel: "Payment approved?",
        endLabel: "Confirm order",
        decisionYesLabel: "Yes",
      },
    },
    {
      id: "docs",
      title: "Docs",
      description:
        "Turn visual ideas into clear, structured documents without losing the context behind them. Ask the agent to turn a diagram into a written specification, or rewrite and summarize selected sections on command.",
      benefits: [
        "Generate written specifications from a diagram.",
        "Organize content with headings, paragraphs, and lists.",
        "Rewrite, refine, or summarize sections through natural-language instructions.",
      ],
      mockup: {
        type: "docs",
        workspaceName: "Checkout flow",
        statusLabel: "Document",
        documentTitle: "Checkout flow specification",
        sectionHeading: "Overview",
        sectionParagraph:
          "The checkout flow guides a customer from cart review through payment confirmation.",
        secondHeading: "Payment validation",
        secondParagraph:
          "The payment service validates each transaction before an order is confirmed.",
        listItems: [
          "Validate payment details",
          "Create the order record",
          "Send a confirmation",
        ],
        aiLabel: "AI-assisted update",
        aiNote: "Generated from your checkout flow canvas",
      },
    },
    {
      id: "team-board",
      title: "Team board",
      description:
        "Keep every workspace in your organization visible and bring teammates together in real time. See work across the organization in a Kanban overview, with live cursors that help teammates join a workspace and collaborate.",
      benefits: [
        "A Kanban overview of workspaces across the organization.",
        "Clear columns for tracking work and progress.",
        "Live cursors that let teammates jump into a workspace together.",
      ],
      mockup: {
        type: "team-board",
        workspaceName: "Product team",
        collaboratorLabel: "Collaborating now",
        columns: [
          {
            title: "Planned",
            cards: ["Mobile onboarding", "Billing model"],
          },
          {
            title: "In progress",
            cards: ["Checkout flow", "API architecture"],
          },
          {
            title: "Done",
            cards: ["Q3 roadmap", "User research"],
          },
        ],
        collaborators: [
          { initials: "JD", name: "Jordan" },
          { initials: "AL", name: "Alex" },
        ],
      },
    },
  ],
} satisfies {
  heading: string;
  introduction: string;
  items: LandingFeature[];
};

export const landingHowItWorks = {
  heading: "From idea to visual, in three steps.",
  description:
    "Go from a simple description to a living workspace you can shape with your AI agent and your team.",
  steps: [
    {
      number: "01",
      title: "Describe it",
      description:
        "Describe an idea, workflow, system, or concept in natural language. There’s no need to start with a blank canvas.",
    },
    {
      number: "02",
      title: "Watch the agent draw",
      description:
        "Your agent turns the prompt into a structured visual canvas, creating diagrams and connecting the relevant elements.",
    },
    {
      number: "03",
      title: "Keep iterating together",
      description:
        "Request edits, refine the result, document your ideas, and collaborate with teammates in the same workspace.",
    },
  ],
} as const;

export const landingPricing = {
  heading: "Simple pricing. Room to grow.",
  description:
    "Start turning ideas into visuals. Explore Arvix and find the right plan as your work grows.",
  placeholderLabel: "Pricing coming soon",
  placeholderMessage:
    "We’re finalizing the details. In the meantime, you can start building with Arvix for free.",
  cta: landingHero.primaryCta,
} as const;

export const landingClosingCta = {
  heading: "Your next idea deserves a canvas.",
  description:
    "Bring your ideas, diagrams, and documentation together in one AI-powered workspace.",
  cta: landingHero.primaryCta,
} as const;

export const landingFooter = {
  brandName: "Arvix",
  tagline: "Ideas into visuals.",
  links: [
    { label: "Product", href: "#product" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  copyrightPrefix: "© ",
  copyrightSuffix: " Arvix. All rights reserved.",
} as const;
