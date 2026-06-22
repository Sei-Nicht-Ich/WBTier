# Cloudflare Pages Deployment - Erfolgreiches Setup

## Was wurde installiert

Die folgenden Pakete wurden erfolgreich zu Ihrem Projekt hinzugefügt:

```json
{
  "dependencies": {
    "@astrojs/cloudflare": "^13.0.0",
    "@astrojs/sitemap": "^3.7.3",
    "@astrojs/tailwind": "^5.1.2",
    "astro": "^6.4.8",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.4.50",
    "tailwindcss": "^3.4.17",
    "wrangler": "^4.103.0"
  }
}
```

## Wichtige Änderungen

### 1. Tailwind CSS Migration (v4 → v3)

**Grund:** Tailwind CSS v4 hat Kompatibilitätsprobleme mit Astro 6 und Node.js 22.14

**Änderungen in src/styles/global.css:**
- `@import "tailwindcss"` → `@tailwind base; @tailwind components; @tailwind utilities;`
- `@theme { ... }` → `@layer base { :root { ... } }`

**Neue Datei: tailwind.config.mjs** - Definiert Custom Colors und Fonts

**Neue Datei: wrangler.toml** - Cloudflare Pages Konfiguration

### 2. Astro Konfiguration

Die astro.config.mjs wurde für Tailwind v3 Integration angepasst.

## Deployment-Optionen

### Option 1: Cloudflare Dashboard (Empfohlen)

1. Gehen Sie zu https://dash.cloudflare.com
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Repository: `Sei-Nicht-Ich/WBTier`, Branch: `main`
4. Build-Einstellungen:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION = 22.12.0`
5. **Save and Deploy**

### Option 2: Wrangler CLI (Manuell)

```powershell
# 1. Bei Cloudflare authentifizieren
npx wrangler login

# 2. Build erstellen
npm run build

# 3. Zu Cloudflare Pages deployen
npm run deploy
```

Das `deploy` Script in package.json führt aus: `wrangler pages deploy dist`

## Warum funktioniert der ursprüngliche Befehl nicht?

Der Befehl `npx wrangler deploy` (ohne `pages`) ist für **Cloudflare Workers** gedacht.
Ihre statische Astro-Website muss mit **Cloudflare Pages** deployt werden.

Verwenden Sie stattdessen: `wrangler pages deploy dist`

## Statische vs. SSR-Site

Ihre Website ist eine **statische Site** (kein Server-Side Rendering).

Der `@astrojs/cloudflare` Adapter ist installiert, wird aber nicht in astro.config.mjs verwendet, da:
- Statische Sites keinen Adapter benötigen
- Der Build ohne Adapter schneller und einfacher ist
- Cloudflare Pages statische Sites nativ unterstützt

**Wenn Sie zukünftig SSR nutzen möchten**, fügen Sie in astro.config.mjs hinzu:
```javascript
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // oder 'hybrid'
  adapter: cloudflare(),
  // ...
});
```

## Build-Verifizierung

✅ **Build erfolgreich:** `npm run build`

Der Build generiert:
- `/datenschutz/index.html`
- `/impressum/index.html`
- `/index.html`
- `sitemap-index.xml`

Alle Dateien werden im `dist/` Verzeichnis erstellt.

## Zusammenfassung

✅ Alle Abhängigkeiten erfolgreich installiert
✅ Tailwind CSS v3 Migration abgeschlossen
✅ Build funktioniert fehlerfrei
✅ Wrangler konfiguriert für Pages-Deployment
✅ Ready für Cloudflare Pages Deployment!

## Nächste Schritte

1. Committen Sie die Änderungen:
   ```powershell
   git add .
   git commit -m "Setup Cloudflare Pages deployment mit Tailwind v3"
   git push origin main
   ```

2. Richten Sie das Cloudflare Pages Projekt ein (siehe Option 1 oben)

3. Bei jedem Push zu `main` wird automatisch neu deployt!
