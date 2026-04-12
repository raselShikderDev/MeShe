# 🌸 Hurpori — A Romantic Web Experience

A beautifully crafted romantic interactive website built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## ✨ Features

- **Landing Page** — "Are you my Hurpori?" with YES/NO buttons
- **Protected /tea page** — sessionStorage-gated access
- **Moving NO button** — dodges on hover, surrenders after 5 tries
- **Rotating text** — 100 romantic lines, pauses on hover
- **Background music** — auto-loadable, toggle button
- **Floating elements** — petals 🌸, hearts 💕, babies 👶
- **Device info** — logged to console on YES click
- **GPS location** — requested on YES, graceful fallback
- **Contact section** — Email & Facebook links
- **Framer Motion** animations throughout
- **Fully responsive** — mobile & desktop

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
/app
  layout.tsx        # Root layout with Google Fonts
  globals.css       # Global styles + animations
  page.tsx          # Landing page (/)
  /tea
    page.tsx        # Tea page (/tea) — gated

/components
  FloatingElements.tsx  # Petals + floating emojis
  RotatingText.tsx      # 100-line romantic text rotator
  MovingButton.tsx      # Dodging NO button
  MusicPlayer.tsx       # Audio toggle
```

## 🎨 Customization

- **Email**: Change `youremail@example.com` in `/app/tea/page.tsx`
- **Facebook**: Replace the Facebook URL in `/app/tea/page.tsx`
- **Music**: Replace `MUSIC_URL` in `MusicPlayer.tsx` with your own audio file
- **Name**: Replace "Hurpori" in `app/page.tsx` with your person's nickname

## 🔒 Access Control

The `/tea` page checks `sessionStorage.getItem("allowed") === "true"`.
Only the YES button on the landing page sets this flag. Direct URL access redirects to `/`.

## 📱 Browser APIs Used

- `navigator.userAgent` — Device detection
- `navigator.platform` — Platform info
- `navigator.language` — Language
- `window.innerWidth/Height` — Screen size
- `Intl.DateTimeFormat()` — Timezone
- `navigator.geolocation` — GPS location (optional)
- `sessionStorage` — Access control

---

Made with 💕
