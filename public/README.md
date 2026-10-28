# Arvix Brand Assets

**Tagline:** Ideas into visuals.

## Included
- `logos/arvix-logo-dark.png` — transparent horizontal logo for dark backgrounds.
- `logos/arvix-logo-light.png` — transparent horizontal logo for light backgrounds.
- `logos/arvix-mark.png` — standalone folded-ribbon A mark.
- `icons/` — dark, light, orange app icons, favicon PNG/ICO, Apple touch icon.
- `social/og-image.png` — Open Graph/social sharing image.
- `social/hero-poster.jpg` — static branded hero poster. The original product demo video has not been edited in this package.
- `manifest.json` — PWA manifest for Arvix.
- `brand-tokens.json` — brand colors and usage notes.
- `source/arvix-brand-board.png` — original reference board supplied by you.

## Brand palette
- Brand orange: `#F97316`
- Orange hover: `#EA580C`
- Light-mode primary: `#C94F0B`
- Dark background: `#0D1117`
- Light background: `#F7F8FA`

## Next.js usage
Copy the contents of this package's folders into your project's `public/` directory while preserving paths. The manifest references `/icons/icon-192.png` and `/icons/icon-512.png`.

Example metadata:
```ts
export const metadata = {
  title: "Arvix — Ideas into Visuals",
  description: "Turn your ideas into complete visual canvases and clear explanations with AI. Describe what you need, and Arvix brings it to life.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: { images: ["/social/og-image.png"] },
};
```

Note: these PNG logo exports are extracted from the approved reference image, so they are raster assets rather than a hand-built vector master. Review them at intended size before production use.
