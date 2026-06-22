# Cloudflare Pages Deployment Anleitung

## Problem und Lösung

Ihre Astro-Website ist eine **statische Website** und benötigt keinen Server-Side Rendering Adapter. 
Der Fehler tritt auf, weil Wrangler versucht, automatisch @astrojs/cloudflare zu installieren, was für statische Sites nicht notwendig ist.

## Richtige Deployment-Methode für Cloudflare Pages

### Option 1: Über das Cloudflare Dashboard (Empfohlen)

1. **Gehen Sie zum Cloudflare Dashboard:**
   - Melden Sie sich bei https://dash.cloudflare.com an
   - Navigieren Sie zu **Workers & Pages**

2. **Erstellen Sie ein neues Pages-Projekt:**
   - Klicken Sie auf **Create application**
   - Wählen Sie **Pages** > **Connect to Git**

3. **Verbinden Sie Ihr GitHub-Repository:**
   - Autorisieren Sie Cloudflare für GitHub
   - Wählen Sie das Repository: Sei-Nicht-Ich/WBTier
   - Branch: main

4. **Build-Einstellungen konfigurieren:**
   - Framework preset: Astro
   - Build command: npm run build
   - Build output directory: dist
   - Root directory: (leave empty)

5. **Umgebungsvariablen (falls benötigt):**
   - Node-Version: NODE_VERSION = 22.12.0

6. **Deploy starten:**
   - Klicken Sie auf **Save and Deploy**
   - Bei jedem Push zu main wird automatisch neu deployt

### Option 2: Über die Wrangler CLI (Lokal)

Falls Sie trotzdem lokal deployen möchten:

1. Wrangler global installieren: npm install -g wrangler
2. Bei Cloudflare authentifizieren: wrangler login
3. Pages-Projekt erstellen: npm run build && wrangler pages deploy dist --project-name=wbtier

## Warum funktioniert npx wrangler deploy nicht?

Der Befehl npx wrangler deploy ist für **Workers** gedacht, nicht für **Pages**.
- **Workers** = Serverless-Funktionen (benötigt Adapter)
- **Pages** = Statische Websites (kein Adapter nötig)

Für statische Astro-Sites verwenden Sie **Cloudflare Pages**, nicht Workers.

## Zusammenfassung

Nicht verwenden:
- npx wrangler deploy (für Workers)
- @astrojs/cloudflare Adapter (für SSR)
- wrangler.toml (für Workers)

Stattdessen:
- Cloudflare Pages über das Dashboard mit GitHub-Integration
- Oder wrangler pages deploy dist für manuelle Deployments
- Ihre statische Astro-Build-Konfiguration beibehalten
