# G04Explore · Google Play Vorbereitung

Die Web-App ist für eine Veröffentlichung über GitHub Pages vorbereitet. Für den
Google Play Store braucht sie zusätzlich einen signierten Android-Wrapper. Für diese
PWA ist eine Trusted Web Activity (TWA) mit Bubblewrap der passende Weg.

## Vor der Veröffentlichung

- [ ] In [privacy.html](./privacy.html) alle Angaben in eckigen Klammern ersetzen.
- [ ] In [imprint.html](./imprint.html) Name, ladungsfähige Anschrift und Kontakt ergänzen.
- [ ] Die Datenschutzerklärung öffentlich testen:
      https://paulfv.github.io/G04Explore/privacy.html
- [ ] Google Maps Platform, Places API (New) und Billing prüfen.
- [ ] Den Browser-Key auf https://paulfv.github.io/* sowie die tatsächlich
      benötigten APIs beschränken. Der Pfad darf nicht mit hinein: GitHub Pages
      sendet nur die Domain als Referrer, mit Pfad blockiert Google jede Anfrage.
- [ ] Store-Beschreibung, Support-E-Mail, App-Icon und mindestens ein Screenshot
      für Telefon und Tablet vorbereiten.
- [ ] In Play Console die Angaben zu Google Places, optionalem Standort und
      Benachrichtigungen im Bereich **Data safety** wahrheitsgemäß ausfüllen.

## Android-TWA erzeugen

Die folgenden Befehle werden nach dem öffentlichen GitHub-Pages-Deployment in einem
separaten Android-Ordner ausgeführt:

    npm install --global @bubblewrap/cli
    bubblewrap init --manifest=https://paulfv.github.io/G04Explore/manifest.webmanifest
    bubblewrap build
    bubblewrap install

Für den Store wird das erzeugte **Android App Bundle (.aab)** hochgeladen. Beim
init-Dialog einen stabilen Paketnamen wählen, zum Beispiel
com.example.g04explore erst nach Prüfung durch den Betreiber. Paketname und
Signaturschlüssel später nicht ändern.

## Digital Asset Links

Damit Android die Website als vertrauenswürdige TWA ohne Browser-Leiste öffnet, muss
unter /.well-known/assetlinks.json die Beziehung zwischen Website und Android-App
liegen. Die Datei wird erst mit dem echten Paketnamen und dem SHA-256-Fingerabdruck
des Play-App-Signing-Zertifikats vollständig. Diese Werte dürfen nicht erfunden
werden; deshalb ist die Datei hier noch nicht als produktive JSON-Datei angelegt.

## Datenschutz im App-Fluss

Die App hat bereits:

- englische Standardsprache beim ersten Start und Deutsch unter Settings,
- einen Link zur Datenschutzerklärung innerhalb der App,
- eine sichtbare Standort-Erklärung vor der Browser-Berechtigungsabfrage,
- keine Benutzerkonten und keine eigene Server-Datenbank,
- lokale Speicherung für Orte, Listen, Notizen und Einstellungen,
- keine Anfrage für Kamera, Kontakte oder Mikrofon.

Wenn später Konten, Analytics, Werbung, Push-Server oder eine eigene Datenbank
hinzukommen, müssen Datenschutzerklärung und Play-Console-Data-Safety-Angaben neu
geprüft werden. Bei dieser statischen Version gibt es keine Konten, für die eine
Kontolöschung angeboten werden müsste.

## Wichtige Play-Checks

1. Auf einem echten Android-Gerät testen: Start, Zurück-Navigation, Offline-Modus,
   Standort-Ablehnung, Google-Places-Fehler, externe Navigation und Teilen.
2. Light/Dark Mode, Englisch/Deutsch und responsive Layout auf Telefon und Tablet
   prüfen.
3. Platzhalter in den Rechtstexten entfernen, bevor ein Release hochgeladen wird.
4. AAB signieren, internes Testing in Play Console durchführen und erst danach
   Produktion beantragen.
5. Die Android-Target-API im erzeugten Wrapper auf die aktuell von Play geforderte
   Version setzen. Die genaue Anforderung ist zeitabhängig und muss beim Upload
   erneut geprüft werden.

Offizielle Hinweise:

- [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity)
- [Bubblewrap Quick Start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)
- [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311)
- [Google Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469)
- [Target API level requirement](https://developer.android.com/google/play/requirements/target-sdk)
