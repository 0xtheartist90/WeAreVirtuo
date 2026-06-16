# Visual Identity Standards

## Color System

### Core Palette (Dark Only — No Light Theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0a0a0a` | Page background, pure black base |
| `--foreground` | `#ffffff` | Primary text, headings |
| `--accent` | `#DC2626` | Brand red — CTAs, highlights, active states |
| `--card` | `#111111` | Elevated surfaces |
| `--border` | `#222222` | Subtle borders |
| `--muted-foreground` | `#666666` | Secondary text (captions, labels) |

### Background Temperatures
| Var | Hex | Usage |
|-----|-----|-------|
| `--bg-pure` | `#0a0a0a` | Default page background |
| `--bg-warm` | `#0f0d0b` | Sections needing warmth |
| `--bg-cool` | `#0a0c10` | Sections needing tech/cool feel |
| `--bg-lifted` | `#111111` | Cards, elevated containers |
| `--bg-elevated` | `#141414` | Modals, popovers |

### Opacity Scale for White Text
| Class | Usage | Rule |
|-------|-------|------|
| `text-white` | Headlines, primary content | Always full opacity |
| `text-white/80` | Body text, descriptions | Minimum for readable paragraphs |
| `text-white/70` | Secondary info (client names) | |
| `text-white/60` | Tertiary info (timestamps, labels) | Absolute minimum for any readable text |
| `text-white/50` | Navigation inactive states | |
| `text-white/40` | Film counters, decorative text | NOT for content the user needs to read |

**RULE: NEVER use `text-white/30` or lower for any content the user is expected to read.**

### Border Opacity Scale
| Value | Usage |
|-------|-------|
| `border-white/[0.06]` | Subtle card borders, section dividers |
| `border-white/[0.08]` | Image frame borders |
| `border-white/10` | Interactive element borders (buttons, inputs) |
| `border-white/15` | Active/hovered borders |
| `border-white/20` | Strong emphasis borders |
| `border-accent/30` | Accent hover borders |

### Gradient Patterns
```
/* Section-to-black fade (top and bottom) */
bg-gradient-to-b from-black/50 via-transparent to-black/50

/* Card bottom content gradient */
bg-gradient-to-t from-black/90 via-black/30 to-transparent

/* Video controls gradient */
bg-gradient-to-t from-black/90 via-black/40 to-transparent

/* Cinematic vignette */
radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)

/* Ambient accent glow */
radial-gradient(ellipse 60% 40% at 50% 40%, rgba(220,38,38,0.08) 0%, transparent 70%)

/* BTS section overlay: 70-88% black */
rgba(0, 0, 0, 0.70) to rgba(0, 0, 0, 0.88)
```

## Typography

### Font Stack
| Token | Font | Usage |
|-------|------|-------|
| `font-sans` | Inter | Body text, UI elements |
| `font-display` | Bebas Neue | Section headlines, hero titles |
| `font-mono` | System mono | Counters, timestamps, step numbers |

### Heading Scale
| Context | Classes |
|---------|---------|
| Hero H1 | `font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-wide leading-[0.95]` |
| Section H2 | `font-display text-4xl md:text-6xl uppercase tracking-wide` |
| Card H3 | `text-foreground text-lg md:text-2xl font-semibold` |
| Subsection | `font-display text-2xl md:text-4xl uppercase tracking-wide` |

### Label/Tag Pattern
```
text-accent text-sm font-medium tracking-widest uppercase
— or —
text-accent text-[10px] font-semibold tracking-widest uppercase
```

### Section Header Pattern (Every Section)
```
<p class="text-accent mb-3 text-sm font-medium tracking-widest uppercase">
  {tag}
</p>
<CharacterReveal as="h2" class="font-display text-foreground mb-4 text-4xl tracking-wide uppercase md:text-6xl">
  {title}
</CharacterReveal>
<p class="max-w-[var(--max-width-prose)] text-lg text-white/80">
  {subtitle}
</p>
```

## Layout

### Content Widths
| Var | Value | Usage |
|-----|-------|-------|
| `--max-width-content` | `1280px` | Main content container |
| `--max-width-wide` | `1440px` | Full-bleed sections |
| `--max-width-prose` | `65ch` | Paragraph text max width |

### Standard Section Padding
```
py-20 md:py-28        /* Vertical section padding */
px-4 md:px-8          /* Horizontal content padding */
mx-auto max-w-[var(--max-width-content)]  /* Centered container */
```

### Card Border Radius
| Context | Radius |
|---------|--------|
| Cards, video containers | `rounded-2xl` (16px) |
| Buttons, pills | `rounded-full` |
| Phone frames | `rounded-[2rem]` |
| Section clips | `rounded-xl` (12px) |

## Backgrounds

### BTS Photography System
Every other section gets a real behind-the-scenes photo as background:
- Overlaid with 70-88% black opacity
- Gradient blend: `from-black/50 via-transparent to-black/50`
- Radial vignette: `transparent 40% → rgba(0,0,0,0.4) 100%`
- GSAP parallax scroll on the image (40px travel)

### Available BTS Images
| File | Scene |
|------|-------|
| `cooking-show-setup.jpg` | Food production set |
| `cinematographer-red.jpg` | RED camera operator |
| `steadicam-operator.jpg` | Steadicam rig |
| `full-production-set.jpg` | Full studio with crew |
| `commercial-stage.jpg` | Commercial shoot stage |
| `silhouette-setup.png` | Dramatic silhouette |

### Diagonal Section Transitions
```css
/* Top + bottom diagonal */
clip-path: polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%);
/* Content padding: 7vw to clear clip edge */
pt-[7vw] pb-[7vw]
```
Used on: Reels, Testimonials, FAQ sections. Creates cinematic scene transitions.

## Shadows
```
shadow-2xl shadow-black/50    /* Video containers, modals */
shadow-2xl shadow-black/60    /* Phone frames */
drop-shadow-lg                /* Floating logo */
```
