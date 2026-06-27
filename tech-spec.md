# Tech Spec — Loud Lakshya Digital

## Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| react-router-dom | ^7.0 | Client-side routing (4 pages) |
| three | ^0.170 | Particle Network background shader |
| gsap | ^3.12 | Scroll-triggered animations, timelines |
| lenis | ^1.2 | Smooth scroll with inertia |
| lucide-react | ^0.460 | Icons (nav, services, contact, social) |
| tailwindcss | ^4.0 | Utility styling |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |

### Dev

| Package | Version | Purpose |
|---|---|---|
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.0 | React fast refresh |
| typescript | ^5.7 | Type checking |
| @types/react | ^19.0 | React type definitions |
| @types/react-dom | ^19.0 | ReactDOM type definitions |
| @types/three | ^0.170 | Three.js type definitions |

---

## Component Inventory

### Layout (shared across all pages)

| Component | Source | Notes |
|---|---|---|
| **Navbar** | Custom | Sticky transparent → blur-on-scroll. Mobile fullscreen overlay. Contains router `<Link>` elements. |
| **Footer** | Custom | 4-column grid. Sitemap + services links via `<Link>`. Social icon placeholders. |
| **PageTransition** | Custom | Wraps route outlet. GSAP opacity fade between pages. Scrolls to top on route change. |

### Sections — Home

| Component | Source | Notes |
|---|---|---|
| **Hero** | Custom | Two-column. Video bg + particle overlay + rotating quote carousel + sticky contact form. |
| **ServicesOverview** | Custom | 2×2 service card grid. Each card is a `<Link>` to `/services`. |
| **PortfolioSlideshow** | Custom | Continuous auto-scroll carousel. CSS animation-based (transform translateX loop). 6 case-study cards. Pause on hover. |
| **WhyChooseUs** | Custom | Two-column. Stats with count-up animation. |
| **Testimonials** | Custom | 3-column card grid. |
| **CTABanner** | Custom | Gradient bg. Shared by Home and Services pages. |

### Sections — Services

| Component | Source | Notes |
|---|---|---|
| **ServicesHero** | Custom | Particle bg at reduced opacity. |
| **ServiceDetailCards** | Custom | 4 alternating-layout cards (image/text swap). Each card links to Contact. |
| **ProcessSteps** | Custom | 4-step horizontal with connecting line (SVG/CSS draw animation). |

### Sections — Contact

| Component | Source | Notes |
|---|---|---|
| **ContactHero** | Custom | Centered layout. Prominent email display. |
| **ContactFormSection** | Custom | Two-column: form card (60%) + info cards (40%). Form with validation states. |
| **FAQ** | Custom | Accordion with expand/collapse animation (max-height + opacity). |

### Sections — Blog

| Component | Source | Notes |
|---|---|---|
| **BlogHero** | Custom | Search input + category filter pills. |
| **FeaturedPost** | Custom | Large two-column featured card. |
| **BlogGrid** | Custom | 3-column responsive grid. 9 post cards. |
| **NewsletterCTA** | Custom | Gradient bg. Email capture form (no backend — visual only). |

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| **ParticleNetwork** | Custom (Three.js) | Home Hero, Services Hero, Contact Hero. Accepts `opacity` prop to vary intensity per page. |
| **GlitchText** | Custom (CSS) | Home Hero headline, Portfolio heading. Pure CSS pseudo-element technique. |
| **ScrollReveal** | Custom (GSAP) | All sections. Wrapper component that applies default ScrollTrigger entrance animation to children. Accepts `delay`, `stagger`, `direction` props. |
| **SectionHeader** | Custom | Most sections. Renders label + heading + subtext pattern. |

### Hooks

| Hook | Purpose |
|---|---|
| **useScrollReveal** | Applies GSAP ScrollTrigger to a ref. Configurable direction, stagger, delay. Used by ScrollReveal component. |
| **useCountUp** | Animates a number from 0 to target. GSAP-driven. Used in WhyChooseUs stats. |
| **useRotatingQuotes** | Cycles through quote array every 4s. Fade-out/swap/fade-in. Used in Hero. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| Particle Network background | Three.js (raw) | Custom ShaderMaterial with vertex/fragment shaders. THREE.Points for particles. Distance-based line rendering in shader. Mouse uniform for proximity glow. | **High** 🔒 |
| Glitch text effect | CSS only | Three-layer text (element + ::before + ::after) with clip-path keyframe animations. No JS needed. | **Medium** |
| Scroll-triggered section reveals | GSAP + ScrollTrigger | Reusable ScrollReveal wrapper. Default: opacity 0→1, y 40→0. Configurable per instance. | **Low** |
| Hero entrance sequence | GSAP timeline | Staggered timeline: label → headline → quote → description → CTAs from left; form from right. Fires once on mount. | **Medium** |
| Rotating quotes carousel | React state + CSS | useRotatingQuotes hook cycles index every 4s. CSS transition handles fade. | **Low** |
| Portfolio slideshow | CSS animation | translateX keyframe loop. Fixed card width × card count. Duplicated cards for seamless infinite scroll. Pause on hover via animation-play-state. | **Medium** |
| Stats count-up | GSAP | useCountUp hook. GSAP tween from 0 to target value with ScrollTrigger fire-once. | **Low** |
| Process connecting line draw | GSAP + ScrollTrigger | SVG line or div with width 0→100% tweened by ScrollTrigger. | **Low** |
| FAQ accordion | CSS | max-height 0→auto transition, opacity 0→1. Chevron rotate 180deg. | **Low** |
| Page transition | GSAP | Outgoing page opacity 1→0 (0.2s), incoming 0→1 (0.3s). Wrapped in PageTransition component. | **Medium** |
| Button/link hovers | CSS | scale, box-shadow, border-color transitions. All CSS, no JS. | **Low** |
| Navbar scroll transition | CSS + JS | Scroll listener toggles class at 50px. CSS handles background/border transition. | **Low** |

---

## State & Logic Plan

### Routing

React Router v7 with 4 routes: `/`, `/services`, `/contact`, `/blog`. Hash-based routing if deployed as static, otherwise BrowserRouter.

### Contact Form (Hero + Contact Page)

Two independent forms, no backend. Frontend-only with validation:
- Required fields: name, email
- Email format validation via regex
- Phone optional on hero form, optional on contact page
- States: idle → loading (simulated 1.5s timeout) → success/error
- Success: inline message replaces button. No data sent anywhere.

### Blog Category Filter

Local state in Blog page. Category pills update a filter string. Grid renders filtered subset of posts array. "All" shows all 9 posts.

### Mobile Menu

Local state in Navbar: `isOpen` boolean toggles fullscreen overlay. Closes on route change or link click.

### Lenis + GSAP Integration

Lenis instance created at app root. Synced to GSAP ticker via `gsap.ticker.add(() => lenis.raf())`. Destroyed on unmount. Locked during page transitions.

### Three.js Lifecycle

ParticleNetwork component creates renderer/scene/camera in useEffect, disposes on unmount. Uses refs for canvas, renderer, and animation frame ID. Resize listener updates camera aspect and renderer size.
