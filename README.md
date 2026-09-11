# G04Explore

Eine mobile-first Web-App als persönlicher Speicher und digitaler Planer für Lieblingsorte.

## Live testen

Die App ist eine reine statische Website und funktioniert ohne Build-Schritt.

Für den vollen Funktionsumfang über einen lokalen Server öffnen — Service Worker und damit der
Offline-Modus brauchen `http(s)` und laufen nicht über `file://`:

```bash
npx --yes serve .
```

## Enthalten

- Bento-Grid-Dashboard mit Kategorien und echten Zählern
- Suche mit Type-ahead; ohne Treffer direkt als neuen Ort anlegen
- Ortsdetails mit Status, Bewertung, Öffnungszeiten, Notizen und Route
- Orte anlegen, bearbeiten und löschen — Speicherung im Browser (`localStorage`)
- Reise-Listen: anlegen, umbenennen, Orte zuordnen, löschen
- Dark Mode, Offline-Modus und Benachrichtigungen in den Einstellungen
- Tastaturbedienung: `⌘/Strg + K` für die Suche, `Esc` schließt Dialoge
- Responsive Darstellung für Smartphone und Desktop

## Datenhaltung

Alles liegt ausschließlich im Browser des Geräts, es geht nichts an einen Server:

| Schlüssel           | Inhalt                    |
| ------------------- | ------------------------- |
| `g04-places`        | gespeicherte Orte         |
| `g04-trips`         | Reise-Listen              |
| `g04-theme`         | Hell/Dunkel               |
| `g04-name`          | Name für die Begrüßung    |
| `g04-offline`       | Offline-Modus an/aus      |
| `g04-notifications` | Benachrichtigungen an/aus |

Beim ersten Start werden Beispieldaten angelegt. Leerst du den Browser-Speicher, sind deine
eigenen Orte weg — eine Export-Funktion gibt es noch nicht.

## GitHub Pages

1. Repository auf GitHub pushen.
2. Unter **Settings → Pages** als Source **GitHub Actions** auswählen.
3. Der Workflow veröffentlicht die statischen Dateien automatisch.

Die Google-Places- und Firebase-Anbindung kann später in `app.js` ergänzt werden. API-Schlüssel
bitte ausschließlich über eine sichere Backend- oder Secret-Konfiguration einbinden.

## Auf iPhone und Android installieren

Nach der Veröffentlichung über GitHub Pages:

- **iPhone/iPad:** Seite in Safari öffnen → Teilen → **Zum Home-Bildschirm**.
- **Android:** Seite in Chrome öffnen → Menü → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

Die App nutzt ein Web-App-Manifest und einen Service Worker. Dadurch startet sie wie eine App im
Vollbild und die bereits gespeicherten Orte bleiben offline verfügbar. Für eine native App im App
Store und bei Google Play wäre anschließend ein Expo/React-Native-Wrapper mit eigenen
Store-Accounts erforderlich.

## Entwicklung

Es gibt bewusst keinen Build-Schritt — der Quellcode ist das Deployment. Formatierung über
Prettier:

```bash
npx --yes prettier@3 --write .
```

Der Service Worker cached mit **stale-while-revalidate**: die App startet aus dem Cache und lädt
die neue Fassung im Hintergrund. Nach strukturellen Änderungen an den Assets die Konstante `CACHE`
in `sw.js` hochzählen.

Die Icons unter `icons/` werden aus `icon-192.svg` / `icon-512.svg` erzeugt. Die PNG-Fassungen sind
nötig, weil iOS für den Home-Bildschirm kein SVG akzeptiert.
