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
- Englisch als Standardsprache beim ersten Start, Deutsch unter Settings wählbar
- Datenschutz, Copyright und Impressum innerhalb der App verlinkt
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
| `g04-language`      | App-Sprache (`en`/`de`)   |

Beim ersten Start werden Beispieldaten angelegt. Leerst du den Browser-Speicher, sind deine
eigenen Orte weg — eine Export-Funktion gibt es noch nicht.

## GitHub Pages

1. Repository auf GitHub pushen.
2. Unter **Settings → Pages** als Source **GitHub Actions** auswählen.
3. Der Workflow veröffentlicht die statischen Dateien automatisch.

## Google-Places-Suche

Die globale Suche unterstützt Google Places Text Search. Damit funktionieren Eingaben wie
`Hotel Bamberg`, `Restaurants Nürnberg` oder `Museen Berlin`.

1. In Google Cloud die **Maps JavaScript API** und **Places API (New)** aktivieren.
2. Einen Browser-API-Schlüssel erstellen und per HTTP-Referrer auf die eigene GitHub-Pages-Adresse beschränken.
3. Im Repository unter **Settings → Secrets and variables → Actions** ein Secret mit dem Namen
   `GOOGLE_MAPS_BROWSER_KEY` anlegen.
4. Der GitHub-Pages-Workflow erzeugt beim Deployment daraus automatisch `config.js`. Nutzer müssen
   keinen Schlüssel eingeben.
5. Optional: In der Cloud Console unter **Map Management** eine eigene Map-ID anlegen und im Repository als
   **Variable** (nicht als Secret) mit dem Namen `GOOGLE_MAPS_MAP_ID` hinterlegen. Ohne sie nutzt die Karte
   `DEMO_MAP_ID`, die Google nur für Tests vorsieht.
6. In der Hauptsuche einen Suchbegriff eingeben, ein Ergebnis auswählen und anschließend speichern.

**Kosten im Blick behalten:** Der Schlüssel gilt für alle Nutzer, die Rechnung geht an dich. Die Suche
fragt deshalb erst nach einer Sekunde Tippruhe an und lädt für die Trefferliste nur Basisfelder
(Name, Adresse, Lage). Bewertung, Öffnungszeiten, Telefon, Website und Foto werden erst geholt, wenn
jemand einen Treffer öffnet. Zusätzlich in der Cloud Console ein **Tageskontingent** und eine
**Budgetwarnung** einrichten — das ist der einzige harte Schutz.

`config.js` ist in `.gitignore` eingetragen und wird nicht committed. Für lokale Entwicklung kann
`config.example.js` als `config.js` kopiert und mit einem eigenen eingeschränkten Schlüssel ergänzt werden.
Da ein Browser-Schlüssel an Google Maps im Browser übertragen werden muss, ist er im ausgelieferten
Frontend technisch sichtbar. Deshalb sind HTTP-Referrer- und API-Einschränkungen zwingend erforderlich.

## Datenschutz und rechtliche Hinweise

Die Seiten [Datenschutzerklärung](privacy.html) und [Copyright & Impressum](imprint.html)
sind innerhalb der App verlinkt. Vor einem öffentlichen Release müssen die markierten
Betreiber- und Kontaktdaten ergänzt werden. Die Google-Places-Suche übermittelt
Suchtext an Google; der Standort wird nur nach einer ausdrücklichen Aktion und
Bestätigung des Nutzers verwendet. Die Schriften liegen unter `fonts/` und werden
nicht von Google geladen, damit beim Seitenaufruf keine IP-Adresse an Dritte geht.

## Auf iPhone und Android installieren

Nach der Veröffentlichung über GitHub Pages:

- **iPhone/iPad:** Seite in Safari öffnen → Teilen → **Zum Home-Bildschirm**.
- **Android:** Seite in Chrome öffnen → Menü → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.

Die App nutzt ein Web-App-Manifest und einen Service Worker. Dadurch startet sie wie eine App im
Vollbild und die bereits gespeicherten Orte bleiben offline verfügbar. Für eine native App im App
Store und bei Google Play ist die Android-Vorbereitung in
[PLAY_STORE_CHECKLIST.md](PLAY_STORE_CHECKLIST.md) beschrieben. iOS und iPad bleiben
als PWA über Safari installierbar.

## Entwicklung

Es gibt bewusst keinen Build-Schritt — der Quellcode ist das Deployment. Formatierung über
Prettier:

```bash
npx --yes prettier@3 --write .
```

Der Service Worker cached mit **stale-while-revalidate**: die App startet aus dem Cache und lädt
die neue Fassung im Hintergrund. Nach strukturellen Änderungen an den Assets die Konstante `CACHE`
in `sw.js` hochzählen.

**Icons:** `icon-192.png` / `icon-512.png` sind das App-Logo. `icon-maskable-512.png` enthält es verkleinert
im Schutzkreis für Android, `apple-touch-icon.png` vollflächig ohne eigene Rundung für iOS.

**Bilder:** Unter `images/` liegt je ein Motiv pro Kategorie (`category/`), für die Beispielorte (`places/`)
und die Beispiel-Listen (`trips/`), alle als WebP. `app.js` wählt das Bild anhand von Kategorie, Ort
bzw. Liste. Eigene Listen übernehmen das Bild ihres ersten Ortes.
