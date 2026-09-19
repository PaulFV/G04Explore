/*
 * G04Explore — persönlicher Speicher und Planer für Lieblingsorte.
 *
 * Reine Client-App ohne Build-Schritt. Alle Daten liegen in localStorage,
 * es werden keine Inhalte an einen Server gesendet.
 */

"use strict";

/* ------------------------------------------------------------- Sprache */

const TRANSLATIONS = {
  en: {
    "nav.tripsShort": "Travel lists",
    "nav.settingsShort": "Settings",
    "search.loadingDetails": "Loading place details…",
    "location.title": "Use your location?",
    "location.allow": "Use location",
    "seed.p1.hours": "11:30 – 22:00",
    "seed.p1.note": "Don’t miss the Kaiserschmarrn.",
    "seed.p2.hours": "Reception open 24 hours",
    "seed.p2.note": "Lovely lobby for working.",
    "seed.p3.note": "Note the next exhibition.",
    "seed.p4.hours": "08:00 – 18:00",
    "seed.p5.hours": "11:00 – 20:00",
    "seed.t1": "Explore Munich",
    "seed.t2": "Berlin weekend",
    "seed.t3": "Museum day",
    "meta.title": "G04Explore — Your places. Your map.",
    "meta.description": "Your personal space for saving and planning favorite places.",
    "brand.eyebrow": "YOUR EXPLORER SPACE",
    "nav.main": "Main navigation",
    "nav.home": "Overview",
    "nav.explore": "Explore",
    "nav.search": "Search",
    "nav.saved": "All places",
    "nav.trips": "Travel lists",
    "nav.settings": "Settings",
    "offline.available": "Available offline",
    "offline.description": "Your collection stays with you on the go.",
    "theme.toggle": "Toggle dark mode",
    "header.language": "Language",
    "header.nearby": "Explore nearby",
    "place.save": "＋ Save place",
    "search.label": "Search places",
    "search.placeholder": "Search places, cities or categories...",
    "search.suggestions": "Search suggestions",
    "search.heading": "Find your next favorite place",
    "search.subtitle": "Search nearby or explore a new destination.",
    "search.filters": "Search shortcuts",
    "search.filterToggle": "Show search shortcuts",
    "search.nearbyLabel": "Near me",
    "search.resultsLabel": "Google Maps search results",
    "search.results": "Search results",
    "search.photoAlt": "Photo of {{name}}",
    "search.navigation": "↗ Navigation",
    "search.nearby": "⌖ Near me",
    "search.viewMap": "View map",
    "search.area": "Search this area",
    "search.close": "Close search results",
    "home.nearby": "Near you",
    "home.search": "⌖ Search",
    "home.insights": "Overview insights",
    "saved.eyebrow": "YOUR PLACES",
    "saved.title": "Your favorite places",
    "saved.subtitle": "Everything you love, saved in one place.",
    "saved.statsSaved": "Saved",
    "saved.statsFavorites": "Favorites",
    "saved.statsWishlist": "Want to visit",
    "saved.searchPlaceholder": "Search saved places...",
    "saved.reset": "Reset filters",
    "saved.categoryEyebrow": "CATEGORY",
    "saved.tripEyebrow": "TRAVEL LIST",
    "filter.aria": "Filter and sort places",
    "filter.categoryLabel": "Filter by category",
    "filter.statusLabel": "Filter by visit status",
    "filter.sortLabel": "Sort places",
    "filter.categories": "All categories",
    "filter.status": "All statuses",
    "filter.favorites": "Favorites only",
    "sort.recent": "Recently saved",
    "sort.name": "Name A–Z",
    "sort.ownRating": "Your rating",
    "sort.googleRating": "Google rating",
    "sort.distance": "Distance",
    "trips.eyebrow": "TRAVEL LISTS",
    "trips.heading": "Let's explore together",
    "trips.subtitle": "Plan beautiful days and keep every place together.",
    "trips.new": "＋ New list",
    "trips.statsLists": "Lists",
    "trips.statsPlaces": "Places",
    "trips.statsCities": "Cities",
    "trips.onlyDevice": "Only on this device",
    "trips.planned": "{{done}} of {{total}} planned",
    "settings.eyebrow": "APP SETTINGS",
    "settings.heading": "Your settings",
    "settings.subtitle": "Make G04X work exactly the way you like.",
    "settings.appearance": "APPEARANCE & ACCESSIBILITY",
    "settings.appData": "APP & DATA",
    "settings.services": "SERVICES",
    "settings.legalGroup": "LEGAL & PRIVACY",
    "settings.dark": "Dark mode",
    "settings.darkHint": "Easier on your eyes in low light",
    "settings.offline": "Offline mode",
    "settings.offlineHint": "Saved places available offline",
    "settings.notifications": "Notifications",
    "settings.notificationsHint": "Tips and reminders about your places",
    "settings.google": "Google Places",
    "settings.googleHint": "Provided centrally for all users",
    "settings.central": "CENTRAL",
    "settings.notConnected": "Not connected",
    "settings.connect": "Connect",
    "settings.language": "Language",
    "settings.languageHint": "Choose your app language",
    "settings.english": "English",
    "settings.german": "German",
    "settings.footer": "G04EX · Your data stays on this device. © 2026 G04Explore.",
    "settings.reset": "↻ Reset settings",
    "settings.privacy": "Privacy policy",
    "settings.privacyHint": "How G04Explore handles your data",
    "settings.copyright": "Copyright & imprint",
    "settings.copyrightHint": "Publisher and app rights",
    "noscript": "G04Explore needs JavaScript to show your saved places.",
    "category.Restaurants": "Restaurants",
    "category.Hotels": "Hotels",
    "category.Events": "Events",
    "category.Sport": "Sports",
    "category.Museen": "Museums",
    "category.Sehenswürdigkeiten": "Sights",
    "category.Cafés": "Cafés",
    "category.Private": "Private",
    "tagline.Restaurants": "Great addresses for every taste",
    "tagline.Hotels": "Sleep & settle in",
    "tagline.Events": "Dates you don't want to miss",
    "tagline.Sport": "Movement and fresh air",
    "tagline.Museen": "Art, history and ideas",
    "tagline.Sehenswürdigkeiten": "Places that stay with you",
    "tagline.Cafés": "Short breaks, great coffee",
    "tagline.Private": "Your personal favorites",
    "place.singular": "place",
    "place.plural": "places",
    "saved.suffix": "saved",
    "status.wishlist": "Want to visit",
    "status.planned": "Planned",
    "status.visited": "Visited",
    "status.open": "● Open now",
    "status.closed": "● Closed",
    "favorite.yes": "Favorite",
    "favorite.no": "Not a favorite",
    "empty.places": "No places saved yet. Add your first with “＋ Save place”.",
    "empty.category": "Nothing saved in this category yet.",
    "empty.trip": "This list is empty.",
    "empty.trips": "No lists yet. Create your first one with “＋ New list”.",
    "empty.recent": "No places saved yet.",
    "empty.favorites": "Mark places as favorites.",
    "empty.nearby": "Use your location when asked.",
    "category.aria": "Category {{category}}, {{count}}",
    "trip.aria": "List {{name}}, {{count}}",
    "saved.list": "List",
    "detail.reviews": "reviews",
    "detail.close": "Close",
    "detail.opening": "OPENING HOURS",
    "detail.status": "STATUS",
    "detail.ownRating": "YOUR RATING",
    "detail.price": "PRICE",
    "detail.lists": "On {{count}} list(s):",
    "detail.notes": "YOUR NOTES",
    "detail.edit": "Edit",
    "detail.share": "Share",
    "detail.route": "↗ Start route",
    "detail.call": "☎ Call",
    "detail.website": "↗ Website",
    "detail.delete": "🗑 Delete",
    "detail.dialog": "Details for {{name}}",
    "detail.noteSaved": "Note saved.",
    "detail.linkCopied": "Place link copied.",
    "detail.confirmDelete": "Do you really want to delete {{name}}?",
    "detail.deleted": "{{name}} was deleted.",
    "form.close": "Close",
    "form.saveTitle": "Save place",
    "form.editTitle": "Edit place",
    "form.name": "NAME",
    "form.address": "ADDRESS",
    "form.category": "CATEGORY",
    "form.rating": "RATING",
    "form.ownRating": "YOUR RATING",
    "form.visitDate": "VISIT DATE",
    "form.visitStatus": "VISIT STATUS",
    "form.hours": "OPENING HOURS",
    "form.hoursPlaceholder": "Today 09:00 – 18:00",
    "form.phone": "PHONE",
    "form.website": "WEBSITE",
    "form.note": "NOTE",
    "form.open": "Open now",
    "form.favorite": "Mark as favorite",
    "form.cancel": "Cancel",
    "form.save": "Save",
    "form.saveChanges": "Save changes",
    "form.dialogNew": "Save new place",
    "form.dialogEdit": "Edit place",
    "form.requiredName": "Please enter a name.",
    "form.duplicate": "{{name}} is already saved.",
    "form.saved": "{{name}} was saved.",
    "form.updated": "Changes to {{name}} saved.",
    "trip.name": "LIST NAME",
    "trip.symbol": "SYMBOL",
    "trip.chooseSymbol": "Choose symbol",
    "trip.places": "PLACES IN THIS LIST",
    "trip.noPlaces": "You have no saved places yet.",
    "trip.delete": "Delete list",
    "trip.save": "Save",
    "trip.dialog": "List {{name}}",
    "trip.editSubtitle": "Edit travel list",
    "trip.selected": "{{count}} places selected",
    "trip.placesSelected": "{{selected}} of {{total}} selected",
    "trip.localNote": "Changes are stored only on this device.",
    "trip.saved": "List {{name}} saved.",
    "trip.confirmDelete": "Delete list “{{name}}”? The places themselves will stay saved.",
    "trip.deleted": "List deleted.",
    "trip.newName": "New list",
    "search.googleSource": "Results from Google Places",
    "search.googleSearching": "Searching Google Places …",
    "search.googleMissing": "Google Places is not set up for this app yet. <span>Open help →</span>",
    "search.googleDenied": "Google is blocking this website. Check the API key's HTTP referrer.",
    "search.googleBilling": "Google Maps needs an active billing account for this project.",
    "search.googleApis": "Enable Maps JavaScript API and Places API (New) in Google Cloud.",
    "search.googleQuota": "The Google Maps quota was reached. Check quota and billing in Google Cloud.",
    "search.googleKey": "The central Google API key was rejected. Check the key, referrer and API restrictions.",
    "search.googleUnavailable": "Google Places is currently unavailable. Check the API key, billing and network.",
    "search.googleNone": "No matching places found on Google.",
    "search.manualTitle": "Save “{{query}}” manually",
    "search.manualSubtitle": "Create your own place",
    "search.ratingCount": "★ {{rating}} ({{count}})",
    "search.distance": "{{distance}} km away",
    "search.resultCount": "{{count}} results for “{{query}}”",
    "search.mapLabel": "Search results map",
    "search.mapUnavailable": "Map currently unavailable.",
    "search.locationRequest": "Location permission requested.",
    "search.nearbyQuery": "Places near me",
    "search.locationDisclosure": "G04Explore will use your device location only to find nearby places. With your permission, it is sent to Google Places and is not saved by this app. Continue?",
    "search.locationUsed": "Location used — loading results.",
    "search.locationDenied": "Location not shared. Search also works without it.",
    "search.noLocation": "This browser does not support location.",
    "search.mapFirst": "Start a map search first.",
    "storage.error": "Could not save — browser storage is full or blocked.",
    "offline.httpOnly": "Available only over http(s) — not when opening the file directly.",
    "offline.unavailable": "Offline mode is not available in this browser.",
    "offline.enabled": "Saved places available offline",
    "offline.enableError": "Could not enable — please reload the page.",
    "offline.removed": "Offline cache removed. The app now needs a connection.",
    "notifications.unsupported": "This browser does not support notifications.",
    "notifications.blocked": "Blocked in browser settings.",
    "notifications.hint": "Tips and reminders about your places",
    "notifications.active": "Active — you will receive reminders.",
    "notifications.denied": "The browser did not allow notifications.",
    "google.connected": "Centrally connected — search above, for example “Hotel Bamberg”",
    "google.notConfigured": "Not configured yet — the app administrator must connect Google Places",
    "language.changed": "Language changed to {{language}}.",
  },
  de: {
    "nav.tripsShort": "Listen",
    "nav.settingsShort": "Optionen",
    "search.loadingDetails": "Details werden geladen …",
    "location.title": "Standort verwenden?",
    "location.allow": "Standort verwenden",
    "seed.p1.hours": "11:30 – 22:00",
    "seed.p1.note": "Unbedingt den Kaiserschmarrn probieren.",
    "seed.p2.hours": "Rezeption rund um die Uhr",
    "seed.p2.note": "Schöne Lobby zum Arbeiten.",
    "seed.p3.note": "Nächste Ausstellung vormerken.",
    "seed.p4.hours": "08:00 – 18:00",
    "seed.p5.hours": "11:00 – 20:00",
    "seed.t1": "München entdecken",
    "seed.t2": "Berlin-Wochenende",
    "seed.t3": "Museumstag",
    "meta.title": "G04Explore — Deine Orte. Deine Karte.",
    "meta.description": "Dein persönlicher Speicher und digitaler Planer für Lieblingsorte.",
    "brand.eyebrow": "DEIN ENTDECKER-SPACE",
    "nav.main": "Hauptnavigation",
    "nav.home": "Übersicht",
    "nav.explore": "Erkunden",
    "nav.search": "Suchen",
    "nav.saved": "Alle Orte",
    "nav.trips": "Reise-Listen",
    "nav.settings": "Einstellungen",
    "offline.available": "Offline verfügbar",
    "offline.description": "Deine Sammlung bleibt auch unterwegs bei dir.",
    "theme.toggle": "Dark Mode umschalten",
    "header.language": "Sprache",
    "header.nearby": "In der Nähe entdecken",
    "place.save": "＋ Ort speichern",
    "search.label": "Orte durchsuchen",
    "search.placeholder": "Nach Orten, Städten oder Kategorien suchen...",
    "search.suggestions": "Suchvorschläge",
    "search.heading": "Finde deinen nächsten Lieblingsort",
    "search.subtitle": "Suche in deiner Nähe oder entdecke ein neues Reiseziel.",
    "search.filters": "Schnellsuche",
    "search.filterToggle": "Schnellsuche einblenden",
    "search.nearbyLabel": "Meine Nähe",
    "search.resultsLabel": "Google-Maps-Suchergebnisse",
    "search.results": "Suchergebnisse",
    "search.photoAlt": "Foto von {{name}}",
    "search.navigation": "↗ Navigation",
    "search.nearby": "⌖ Meine Nähe",
    "search.viewMap": "Karte anzeigen",
    "search.area": "In diesem Bereich suchen",
    "search.close": "Suchergebnisse schließen",
    "home.nearby": "In deiner Nähe",
    "home.search": "⌖ Suchen",
    "home.insights": "Übersicht und Empfehlungen",
    "saved.eyebrow": "DEINE ORTE",
    "saved.title": "Deine Lieblingsorte",
    "saved.subtitle": "Alles, was du liebst, an einem Ort gespeichert.",
    "saved.statsSaved": "Gespeichert",
    "saved.statsFavorites": "Favoriten",
    "saved.statsWishlist": "Möchte ich besuchen",
    "saved.searchPlaceholder": "Gespeicherte Orte suchen...",
    "saved.reset": "Filter zurücksetzen",
    "saved.categoryEyebrow": "KATEGORIE",
    "saved.tripEyebrow": "REISE-LISTE",
    "filter.aria": "Orte filtern und sortieren",
    "filter.categoryLabel": "Nach Kategorie filtern",
    "filter.statusLabel": "Nach Besuchsstatus filtern",
    "filter.sortLabel": "Orte sortieren",
    "filter.categories": "Alle Kategorien",
    "filter.status": "Alle Status",
    "filter.favorites": "Nur Favoriten",
    "sort.recent": "Zuletzt gespeichert",
    "sort.name": "Name A–Z",
    "sort.ownRating": "Eigene Bewertung",
    "sort.googleRating": "Google-Bewertung",
    "sort.distance": "Entfernung",
    "trips.eyebrow": "REISE-LISTEN",
    "trips.heading": "Gemeinsam unterwegs",
    "trips.subtitle": "Plane schöne Tage und behalte alle Orte zusammen.",
    "trips.new": "＋ Neue Liste",
    "trips.statsLists": "Listen",
    "trips.statsPlaces": "Orte",
    "trips.statsCities": "Städte",
    "trips.onlyDevice": "Nur auf diesem Gerät",
    "trips.planned": "{{done}} von {{total}} geplant",
    "settings.eyebrow": "APP EINSTELLUNGEN",
    "settings.heading": "Deine Einstellungen",
    "settings.subtitle": "Passe G04X genau an deine Wünsche an.",
    "settings.appearance": "DARSTELLUNG & BARRIEREFREIHEIT",
    "settings.appData": "APP & DATEN",
    "settings.services": "DIENSTE",
    "settings.legalGroup": "RECHT & DATENSCHUTZ",
    "settings.dark": "Dark Mode",
    "settings.darkHint": "Schont deine Augen bei wenig Licht",
    "settings.offline": "Offline-Modus",
    "settings.offlineHint": "Gespeicherte Orte offline verfügbar",
    "settings.notifications": "Benachrichtigungen",
    "settings.notificationsHint": "Tipps und Erinnerungen zu deinen Orten",
    "settings.google": "Google Places",
    "settings.googleHint": "Wird zentral für alle Nutzer bereitgestellt",
    "settings.central": "ZENTRAL",
    "settings.notConnected": "Nicht verbunden",
    "settings.connect": "Verbinden",
    "settings.language": "Sprache",
    "settings.languageHint": "Wähle die Sprache der App",
    "settings.english": "Englisch",
    "settings.german": "Deutsch",
    "settings.footer": "G04EX · Deine Daten bleiben auf diesem Gerät gespeichert. © 2026 G04Explore.",
    "settings.reset": "↻ Einstellungen zurücksetzen",
    "settings.privacy": "Datenschutzerklärung",
    "settings.privacyHint": "So verarbeitet G04Explore deine Daten",
    "settings.copyright": "Copyright & Impressum",
    "settings.copyrightHint": "Herausgeber und Rechte der App",
    "noscript": "G04Explore braucht JavaScript, um deine gespeicherten Orte anzuzeigen.",
    "category.Restaurants": "Restaurants",
    "category.Hotels": "Hotels",
    "category.Events": "Events",
    "category.Sport": "Sport",
    "category.Museen": "Museen",
    "category.Sehenswürdigkeiten": "Sehenswürdigkeiten",
    "category.Cafés": "Cafés",
    "category.Private": "Privat",
    "tagline.Restaurants": "Gute Adressen für jeden Geschmack",
    "tagline.Hotels": "Schlafen & ankommen",
    "tagline.Events": "Termine, die du nicht verpassen willst",
    "tagline.Sport": "Bewegung und frische Luft",
    "tagline.Museen": "Kunst, Geschichte und Ideen",
    "tagline.Sehenswürdigkeiten": "Orte, die bleiben",
    "tagline.Cafés": "Kurze Pausen, guter Kaffee",
    "tagline.Private": "Deine persönlichen Favoriten",
    "place.singular": "Ort",
    "place.plural": "Orte",
    "saved.suffix": "gespeichert",
    "status.wishlist": "Möchte ich besuchen",
    "status.planned": "Geplant",
    "status.visited": "Besucht",
    "status.open": "● Jetzt geöffnet",
    "status.closed": "● Geschlossen",
    "favorite.yes": "Favorit",
    "favorite.no": "Kein Favorit",
    "empty.places": "Noch keine Orte gespeichert. Leg deinen ersten mit „＋ Ort speichern“ an.",
    "empty.category": "In dieser Kategorie ist noch nichts gespeichert.",
    "empty.trip": "Diese Liste ist noch leer.",
    "empty.trips": "Noch keine Liste angelegt. Leg deine erste mit „＋ Neue Liste“ an.",
    "empty.recent": "Noch keine Orte gespeichert.",
    "empty.favorites": "Markiere Orte als Favorit.",
    "empty.nearby": "Standort auf Anfrage verwenden.",
    "category.aria": "Kategorie {{category}}, {{count}}",
    "trip.aria": "Liste {{name}}, {{count}}",
    "saved.list": "Liste",
    "detail.reviews": "Bewertungen",
    "detail.close": "Schließen",
    "detail.opening": "ÖFFNUNGSZEITEN",
    "detail.status": "STATUS",
    "detail.ownRating": "EIGENE BEWERTUNG",
    "detail.price": "PREIS",
    "detail.lists": "Auf {{count}} Liste(n):",
    "detail.notes": "DEINE NOTIZEN",
    "detail.edit": "Bearbeiten",
    "detail.share": "Teilen",
    "detail.route": "↗ Route starten",
    "detail.call": "☎ Anrufen",
    "detail.website": "↗ Website",
    "detail.delete": "🗑 Löschen",
    "detail.dialog": "Details zu {{name}}",
    "detail.noteSaved": "Notiz gespeichert.",
    "detail.linkCopied": "Ort-Link kopiert.",
    "detail.confirmDelete": "Möchtest du {{name}} wirklich löschen?",
    "detail.deleted": "{{name}} wurde gelöscht.",
    "form.close": "Schließen",
    "form.saveTitle": "Ort speichern",
    "form.editTitle": "Ort bearbeiten",
    "form.name": "NAME",
    "form.address": "ADRESSE",
    "form.category": "KATEGORIE",
    "form.rating": "BEWERTUNG",
    "form.ownRating": "EIGENE BEWERTUNG",
    "form.visitDate": "BESUCHSDATUM",
    "form.visitStatus": "BESUCHSSTATUS",
    "form.hours": "ÖFFNUNGSZEITEN",
    "form.hoursPlaceholder": "Heute 09:00 – 18:00",
    "form.phone": "TELEFON",
    "form.website": "WEBSITE",
    "form.note": "NOTIZ",
    "form.open": "Aktuell geöffnet",
    "form.favorite": "Als Favorit markieren",
    "form.cancel": "Abbrechen",
    "form.save": "Speichern",
    "form.saveChanges": "Änderungen sichern",
    "form.dialogNew": "Neuen Ort speichern",
    "form.dialogEdit": "Ort bearbeiten",
    "form.requiredName": "Bitte gib einen Namen ein.",
    "form.duplicate": "{{name}} ist bereits gespeichert.",
    "form.saved": "{{name}} wurde gespeichert.",
    "form.updated": "Änderungen an {{name}} gesichert.",
    "trip.name": "NAME DER LISTE",
    "trip.symbol": "SYMBOL",
    "trip.chooseSymbol": "Symbol wählen",
    "trip.places": "ORTE IN DIESER LISTE",
    "trip.noPlaces": "Du hast noch keine Orte gespeichert.",
    "trip.delete": "Liste löschen",
    "trip.save": "Speichern",
    "trip.dialog": "Liste {{name}}",
    "trip.editSubtitle": "Reiseliste bearbeiten",
    "trip.selected": "{{count}} Orte ausgewählt",
    "trip.placesSelected": "{{selected}} von {{total}} ausgewählt",
    "trip.localNote": "Änderungen werden nur auf diesem Gerät gespeichert.",
    "trip.saved": "Liste {{name}} gespeichert.",
    "trip.confirmDelete": "Liste „{{name}}“ wirklich löschen? Die Orte selbst bleiben erhalten.",
    "trip.deleted": "Liste gelöscht.",
    "trip.newName": "Neue Liste",
    "search.googleSource": "Ergebnisse von Google Places",
    "search.googleSearching": "Suche bei Google Places …",
    "search.googleMissing": "Google Places ist für diese App noch nicht eingerichtet. <span>Hinweise öffnen →</span>",
    "search.googleDenied": "Google blockiert diese Website: GitHub-Pages-Adresse als HTTP-Referrer im API-Key freigeben.",
    "search.googleBilling": "Google Maps benötigt ein aktives Billing-Konto für dieses Projekt.",
    "search.googleApis": "Maps JavaScript API und Places API (New) müssen in Google Cloud aktiviert sein.",
    "search.googleQuota": "Das Google-Maps-Limit wurde erreicht. Bitte Quota und Abrechnung in Google Cloud prüfen.",
    "search.googleKey": "Der zentrale Google-API-Key wurde abgelehnt. Bitte Key, Referrer und API-Einschränkungen prüfen.",
    "search.googleUnavailable": "Google Places ist momentan nicht erreichbar. Bitte API-Key, Billing und Netzwerk prüfen.",
    "search.googleNone": "Keine passenden Orte bei Google gefunden.",
    "search.manualTitle": "„{{query}}“ manuell speichern",
    "search.manualSubtitle": "Eigenen Ort anlegen",
    "search.ratingCount": "★ {{rating}} ({{count}})",
    "search.distance": "{{distance}} km entfernt",
    "search.resultCount": "{{count}} Ergebnisse für „{{query}}“",
    "search.mapLabel": "Karte mit Suchergebnissen",
    "search.mapUnavailable": "Karte momentan nicht verfügbar.",
    "search.locationRequest": "Standortfreigabe wird angefragt.",
    "search.nearbyQuery": "Orte in meiner Nähe",
    "search.locationDisclosure": "G04Explore verwendet deinen Gerätestandort nur, um Orte in deiner Nähe zu finden. Mit deiner Zustimmung wird er an Google Places übermittelt und von dieser App nicht gespeichert. Fortfahren?",
    "search.locationUsed": "Standort verwendet — Ergebnisse werden geladen.",
    "search.locationDenied": "Standort nicht freigegeben. Die Suche funktioniert auch ohne Standort.",
    "search.noLocation": "Dieser Browser unterstützt keinen Standort.",
    "search.mapFirst": "Erst eine Kartensuche starten.",
    "storage.error": "Speichern nicht möglich — der Browser-Speicher ist voll oder gesperrt.",
    "offline.httpOnly": "Nur über http(s) verfügbar — nicht beim direkten Öffnen der Datei.",
    "offline.unavailable": "Offline-Modus ist in diesem Browser nicht verfügbar.",
    "offline.enabled": "Gespeicherte Orte offline verfügbar",
    "offline.enableError": "Konnte nicht aktiviert werden — bitte Seite neu laden.",
    "offline.removed": "Offline-Cache entfernt. Die App braucht jetzt eine Verbindung.",
    "notifications.unsupported": "Dieser Browser unterstützt keine Benachrichtigungen.",
    "notifications.blocked": "In den Browser-Einstellungen blockiert.",
    "notifications.hint": "Tipps und Erinnerungen zu deinen Orten",
    "notifications.active": "Aktiv — du bekommst Erinnerungen.",
    "notifications.denied": "Ohne Erlaubnis des Browsers nicht möglich.",
    "google.connected": "Zentral verbunden — suche oben zum Beispiel nach „Hotel Bamberg“",
    "google.notConfigured": "Noch nicht konfiguriert — der App-Administrator muss Google Places verbinden",
    "language.changed": "Sprache auf {{language}} geändert.",
  },
};

// Schon beim Laden setzen: Die Beispieldaten beim ersten Start sollen in der
// gespeicherten bzw. Standardsprache erscheinen.
let locale = TRANSLATIONS[readSetting("g04-language", "en")] ? readSetting("g04-language", "en") : "en";

function t(key, values = {}) {
  const text = TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return Object.entries(values).reduce((result, [name, value]) => result.replaceAll("{{" + name + "}}", String(value)), text);
}

// t() gibt bei fehlendem Schlüssel den Schlüssel selbst zurück. Dann lieber
// den Rohwert zeigen als „category.Foo“.
function categoryText(category) {
  const key = "category." + category;
  const text = t(key);
  return text === key ? category : text;
}

function categoryTagline(category) {
  const key = "tagline." + category;
  const text = t(key);
  return text === key ? "" : text;
}

function statusText(status) {
  return t("status." + (status || "wishlist"));
}

function placeCount(n) {
  return countLabel(n, t("place.singular"), t("place.plural"));
}

function savedCount(n) {
  return placeCount(n) + " " + t("saved.suffix");
}

function translateStatic() {
  document.documentElement.lang = locale;
  document.title = t("meta.title");
  const description = $('meta[name="description"]');
  if (description) description.setAttribute("content", t("meta.description"));
  $$('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  $$('[data-i18n-placeholder]').forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  $$('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  const language = $("#settings-language");
  if (language) language.value = locale;
  syncHeaderLanguage();
}

function syncHeaderLanguage() {
  $("#header-language")?.querySelectorAll("[data-locale]").forEach((button) => {
    const active = button.dataset.locale === locale;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

/* ------------------------------------------------------------------ Daten */

const CATEGORIES = [
  { name: "Restaurants", slug: "restaurants", tagline: "Gute Adressen für jeden Geschmack" },
  { name: "Hotels", slug: "hotels", tagline: "Schlafen & ankommen" },
  { name: "Events", slug: "events", tagline: "Termine, die du nicht verpassen willst" },
  { name: "Sport", slug: "sport", tagline: "Bewegung und frische Luft" },
  { name: "Museen", slug: "museums", tagline: "Kunst, Geschichte und Ideen" },
  { name: "Sehenswürdigkeiten", slug: "sights", tagline: "Orte, die bleiben" },
  { name: "Cafés", slug: "cafes", tagline: "Kurze Pausen, guter Kaffee" },
  { name: "Private", slug: "private", tagline: "Deine persönlichen Favoriten" },
];

const ICON_MARKUP = {
  Restaurants: '<path d="M3.5 18h17"/><path d="M5.5 18a6.5 6.5 0 0113 0"/><path d="M9 11.5a3 3 0 016 0v.5H9z" fill="currentColor" stroke="none"/><path d="M12 8.5V7"/>',
  Hotels: '<path d="M4 20V7l8-4 8 4v13"/><path d="M8 10h2v2H8zM14 10h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z"/><path d="M10 20v-4h4v4"/>',
  Events: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/><circle cx="8" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="14" r="1" fill="currentColor" stroke="none"/><path d="M8 17h8"/>',
  Sport: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v6M7 10l5 3 5-3M9 21l3-8 3 8"/><circle cx="19" cy="6" r="2"/><path d="M17.5 7.2l-2 2"/>',
  Museen: '<path d="M3.5 20h17M5 17h14M6.5 17V9L12 5l5.5 4v8"/><path d="M9 17v-5h2v5M13 12h2v5"/><path d="M5 9h14"/>',
  Sehenswürdigkeiten: '<path d="M4 20h16M6 17h12M7 17v-5l5-4 5 4v5"/><path d="M9.5 17v-3h5v3M12 8V4"/><circle cx="12" cy="3.5" r="1.2" fill="currentColor" stroke="none"/>',
  Cafés: '<path d="M5 9h10v5a5 5 0 01-10 0V9z"/><path d="M15 11h2a3 3 0 010 6h-2M4 20h14"/><path d="M8 6c-1-1 1-1 0-2M12 6c-1-1 1-1 0-2"/>',
  Private: '<path d="M12 20s-7-4.4-7-9.1A4.1 4.1 0 0112 8a4.1 4.1 0 017 2.9C19 15.6 12 20 12 20z"/>',
};

const TRIP_EMOJIS = ["🌴", "☀️", "🍷", "🏔️", "🏙️", "🎒", "🚲", "⛱️"];

// Beispieldaten für den ersten Start. Namen und Adressen sind Eigennamen,
// Öffnungszeiten, Notizen und Listennamen folgen der App-Sprache.
function seedPlaces() {
  const place = (id, name, category, address, open, rating, extra = {}) => ({
    id, name, category, address, open, rating,
    hours: t("seed." + id + ".hours") === "seed." + id + ".hours" ? "" : t("seed." + id + ".hours"),
    note: t("seed." + id + ".note") === "seed." + id + ".note" ? "" : t("seed." + id + ".note"),
    phone: "", website: "", ...extra,
  });
  return [
    place("p1", "Berggasthof Panorama", "Restaurants", "Panoramaweg 4, München", true, "4.8"),
    place("p2", "The Hoxton Berlin", "Hotels", "Charlottenburg, Berlin", true, "4.6"),
    place("p3", "Museum Barberini", "Museen", "Alter Markt, Potsdam", false, "4.7"),
    place("p4", "Kleine Freiheit", "Cafés", "Gärtnerplatz 2, München", true, "4.5"),
    place("p5", "Teufelsberg", "Sehenswürdigkeiten", "Teufelsseechaussee, Berlin", true, "4.8"),
  ];
}

function seedTrips() {
  return [
    { id: "t1", name: t("seed.t1"), emoji: "🥨", placeIds: ["p1", "p4"] },
    { id: "t2", name: t("seed.t2"), emoji: "🏙️", placeIds: ["p2", "p5"] },
    { id: "t3", name: t("seed.t3"), emoji: "🎨", placeIds: ["p3"] },
  ];
}

/* ----------------------------------------------------------------- Zustand */

let places = readStore("g04-places", seedPlaces);
let trips = readStore("g04-trips", seedTrips);
let activeCategory = null;
let activeTrip = null;
let currentView = "search";
let googleLoaderPromise = null;
let googleSearchTimer = null;
let googleSearchVersion = 0;
let googleAuthError = "";
const googleSearchResults = new Map();
// Die Place-Objekte selbst, damit Details erst bei Bedarf nachgeladen werden.
const googlePlaceObjects = new Map();
let searchMap = null;
let searchMarkers = [];
let currentLocation = null;
let currentLocationAccuracy = null;
let googleMapLibrariesPromise = null;
let nearbyMap = null;
let nearbyLocationMarker = null;
let nearbyAccuracyCircle = null;
let lastGoogleQuery = "";

/* ----------------------------------------------------------------- Speicher */

// fallback ist eine Funktion, damit Beispieldaten erst bei Bedarf entstehen.
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback();
  } catch {
    // Privater Modus oder beschädigte Daten: mit den Beispieldaten weitermachen.
    return fallback();
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    announce(t("storage.error"));
  }
}

const savePlaces = () => writeStore("g04-places", places);
const saveTrips = () => writeStore("g04-trips", trips);

function readSetting(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function writeSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Einstellung geht verloren, die App bleibt benutzbar. */
  }
}

/* ------------------------------------------------------------------ Helfer */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ENTITIES[char]);

const uid = (prefix) => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function iconFor(category) {
  const markup = ICON_MARKUP[category] || ICON_MARKUP["Sehenswürdigkeiten"];
  return (
    '<svg class="neo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    markup +
    '</svg>'
  );
}

/* ------------------------------------------------------------------ Bilder */

// Saubere Einzelmotive als WebP. Welches Bild erscheint, hängt am Ort, an der
// Kategorie bzw. an der Liste — nie an der Position in einer Liste.
const categorySlug = (category) => CATEGORIES.find((item) => item.name === category)?.slug || "sights";
const categoryArt = (category) => "images/category/" + categorySlug(category) + ".webp";

const SEED_PHOTOS = {
  p2: "images/places/riverside-hotel.webp",
  p3: "images/places/barberini.webp",
  p4: "images/places/kleine-freiheit.webp",
  p5: "images/places/teufelsberg.webp",
};

const TRIP_COVERS = {
  t1: "images/trips/munich.webp",
  t2: "images/trips/berlin.webp",
  t3: "images/trips/museum.webp",
};

function placePhoto(place) {
  return place.photoUrl || SEED_PHOTOS[place.id] || "";
}

// Eigene Listen übernehmen das Bild ihres ersten Ortes.
function tripCover(trip) {
  if (TRIP_COVERS[trip.id]) return TRIP_COVERS[trip.id];
  const first = places.find((place) => trip.placeIds.includes(place.id));
  if (!first) return categoryArt("Sehenswürdigkeiten");
  return placePhoto(first) || categoryArt(first.category);
}

// Für style="background-image:…": Zeichen, die den CSS-String brechen, kodieren.
function bgStyle(url) {
  const safe = String(url).replace(/["'()\\\s]/g, (char) => encodeURIComponent(char));
  return `style="background-image:url('${esc(safe)}')"`;
}

function announce(message) {
  const region = $("#live-region");
  if (region) region.textContent = message;
}

function countLabel(n, singular = t("place.singular"), plural = t("place.plural")) {
  return n + " " + (n === 1 ? singular : plural);
}

function distanceKm(place) {
  if (!currentLocation || !place.latitude || !place.longitude) return null;
  const toRad = (value) => (Number(value) * Math.PI) / 180;
  const dLat = toRad(Number(place.latitude) - currentLocation.lat);
  const dLng = toRad(Number(place.longitude) - currentLocation.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(currentLocation.lat)) *
      Math.cos(toRad(Number(place.latitude))) *
      Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function googleMapsDestination(place) {
  return place.latitude && place.longitude
    ? String(place.latitude) + "," + String(place.longitude)
    : [place.name, place.address].filter(Boolean).join(" ");
}

function googleMapsUrl(place, route = true) {
  const destination = encodeURIComponent(googleMapsDestination(place));
  const path = route ? "dir" : "search";
  const parameter = route ? "destination" : "query";
  return "https://www.google.com/maps/" + path + "/?api=1&" + parameter + "=" + destination;
}

/* --------------------------------------------------------------- Rendering */

function render() {
  renderCategories();
  renderTrips();
  renderSavedView();
  renderHomeInsights();
}

function renderCategories() {
  const grid = $("#trips-category-grid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map((category) => {
    const count = places.filter((place) => place.category === category.name).length;
    const label = categoryText(category.name);
    const size = label.length > 13 ? "wide" : "";
    return `<article class="category-card ${category.slug} ${size}" data-category="${esc(category.name)}"
      role="button" tabindex="0" aria-label="${esc(t("category.aria", { category: label, count: savedCount(count) }))}">
      <span class="card-icon real-tile-icon" aria-hidden="true"></span>
      <h3>${esc(label)}</h3>
      <p>${esc(categoryTagline(category.name))}</p>
      <span class="count">${esc(savedCount(count))}</span>
    </article>`;
  }).join("");
}

function renderPlaces(list, target, emptyText) {
  const grid = $(target);
  grid.innerHTML = list.length
    ? list
        .map(
          (place) => {
            const distance = distanceKm(place);
            const photo = placePhoto(place);
            return `<article class="place-card saved-place-card ${photo ? "has-photo" : ""}" data-place="${esc(place.id)}"
              role="button" tabindex="0" aria-label="${esc(place.name)}, ${esc(place.address)}">
              <div class="saved-place-visual">
                ${photo ? `<img class="place-card-photo" src="${esc(photo)}" alt="" loading="lazy" />` : `<span class="saved-place-art" ${bgStyle(categoryArt(place.category))} aria-hidden="true"></span>`}
                <span class="saved-place-gradient" aria-hidden="true"></span>
                <span class="saved-place-favorite" aria-label="${place.favorite ? t("favorite.yes") : t("favorite.no")}">${place.favorite ? "♥" : "♡"}</span>
                <span class="saved-place-more" aria-hidden="true">•••</span>
              </div>
              <div class="place-card-body saved-place-body">
                <div class="saved-place-title-line">
                  <span class="saved-place-icon">${iconFor(place.category)}</span>
                  <h3>${esc(place.name)}</h3>
                </div>
                <p class="saved-place-address">${esc(place.address)}</p>
                <div class="saved-place-facts">
                  ${place.rating ? `<span class="saved-place-rating">★ ${esc(place.rating)}</span>` : ""}
                  <span class="saved-place-status"><span aria-hidden="true">⌖</span> ${esc(statusText(place.visitStatus))}</span>
                  ${distance !== null ? `<span class="saved-place-distance">${esc(t("search.distance", { distance: distance.toFixed(1) }))}</span>` : ""}
                </div>
              </div>
            </article>`;
          },
        )
        .join("")
    : `<div class="empty">${esc(emptyText)}</div>`;
}

function renderTrips() {
  const grid = $("#trips-page-grid");
  const tripPlaces = trips.flatMap((trip) => trip.placeIds.map((id) => places.find((place) => place.id === id))).filter(Boolean);
  const uniquePlaces = [...new Map(tripPlaces.map((place) => [place.id, place])).values()];
  const cities = new Set(
    uniquePlaces
      .map((place) => String(place.address || "").split(",").pop().trim())
      .filter(Boolean),
  );
  const stats = $("#trip-stats");
  if (stats) {
    stats.innerHTML = `
      <div class="trip-stat">
        <span class="trip-stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12v16H6zM9 2v4M15 2v4M9 9h6M9 13h6M9 17h4"/></svg></span>
        <strong>${trips.length}</strong><span>${esc(t("trips.statsLists"))}</span>
      </div>
      <div class="trip-stat">
        <span class="trip-stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5zM8 8h8M8 12h8M8 16h5"/></svg></span>
        <strong>${uniquePlaces.length}</strong><span>${esc(t("trips.statsPlaces"))}</span>
      </div>
      <div class="trip-stat">
        <span class="trip-stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 20V9h6v11M14 20V4h6v16M3 20h18M7 12h0M7 16h0M17 8h0M17 12h0M17 16h0"/></svg></span>
        <strong>${cities.size}</strong><span>${esc(t("trips.statsCities"))}</span>
      </div>`;
  }

  grid.innerHTML = trips.length
    ? trips
        .map((trip) => {
          const tripPlaces = trip.placeIds.map((id) => places.find((place) => place.id === id)).filter(Boolean);
          const count = tripPlaces.length;
          const planned = tripPlaces.filter((place) => place.visitStatus === "planned" || place.visitStatus === "visited").length;
          const progress = count ? Math.round((planned / count) * 100) : 0;
          const thumbnails = tripPlaces
            .slice(0, 2)
            .map((place) => {
              const slug = CATEGORIES.find((category) => category.name === place.category)?.slug || "sights";
              return `<span class="trip-thumb ${esc(slug)}" aria-hidden="true"></span>`;
            })
            .join("");
          const meta = count ? placeCount(count) : placeCount(0);
          return `<article class="trip-card" data-trip="${esc(trip.id)}" role="button" tabindex="0"
            aria-label="${esc(t("trip.aria", { name: trip.name, count: meta }))}">
            <span class="trip-card-art" ${bgStyle(tripCover(trip))} aria-hidden="true"></span>
            <span class="trip-card-shade" aria-hidden="true"></span>
            <div class="trip-card-content">
              <div class="trip-title-row">
                <span class="trip-badge" aria-hidden="true">${esc(trip.emoji)}</span>
                <h3>${esc(trip.name)}</h3>
              </div>
              <p class="trip-meta"><span class="trip-meta-pin" aria-hidden="true">⌖</span> ${esc(placeCount(count))} <span aria-hidden="true">·</span> ${esc(t("trips.onlyDevice"))}</p>
              <p class="trip-progress-label">${esc(t("trips.planned", { done: planned, total: count }))}</p>
              <div class="trip-progress" aria-hidden="true"><span style="width:${progress}%"></span></div>
              <div class="trip-thumbnails">${thumbnails}</div>
            </div>
            <span class="trip-more" aria-hidden="true">•••</span>
            <span class="trip-open" aria-hidden="true">↗</span>
          </article>`;
        })
        .join("")
    : `<div class="empty">${esc(t("empty.trips"))}</div>`;
}

function renderInsightList(target, list, emptyText) {
  const node = $(target);
  if (!node) return;
    node.innerHTML = list.length
    ? list
        .slice(0, 3)
        .map(
          (place) => `<button class="insight-place" type="button" data-place="${esc(place.id)}">
            <span class="insight-photo" ${bgStyle(placePhoto(place) || categoryArt(place.category))} aria-hidden="true"></span>
            <span class="insight-icon">${iconFor(place.category)}</span>
            <span><strong>${esc(place.name)}</strong><small>${esc(place.address)}</small></span>
          </button>`,
        )
        .join("")
    : `<p class="insight-empty">${esc(emptyText)}</p>`;
}

function renderHomeInsights() {
  const recent = [...places].sort((a, b) => String(b.createdAt || b.id).localeCompare(String(a.createdAt || a.id)));
  renderInsightList("#recent-places", recent, t("empty.recent"));
  renderInsightList("#favorite-places", places.filter((place) => place.favorite), t("empty.favorites"));
  const nearby = places
    .map((place) => ({ place, distance: distanceKm(place) }))
    .filter((entry) => entry.distance !== null)
    .sort((a, b) => a.distance - b.distance)
    .map((entry) => entry.place);
  // Ohne Standortfreigabe bleibt die Explore-Ansicht trotzdem mit den
  // gespeicherten Beispielkarten gefüllt; nach der Freigabe übernimmt die
  // echte Entfernungssortierung.
  renderInsightList("#nearby-places", nearby.length ? nearby : places.slice(0, 3), t("empty.nearby"));
}

function renderSavedView() {
  const clearButton = $("#clear-filter");
  const savedSearch = $("#saved-search");
  let list = places;
  let empty = t("empty.places");

  const stats = $("#saved-stats");
  if (stats) {
    stats.innerHTML = `
      <div class="saved-stat saved-stat-saved"><span class="saved-stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2"/></svg></span><strong>${places.length}</strong><span>${esc(t("saved.statsSaved"))}</span></div>
      <div class="saved-stat saved-stat-favorites"><span class="saved-stat-icon" aria-hidden="true">♥</span><strong>${places.filter((place) => place.favorite).length}</strong><span>${esc(t("saved.statsFavorites"))}</span></div>
      <div class="saved-stat saved-stat-wishlist"><span class="saved-stat-icon" aria-hidden="true">★</span><strong>${places.filter((place) => !place.visitStatus || place.visitStatus === "wishlist").length}</strong><span>${esc(t("saved.statsWishlist"))}</span></div>`;
  }

  if (activeCategory) {
    list = places.filter((place) => place.category === activeCategory);
    empty = t("empty.category");
  } else if (activeTrip) {
    const trip = trips.find((t) => t.id === activeTrip);
    list = trip ? places.filter((place) => trip.placeIds.includes(place.id)) : [];
    empty = t("empty.trip");
  }

  const categoryFilter = $("#filter-category")?.value || "";
  const statusFilter = $("#filter-status")?.value || "";
  const favoritesOnly = $("#filter-favorites")?.checked || false;
  const sort = $("#sort-places")?.value || "recent";
  const query = savedSearch?.value.trim().toLowerCase() || "";
  if (query) {
    list = list.filter((place) =>
      [place.name, place.address, place.category].filter(Boolean).join(" ").toLowerCase().includes(query),
    );
  }
  if (categoryFilter) list = list.filter((place) => place.category === categoryFilter);
  if (statusFilter) list = list.filter((place) => (place.visitStatus || "wishlist") === statusFilter);
  if (favoritesOnly) list = list.filter((place) => place.favorite);
  list = [...list].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, locale);
    if (sort === "ownRating") return Number(b.ownRating || 0) - Number(a.ownRating || 0);
    if (sort === "googleRating") return Number(b.rating || 0) - Number(a.rating || 0);
    if (sort === "distance") return (distanceKm(a) ?? Infinity) - (distanceKm(b) ?? Infinity);
    return String(b.createdAt || b.id).localeCompare(String(a.createdAt || a.id));
  });

  clearButton.classList.toggle("hidden", !activeCategory && !activeTrip);
  renderPlaces(list, "#saved-grid", empty);
}

/* ------------------------------------------------------------------ Ansicht */

function showView(view, { category = null, trip = null } = {}) {
  currentView = view;
  activeCategory = category;
  activeTrip = trip;

  $$(".view-panel").forEach((panel) => panel.classList.add("hidden"));
  $("#" + view + "-view").classList.remove("hidden");

  $$(".nav-item, .bottom-nav button").forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });

  if (view === "saved") renderSavedView();
  if (view === "trips") renderTrips();
  if (view === "search") window.setTimeout(() => renderNearbyMap(), 0);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* -------------------------------------------------------------------- Modal */

let lastFocused = null;

function openModal(html, label) {
  lastFocused = document.activeElement;
  const root = $("#modal-root");
  root.className = "modal-backdrop";
  root.innerHTML = html;

  const dialog = $(".modal", root);
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", label);

  root.addEventListener("mousedown", onBackdropDown);
  document.addEventListener("keydown", onModalKeydown);

  const first = $("[autofocus]", dialog) || $(".close", dialog);
  if (first) first.focus();
}

function closeModal() {
  const root = $("#modal-root");
  if (!root.firstChild) return;
  root.removeEventListener("mousedown", onBackdropDown);
  document.removeEventListener("keydown", onModalKeydown);
  root.innerHTML = "";
  root.className = "";
  if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  lastFocused = null;
  const handler = onModalClosed;
  onModalClosed = null;
  if (handler) handler();
}

// Optionaler Rückruf, der bei jedem Schließen läuft — auch bei Escape oder
// Klick auf den Hintergrund.
let onModalClosed = null;

// Hinweis vor der Standortabfrage im Stil der App statt confirm().
function askLocationConsent() {
  return new Promise((resolve) => {
    let allowed = false;
    openModal(
      `<div class="modal form-modal location-modal">
        <button class="close" type="button" aria-label="${esc(t("form.close"))}">×</button>
        <h2>${esc(t("location.title"))}</h2>
        <p class="location-text">${esc(t("search.locationDisclosure"))}</p>
        <div class="actions">
          <button class="secondary" type="button" data-cancel>${esc(t("form.cancel"))}</button>
          <button class="primary" type="button" data-allow autofocus>${esc(t("location.allow"))}</button>
        </div>
      </div>`,
      t("location.title"),
    );
    onModalClosed = () => resolve(allowed);
    const root = $("#modal-root");
    $(".close", root).onclick = closeModal;
    $("[data-cancel]", root).onclick = closeModal;
    $("[data-allow]", root).onclick = () => {
      allowed = true;
      closeModal();
    };
  });
}

function onBackdropDown(event) {
  if (event.target === event.currentTarget) closeModal();
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex="0"]';

function onModalKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key !== "Tab") return;

  const items = $$(FOCUSABLE, $("#modal-root")).filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ----------------------------------------------------------- Ort: Detailbild */

function showDetail(id) {
  const place = places.find((item) => item.id === id);
  if (!place) return;

  const memberships = trips.filter((trip) => trip.placeIds.includes(place.id));
  const mapsUrl = googleMapsUrl(place);

  openModal(
    `<div class="modal detail-modal">
      <button class="close" type="button" aria-label="${t("detail.close")}">×</button>
      <div class="detail-hero" aria-hidden="true">${
        placePhoto(place) ? `<img src="${esc(placePhoto(place))}" alt="" />` : iconFor(place.category)
      }</div>
      <span class="status ${place.open ? "" : "closed"}">${esc(place.open ? t("status.open") : t("status.closed"))}</span>
      <h2>${esc(place.name)}</h2>
      <p class="address">${esc(place.address)}</p>
      ${
        place.rating
          ? `<div class="rating">★ ${esc(place.rating)} ${
              place.userRatingCount ? `(${esc(place.userRatingCount)} ${esc(t("detail.reviews"))})` : ""
            } <span>· ${esc(categoryText(place.category))}</span></div>`
          : ""
      }
      <div class="detail-info">
        <div><small>${esc(t("detail.opening"))}</small><strong>${esc(hoursToday(place)) || "—"}</strong></div>
        <div><small>${esc(t("detail.status"))}</small><strong>${esc(statusText(place.visitStatus))}</strong></div>
        <div><small>${esc(t("detail.ownRating"))}</small><strong>${place.ownRating ? "★ " + esc(place.ownRating) : "—"}</strong></div>
        <div><small>${esc(t("detail.price"))}</small><strong>${esc(String(place.priceLevel || "—").replaceAll("PRICE_LEVEL_", ""))}</strong></div>
      </div>
      ${
        memberships.length
          ? `<p class="membership">${esc(t("detail.lists", { count: memberships.length }))}
             ${memberships.map((trip) => esc(trip.emoji + " " + trip.name)).join(", ")}</p>`
          : ""
      }
      <label for="note">${esc(t("detail.notes"))}</label>
      <textarea id="note" rows="3">${esc(place.note)}</textarea>
      <div class="actions">
        <button class="secondary edit" type="button">${esc(t("detail.edit"))}</button>
        <button class="secondary share" type="button">${esc(t("detail.share"))}</button>
        <button class="primary route" type="button">${esc(t("detail.route"))}</button>
      </div>
      <div class="quick-actions">
        ${place.phone ? `<a class="quick-link" href="tel:${esc(place.phone)}">${esc(t("detail.call"))}</a>` : ""}
        ${
          place.website
            ? `<a class="quick-link" href="${esc(place.website)}" target="_blank" rel="noopener noreferrer">${esc(t("detail.website"))}</a>`
            : ""
        }
        <button class="delete" type="button">${esc(t("detail.delete"))}</button>
      </div>
    </div>`,
    t("detail.dialog", { name: place.name }),
  );

  const root = $("#modal-root");
  const noteField = $("#note", root);

  $(".close", root).onclick = closeModal;

  // Notiz automatisch sichern, sobald das Feld verlassen wird.
  noteField.onblur = () => {
    if (noteField.value === place.note) return;
    place.note = noteField.value;
    savePlaces();
    announce(t("detail.noteSaved"));
  };

  $(".route", root).onclick = () => {
    noteField.blur();
    // Navigation in the same user gesture ist auf iPhone/iPad zuverlässiger
    // als window.open und öffnet bei installiertem Google Maps die App.
    window.location.assign(mapsUrl);
  };

  $(".share", root).onclick = async () => {
    const shareData = { title: place.name, text: place.name + " — " + place.address, url: googleMapsUrl(place, false) };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard?.writeText(shareData.text + " / " + shareData.url);
        announce(t("detail.linkCopied"));
      }
    } catch {
      /* Teilen wurde abgebrochen. */
    }
  };

  $(".edit", root).onclick = () => {
    place.note = noteField.value;
    savePlaces();
    showPlaceForm(place);
  };

  $(".delete", root).onclick = () => {
    if (!confirm(t("detail.confirmDelete", { name: place.name }))) return;
    places = places.filter((item) => item.id !== id);
    trips.forEach((trip) => {
      trip.placeIds = trip.placeIds.filter((pid) => pid !== id);
    });
    savePlaces();
    saveTrips();
    closeModal();
    render();
    announce(t("detail.deleted", { name: place.name }));
  };
}

/* ------------------------------------------------------------ Ort: Formular */

function showPlaceForm(existing, forceNew = false) {
  const place = existing || {
    id: "",
    name: "",
    category: CATEGORIES[0].name,
    address: "",
    open: true,
    rating: "",
    hours: "",
    note: "",
    phone: "",
    website: "",
    ownRating: "",
    visitDate: "",
    visitStatus: "wishlist",
    favorite: false,
  };
  const isNew = !existing || forceNew;

  openModal(
    `<div class="modal form-modal">
      <button class="close" type="button" aria-label="${esc(t("form.close"))}">×</button>
      <h2>${isNew ? esc(t("form.saveTitle")) : esc(t("form.editTitle"))}</h2>
      <form id="place-form" novalidate>
        <div class="field">
          <label for="f-name">${esc(t("form.name"))}</label>
          <input id="f-name" name="name" type="text" required autofocus value="${esc(place.name)}" />
        </div>
        <div class="field">
          <label for="f-address">${esc(t("form.address"))}</label>
          <input id="f-address" name="address" type="text" value="${esc(place.address)}" />
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-category">${esc(t("form.category"))}</label>
            <select id="f-category" name="category">
              ${CATEGORIES.map(
                (category) =>
                  `<option value="${esc(category.name)}" ${category.name === place.category ? "selected" : ""}>${esc(
                    categoryText(category.name),
                  )}</option>`,
              ).join("")}
            </select>
          </div>
          <div class="field">
            <label for="f-rating">${esc(t("form.rating"))}</label>
            <input id="f-rating" name="rating" type="number" min="0" max="5" step="0.1"
              placeholder="4.5" value="${esc(place.rating)}" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-own-rating">${esc(t("form.ownRating"))}</label>
            <input id="f-own-rating" name="ownRating" type="number" min="0" max="5" step="0.5"
              placeholder="5" value="${esc(place.ownRating)}" />
          </div>
          <div class="field">
            <label for="f-visit-date">${esc(t("form.visitDate"))}</label>
            <input id="f-visit-date" name="visitDate" type="date" value="${esc(place.visitDate)}" />
          </div>
        </div>
        <div class="field">
          <label for="f-visit-status">${esc(t("form.visitStatus"))}</label>
          <select id="f-visit-status" name="visitStatus">
            <option value="wishlist" ${place.visitStatus === "wishlist" || !place.visitStatus ? "selected" : ""}>${esc(t("status.wishlist"))}</option>
            <option value="planned" ${place.visitStatus === "planned" ? "selected" : ""}>${esc(t("status.planned"))}</option>
            <option value="visited" ${place.visitStatus === "visited" ? "selected" : ""}>${esc(t("status.visited"))}</option>
          </select>
        </div>
        <div class="field">
          <label for="f-hours">${esc(t("form.hours"))}</label>
          <input id="f-hours" name="hours" type="text" placeholder="${esc(t("form.hoursPlaceholder"))}" value="${esc(place.hours)}" />
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-phone">${esc(t("form.phone"))}</label>
            <input id="f-phone" name="phone" type="tel" value="${esc(place.phone)}" />
          </div>
          <div class="field">
            <label for="f-website">${esc(t("form.website"))}</label>
            <input id="f-website" name="website" type="url" placeholder="https://" value="${esc(place.website)}" />
          </div>
        </div>
        <div class="field">
          <label for="f-note">${esc(t("form.note"))}</label>
          <textarea id="f-note" name="note" rows="3">${esc(place.note)}</textarea>
        </div>
        <label class="check-row">
          <input id="f-open" name="open" type="checkbox" ${place.open ? "checked" : ""} />
          <span>${esc(t("form.open"))}</span>
        </label>
        <label class="check-row">
          <input id="f-favorite" name="favorite" type="checkbox" ${place.favorite ? "checked" : ""} />
          <span>${esc(t("form.favorite"))}</span>
        </label>
        <p class="form-error hidden" id="form-error" role="alert"></p>
        <div class="actions">
          <button class="secondary" type="button" data-cancel>${esc(t("form.cancel"))}</button>
          <button class="primary" type="submit">${esc(isNew ? t("form.save") : t("form.saveChanges"))}</button>
        </div>
      </form>
    </div>`,
    isNew ? t("form.dialogNew") : t("form.dialogEdit"),
  );

  const root = $("#modal-root");
  $(".close", root).onclick = closeModal;
  $("[data-cancel]", root).onclick = closeModal;

  $("#place-form", root).onsubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const name = data.name.trim();
    const error = $("#form-error", root);

    if (!name) {
      error.textContent = t("form.requiredName");
      error.classList.remove("hidden");
      $("#f-name", root).focus();
      return;
    }

    const record = {
      id: place.id || uid("p_"),
      placeId: place.placeId || "",
      name,
      category: data.category,
      address: data.address.trim(),
      latitude: place.latitude || "",
      longitude: place.longitude || "",
      rating: data.rating.trim(),
      hours: data.hours.trim(),
      // Komplette Woche behalten, damit später der jeweils heutige Tag angezeigt wird.
      openingHours: data.hours.trim() === (place.hours || "") ? place.openingHours || [] : [],
      phone: data.phone.trim(),
      website: data.website.trim(),
      mapsUrl: place.mapsUrl || "",
      note: data.note,
      open: $("#f-open", root).checked,
      ownRating: data.ownRating.trim(),
      visitDate: data.visitDate,
      visitStatus: data.visitStatus,
      favorite: $("#f-favorite", root).checked,
      createdAt: place.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photoUrl: place.photoUrl || "",
      userRatingCount: place.userRatingCount || 0,
      priceLevel: place.priceLevel || "",
    };

    if (isNew) {
      const duplicate = record.placeId && places.find((item) => item.placeId === record.placeId);
      if (duplicate) {
        closeModal();
        showDetail(duplicate.id);
        announce(t("form.duplicate", { name }));
        return;
      }
      places.push(record);
    }
    else places = places.map((item) => (item.id === record.id ? record : item));

    savePlaces();
    closeModal();
    render();
    announce(isNew ? t("form.saved", { name }) : t("form.updated", { name }));
  };
}

/* ---------------------------------------------------------- Reise-Listen */

function showTripModal(id) {
  const trip = trips.find((item) => item.id === id);
  if (!trip) return;

  const selectedCount = trip.placeIds.filter((placeId) => places.some((place) => place.id === placeId)).length;

  openModal(
    `<div class="modal form-modal trip-editor-modal">
      <button class="close" type="button" aria-label="${esc(t("form.close"))}">×</button>
      <div class="trip-editor-heading">
        <span class="trip-editor-symbol" id="trip-editor-symbol" aria-hidden="true">${esc(trip.emoji)}</span>
        <div>
          <h2 id="trip-editor-title">${esc(trip.name)}</h2>
          <p>${esc(t("trip.editSubtitle"))}</p>
        </div>
      </div>
      <div class="trip-editor-cover" aria-hidden="true">
        <span class="trip-editor-cover-art" ${bgStyle(tripCover(trip))}></span>
        <span class="trip-editor-cover-shade"></span>
        <span class="trip-editor-selected"><span>⌖</span><span id="trip-selected-count">${esc(t("trip.selected", { count: selectedCount }))}</span></span>
      </div>
      <div class="field trip-editor-field">
        <div class="trip-editor-label-row"><label for="t-name">${esc(t("trip.name"))}</label><span id="trip-name-count">${trip.name.length} / 40</span></div>
        <input id="t-name" type="text" maxlength="40" autofocus value="${esc(trip.name)}" />
      </div>
      <div class="field trip-editor-field">
        <span class="field-label">${esc(t("trip.symbol"))}</span>
        <div class="emoji-row trip-symbol-picker" role="group" aria-label="${esc(t("trip.chooseSymbol"))}">
          ${TRIP_EMOJIS.map(
            (emoji) =>
              `<button type="button" class="emoji-btn ${emoji === trip.emoji ? "selected" : ""}"
                data-emoji="${esc(emoji)}" aria-pressed="${emoji === trip.emoji}">${esc(emoji)}</button>`,
          ).join("")}
        </div>
      </div>
      <div class="field trip-editor-field trip-editor-places-field">
        <div class="trip-editor-label-row"><span class="field-label">${esc(t("trip.places"))}</span><span id="trip-places-count">${esc(t("trip.placesSelected", { selected: selectedCount, total: places.length }))}</span><span class="trip-editor-search" aria-hidden="true">⌕</span></div>
        <div class="chip-list trip-place-grid">
          ${
            places.length
              ? places
                  .map(
                    (place) => {
                      const checked = trip.placeIds.includes(place.id);
                      const photo = placePhoto(place);
                      return `<label class="chip trip-place-option ${checked ? "selected" : ""}">
                      ${photo ? `<img class="trip-place-photo" src="${esc(photo)}" alt="" loading="lazy" />` : `<span class="trip-place-photo trip-place-art" ${bgStyle(categoryArt(place.category))} aria-hidden="true"></span>`}
                      <span class="trip-place-copy"><strong>${esc(place.name)}</strong><small><span class="trip-place-category-icon">${iconFor(place.category)}</span>${esc(categoryText(place.category))}</small></span>
                      <span class="trip-place-check"><input type="checkbox" data-place-id="${esc(place.id)}" ${checked ? "checked" : ""} /><span aria-hidden="true">✓</span></span>
                    </label>`;
                    },
                  )
                  .join("")
              : `<p class="muted-note">${esc(t("trip.noPlaces"))}</p>`
          }
        </div>
      </div>
      <div class="trip-editor-note"><span aria-hidden="true">ⓘ</span>${esc(t("trip.localNote"))}</div>
      <div class="actions trip-editor-actions">
        <button class="danger" type="button" data-delete><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg></span>${esc(t("trip.delete"))}</button>
        <button class="primary" type="button" data-save><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6"/></svg></span>${esc(t("trip.save"))}</button>
      </div>
    </div>`,
    t("trip.dialog", { name: trip.name }),
  );

  const root = $("#modal-root");
  let chosenEmoji = trip.emoji;

  $(".close", root).onclick = closeModal;

  const syncTripEditor = () => {
    const selected = $$('[data-place-id]', root).filter((box) => box.checked).length;
    $("#trip-selected-count", root).textContent = t("trip.selected", { count: selected });
    $("#trip-places-count", root).textContent = t("trip.placesSelected", { selected, total: places.length });
    $$(".trip-place-option", root).forEach((option) => {
      option.classList.toggle("selected", $("[data-place-id]", option)?.checked);
    });
  };

  $$(".emoji-btn", root).forEach((button) => {
    button.onclick = () => {
      chosenEmoji = button.dataset.emoji;
      $("#trip-editor-symbol", root).textContent = chosenEmoji;
      $$(".emoji-btn", root).forEach((other) => {
        const selected = other === button;
        other.classList.toggle("selected", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
    };
  });

  $("#t-name", root).oninput = (event) => {
    $("#trip-editor-title", root).textContent = event.target.value || t("trip.newName");
    $("#trip-name-count", root).textContent = `${event.target.value.length} / 40`;
  };
  $$('[data-place-id]', root).forEach((checkbox) => {
    checkbox.onchange = syncTripEditor;
  });
  syncTripEditor();

  $("[data-save]", root).onclick = () => {
    const name = $("#t-name", root).value.trim();
    trip.name = name || trip.name;
    trip.emoji = chosenEmoji;
    trip.placeIds = $$("[data-place-id]", root)
      .filter((box) => box.checked)
      .map((box) => box.dataset.placeId);
    saveTrips();
    closeModal();
    renderTrips();
    if (activeTrip === trip.id) renderSavedView();
    announce(t("trip.saved", { name: trip.name }));
  };

  $("[data-delete]", root).onclick = () => {
    if (!confirm(t("trip.confirmDelete", { name: trip.name }))) return;
    trips = trips.filter((item) => item.id !== id);
    saveTrips();
    closeModal();
    if (activeTrip === id) showView("trips");
    else renderTrips();
    announce(t("trip.deleted"));
  };
}

function createTrip() {
  const trip = { id: uid("t_"), name: t("trip.newName"), emoji: TRIP_EMOJIS[0], placeIds: [] };
  trips.push(trip);
  saveTrips();
  renderTrips();
  showTripModal(trip.id);
}

/* -------------------------------------------------------------------- Suche */

function inferCategory(types = [], query = "") {
  const values = new Set(types);
  const text = query.toLowerCase();
  if (values.has("hotel") || values.has("lodging") || /hotel|unterkunft|pension|accommodation/.test(text)) return "Hotels";
  if (values.has("restaurant") || values.has("meal_takeaway") || /restaurant|essen|food|dining/.test(text)) {
    return "Restaurants";
  }
  if (values.has("cafe") || /café|cafe|kaffee|coffee/.test(text)) return "Cafés";
  if (values.has("museum") || values.has("art_gallery") || /museum|galerie|gallery/.test(text)) return "Museen";
  if (values.has("gym") || values.has("stadium") || values.has("sports_complex") || /sport|fitness|gym/.test(text)) {
    return "Sport";
  }
  if (values.has("event_venue") || /event|veranstaltung|konzert|concert/.test(text)) return "Events";
  return "Sehenswürdigkeiten";
}

function googlePlacesKey() {
  const globalKey = window.G04_CONFIG?.googleMapsKey;
  return typeof globalKey === "string" ? globalKey.trim() : "";
}

function googlePlacesError(error) {
  const details = [googleAuthError, error?.message, error?.status, error?.code].filter(Boolean).join(" ").toLowerCase();
  if (/referer|referrer|url.*allow|allowed.*url|origin/.test(details)) {
    return t("search.googleDenied");
  }
  if (/billing|rechnung|abrechnung/.test(details)) {
    return t("search.googleBilling");
  }
  if (/notactivated|not activated|targetblocked|target blocked|permission_denied|request_denied/.test(details)) {
    return t("search.googleApis");
  }
  if (/quota|overquota|limit/.test(details)) {
    return t("search.googleQuota");
  }
  if (/invalidkey|expiredkey|auth|credential|key/.test(details)) {
    return t("search.googleKey");
  }
  return t("search.googleUnavailable");
}

function loadGooglePlaces() {
  const key = googlePlacesKey();
  if (!key) return Promise.reject(new Error("missing-key"));
  if (googleAuthError) return Promise.reject(new Error("auth-failure"));
  if (window.google?.maps?.importLibrary) return window.google.maps.importLibrary("places");
  if (googleLoaderPromise) return googleLoaderPromise;

  googleLoaderPromise = new Promise((resolve, reject) => {
    const callback = "__g04GooglePlacesReady";
    googleAuthError = "";
    window.gm_authFailure = () => {
      googleAuthError = "auth-failure";
    };
    const timeout = window.setTimeout(() => reject(new Error("Google Places antwortet nicht.")), 15000);
    window[callback] = async () => {
      window.clearTimeout(timeout);
      try {
        resolve(await window.google.maps.importLibrary("places"));
      } catch (error) {
        reject(error);
      } finally {
        delete window[callback];
      }
    };
    const script = document.createElement("script");
    script.id = "g04-google-maps-api";
    script.async = true;
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      encodeURIComponent(key) +
      "&loading=async&libraries=places&v=weekly&language=" +
      encodeURIComponent(locale) +
      "&region=" +
      searchRegion() +
      "&callback=" +
      callback;
    script.onerror = () => {
      window.clearTimeout(timeout);
      googleLoaderPromise = null;
      reject(new Error("Google Places konnte nicht geladen werden."));
    };
    document.head.appendChild(script);
  });
  return googleLoaderPromise;
}

async function loadGoogleMapLibraries() {
  if (googleMapLibrariesPromise) return googleMapLibrariesPromise;
  googleMapLibrariesPromise = loadGooglePlaces()
    .then(async () => {
      const [{ Map, Circle }, { AdvancedMarkerElement }] = await Promise.all([
        window.google.maps.importLibrary("maps"),
        window.google.maps.importLibrary("marker"),
      ]);
      return { Map, Circle, AdvancedMarkerElement };
    })
    .catch((error) => {
      googleMapLibrariesPromise = null;
      throw error;
    });
  return googleMapLibrariesPromise;
}

async function renderNearbyMap() {
  const container = $("#search-nearby-map");
  if (!container || $("#search-view")?.classList.contains("hidden")) return;
  container.setAttribute("aria-busy", "true");

  if (!googlePlacesKey()) {
    container.classList.remove("is-live");
    container.innerHTML = `<div class="map-unavailable">${t("search.googleMissing")}</div>`;
    container.setAttribute("aria-busy", "false");
    return;
  }

  try {
    const { Map, Circle, AdvancedMarkerElement } = await loadGoogleMapLibraries();
    const fallbackCenter = { lat: 51.1657, lng: 10.4515 };
    const center = currentLocation || fallbackCenter;
    const zoom = currentLocation ? 14 : 6;
    const mapId = window.G04_CONFIG?.googleMapId || "DEMO_MAP_ID";

    container.classList.add("is-live");
    if (!nearbyMap) {
      container.innerHTML = "";
      nearbyMap = new Map(container, {
        center,
        zoom,
        mapId,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
      });
    } else {
      nearbyMap.setCenter(center);
      nearbyMap.setZoom(zoom);
    }

    if (nearbyLocationMarker) nearbyLocationMarker.map = null;
    nearbyLocationMarker = new AdvancedMarkerElement({
      map: nearbyMap,
      position: center,
      title: t("search.mapLabel"),
    });

    if (nearbyAccuracyCircle) nearbyAccuracyCircle.setMap(null);
    nearbyAccuracyCircle = null;
    if (currentLocation && Number.isFinite(currentLocationAccuracy) && Circle) {
      nearbyAccuracyCircle = new Circle({
        map: nearbyMap,
        center,
        radius: currentLocationAccuracy,
        fillColor: "#2167e8",
        fillOpacity: 0.14,
        strokeColor: "#6da4ff",
        strokeOpacity: 0.55,
        strokeWeight: 1,
      });
    }
  } catch (error) {
    container.classList.remove("is-live");
    container.innerHTML = `<div class="map-unavailable">${googlePlacesError(error)}</div>`;
  } finally {
    container.setAttribute("aria-busy", "false");
  }
}

async function requestCurrentLocation({ search = true } = {}) {
  if (!navigator.geolocation) {
    announce(t("search.noLocation"));
    return;
  }
  if (!(await askLocationConsent())) return;
  announce(t("search.locationRequest"));
  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      currentLocationAccuracy = Number.isFinite(position.coords.accuracy) ? position.coords.accuracy : null;
      renderNearbyMap();
      if (search) {
        const query = $("#search").value.trim() || lastGoogleQuery || t("search.nearbyQuery");
        const localHits = places.filter((place) =>
          (place.name + " " + place.address + " " + place.category).toLowerCase().includes(query.toLowerCase()),
        );
        const version = ++googleSearchVersion;
        searchGooglePlaces(query, localHits, version);
      }
      announce(t("search.locationUsed"));
    },
    () => {
      renderNearbyMap();
      announce(t("search.locationDenied"));
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
  );
}

// Die Suchregion richtet sich nach dem Gerät, nicht nach der UI-Sprache:
// Wer in Deutschland die englische Oberfläche nutzt, soll keine US-Treffer bekommen.
function searchRegion() {
  const tag = (navigator.languages?.find((lang) => lang.includes("-")) || navigator.language || "").split("-")[1];
  return tag && /^[a-z]{2}$/i.test(tag) ? tag.toUpperCase() : "DE";
}

// Heutige Zeile aus den gespeicherten Öffnungszeiten (Google liefert Montag zuerst).
function hoursToday(place) {
  const lines = Array.isArray(place.openingHours) ? place.openingHours : [];
  if (lines.length === 7) return lines[(new Date().getDay() + 6) % 7];
  return place.hours || "";
}

// Trefferliste bewusst schlank: nur Felder der Preisstufe „Pro“. Bewertung,
// Öffnungszeiten, Telefon, Website und Foto kosten mehr und werden erst geladen,
// wenn jemand einen Treffer öffnet.
const LIST_FIELDS = ["id", "displayName", "formattedAddress", "location", "types", "businessStatus", "googleMapsURI"];
const DETAIL_FIELDS = [
  "rating",
  "userRatingCount",
  "priceLevel",
  "regularOpeningHours",
  "utcOffsetMinutes",
  "nationalPhoneNumber",
  "websiteURI",
  "photos",
];

async function enrichGooglePlace(record) {
  const place = googlePlaceObjects.get(record.id);
  if (!place || record.enriched) return record;
  try {
    await place.fetchFields({ fields: DETAIL_FIELDS });
    const enriched = { ...googlePlaceToRecord(place, lastGoogleQuery), enriched: true };
    try {
      // isOpen() braucht regularOpeningHours und utcOffsetMinutes.
      const open = await place.isOpen();
      if (typeof open === "boolean") enriched.open = open;
    } catch {
      /* Öffnungsstatus ist optional. */
    }
    googleSearchResults.set(record.id, enriched);
    return enriched;
  } catch {
    return record;
  }
}

async function openGoogleResult(record) {
  announce(t("search.loadingDetails"));
  showPlaceForm(await enrichGooglePlace(record), true);
}

function googlePlaceToRecord(place, query) {
  const location = place.location;
  const name = typeof place.displayName === "string" ? place.displayName : place.displayName?.text || "Unbekannter Ort";
  const descriptions = place.regularOpeningHours?.weekdayDescriptions || [];
  let photoUrl = "";
  try {
    photoUrl = place.photos?.[0]?.getURI({ maxWidth: 900, maxHeight: 600 }) || "";
  } catch {
    photoUrl = "";
  }
  const isOpen = place.businessStatus !== "CLOSED_PERMANENTLY";
  return {
    id: "g_" + place.id,
    placeId: place.id,
    name,
    category: inferCategory(place.types || [], query),
    address: place.formattedAddress || "",
    latitude: location && typeof location.lat === "function" ? String(location.lat()) : "",
    longitude: location && typeof location.lng === "function" ? String(location.lng()) : "",
    rating: place.rating ? String(place.rating) : "",
    userRatingCount: place.userRatingCount || 0,
    priceLevel: place.priceLevel || "",
    openingHours: descriptions,
    hours: hoursToday({ openingHours: descriptions }),
    photoUrl,
    note: "",
    phone: place.nationalPhoneNumber || "",
    website: place.websiteURI || "",
    mapsUrl: place.googleMapsURI || "",
    open: isOpen,
    visitStatus: "wishlist",
    favorite: false,
    ownRating: "",
    visitDate: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function renderGoogleSearchPanel(results, query) {
  const panel = $("#search-explorer");
  const list = $("#places-result-list");
  lastGoogleQuery = query;
  panel.classList.remove("hidden");
  $("#search-results-title").textContent = t("search.resultCount", { count: results.length, query: query.trim() });
  list.innerHTML = results.length
    ? results
        .map((place) => {
          const distance = distanceKm(place);
          return `<article class="map-result-card">
            ${
              place.photoUrl
                ? `<img src="${esc(place.photoUrl)}" alt="${esc(t("search.photoAlt", { name: place.name }))}" loading="lazy" />`
                : `<div class="map-result-placeholder">${iconFor(place.category)}</div>`
            }
            <div class="map-result-content">
                <span class="result-category">${esc(categoryText(place.category))}</span>
              <h3>${esc(place.name)}</h3>
              <p>${esc(place.address)}</p>
              <div class="result-facts">
                ${place.rating ? `<span>${esc(t("search.ratingCount", { rating: place.rating, count: place.userRatingCount }))}</span>` : ""}
                ${place.priceLevel ? `<span>${esc(String(place.priceLevel).replaceAll("PRICE_LEVEL_", ""))}</span>` : ""}
                ${distance !== null ? `<span>${esc(t("search.distance", { distance: distance.toFixed(1) }))}</span>` : ""}
                ${place.hours ? `<span>${esc(place.hours)}</span>` : ""}
              </div>
              <div class="result-actions">
                <button class="primary" type="button" data-google-place="${esc(place.id)}">${esc(t("place.save"))}</button>
                <a class="secondary" data-map-link href="${esc(googleMapsUrl(place))}" target="_blank" rel="noopener noreferrer">${esc(t("search.navigation"))}</a>
              </div>
            </div>
          </article>`;
        })
        .join("")
    : `<div class="empty">${esc(t("search.googleNone"))}</div>`;

  try {
    await loadGooglePlaces();
    const [{ Map }, { AdvancedMarkerElement }, { LatLngBounds }] = await Promise.all([
      window.google.maps.importLibrary("maps"),
      window.google.maps.importLibrary("marker"),
      window.google.maps.importLibrary("core"),
    ]);
    const located = results.filter((place) => place.latitude && place.longitude);
    const center = currentLocation ||
      (located[0] ? { lat: Number(located[0].latitude), lng: Number(located[0].longitude) } : { lat: 51, lng: 10 });
    if (!searchMap) {
      // Eigene Map-ID aus config.js; DEMO_MAP_ID ist nur für Tests gedacht.
      const mapId = window.G04_CONFIG?.googleMapId || "DEMO_MAP_ID";
      searchMap = new Map($("#places-map"), { center, zoom: located.length ? 13 : 6, mapId });
    }
    searchMarkers.forEach((marker) => (marker.map = null));
    searchMarkers = [];
    const bounds = new LatLngBounds();
    located.forEach((place) => {
      const position = { lat: Number(place.latitude), lng: Number(place.longitude) };
      bounds.extend(position);
      const marker = new AdvancedMarkerElement({ map: searchMap, position, title: place.name, gmpClickable: true });
      marker.addEventListener("gmp-click", () => openGoogleResult(googleSearchResults.get(place.id) || place));
      searchMarkers.push(marker);
    });
    if (located.length > 1) searchMap.fitBounds(bounds, 60);
    else if (located.length === 1) {
      searchMap.setCenter(center);
      searchMap.setZoom(14);
    }
  } catch {
    $("#places-map").innerHTML = `<div class="map-unavailable">${esc(t("search.mapUnavailable"))}</div>`;
  }
}

function renderSearchSuggestions(rawQuery, localHits, remoteHits = [], message = "") {
  const box = $("#suggestions");
  const localIds = new Set(localHits.map((place) => place.placeId).filter(Boolean));
  const remote = remoteHits.filter((place) => !localIds.has(place.placeId));
  const localMarkup = localHits
    .map(
      (place) => `<div class="suggestion" role="option" tabindex="0" data-place="${esc(place.id)}">
        <span class="suggestion-icon">${iconFor(place.category)}</span>
        <div><strong>${esc(place.name)}</strong><small>${esc(place.address)} · ${esc(t("saved.suffix"))}</small></div>
      </div>`,
    )
    .join("");
  const remoteMarkup = remote
    .map(
      (place) => `<div class="suggestion remote-suggestion" role="option" tabindex="0"
        data-google-place="${esc(place.id)}">
        <span class="suggestion-icon">${iconFor(place.category)}</span>
        <div><strong>${esc(place.name)}</strong><small>${esc(place.address)}</small></div>
        ${place.rating ? `<span class="search-rating">★ ${esc(place.rating)}</span>` : ""}
      </div>`,
    )
    .join("");
  const source = remote.length ? `<div class="search-source">${esc(t("search.googleSource"))}</div>` : "";
  const status = message
    ? message === "missing-key"
      ? `<button class="search-message search-message-action" type="button" data-open-settings>
          ${t("search.googleMissing")}
        </button>`
      : `<div class="search-message">${esc(message)}</div>`
    : "";
  const manual = `<div class="suggestion manual-suggestion" role="option" tabindex="0" data-new>
    <span class="suggestion-icon" aria-hidden="true">＋</span>
    <div><strong>${esc(t("search.manualTitle", { query: rawQuery.trim() }))}</strong><small>${esc(t("search.manualSubtitle"))}</small></div>
  </div>`;
  box.innerHTML = source + localMarkup + remoteMarkup + status + manual;
  box.classList.remove("hidden");
  $("#search").setAttribute("aria-expanded", "true");
}

async function searchGooglePlaces(rawQuery, localHits, version, locationRestriction = null) {
  try {
    const library = await loadGooglePlaces();
    const Place = library.Place || window.google.maps.places.Place;
    const request = {
      textQuery: rawQuery.trim(),
      fields: LIST_FIELDS,
      maxResultCount: 10,
      language: locale,
      region: searchRegion(),
    };
    if (locationRestriction) request.locationRestriction = locationRestriction;
    else if (currentLocation) request.locationBias = currentLocation;
    const response = await Place.searchByText(request);
    if (version !== googleSearchVersion) return;
    const found = response.places || [];
    const results = found.map((place) => googlePlaceToRecord(place, rawQuery));
    googleSearchResults.clear();
    googlePlaceObjects.clear();
    results.forEach((place, i) => {
      googleSearchResults.set(place.id, place);
      googlePlaceObjects.set(place.id, found[i]);
    });
    renderGoogleSearchPanel(results, rawQuery);
    renderSearchSuggestions(
      rawQuery,
      localHits,
      results,
      results.length ? "" : t("search.googleNone"),
    );
  } catch (error) {
    if (version !== googleSearchVersion) return;
    const missing = error.message === "missing-key";
    renderSearchSuggestions(
      rawQuery,
      localHits,
      [],
      missing ? "missing-key" : googlePlacesError(error),
    );
  }
}

function runSearch(rawQuery) {
  const input = $("#search");
  const box = $("#suggestions");
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    window.clearTimeout(googleSearchTimer);
    googleSearchVersion += 1;
    box.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    return;
  }

  const hits = places.filter((place) =>
    (place.name + " " + place.address + " " + place.category).toLowerCase().includes(query),
  );
  const hasGoogleKey = Boolean(googlePlacesKey());
  renderSearchSuggestions(
    rawQuery,
    hits,
    [],
    hasGoogleKey ? t("search.googleSearching") : "missing-key",
  );
  window.clearTimeout(googleSearchTimer);
  const version = ++googleSearchVersion;
  if (query.length >= 3) {
    // Jede Suche kostet Geld: erst nach einer Sekunde Tippruhe anfragen.
    googleSearchTimer = window.setTimeout(() => searchGooglePlaces(rawQuery, hits, version), 1000);
  }
}

function hideSuggestions() {
  $("#suggestions").classList.add("hidden");
  $("#search").setAttribute("aria-expanded", "false");
}

/* --------------------------------------------------------------- Einstellungen */

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  const toggle = $("#theme-toggle");
  toggle.setAttribute("aria-pressed", String(dark));
  $("#settings-theme").checked = dark;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#101114" : "#1769ff");
  writeSetting("g04-theme", dark ? "dark" : "light");
}

function renderToday() {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  const today = $("#today");
  if (!today) return;
  today.textContent = formatted.toUpperCase();
  today.dateTime = now.toISOString().slice(0, 10);
  today.title = formatted;
}

function setLocale(nextLocale, announceChange = true) {
  locale = TRANSLATIONS[nextLocale] ? nextLocale : "en";
  writeSetting("g04-language", locale);
  translateStatic();
  renderToday();
  render();
  setupNotificationsToggle();
  setupOfflineToggle();
  if (announceChange) {
    announce(t("language.changed", { language: locale === "en" ? t("settings.english") : t("settings.german") }));
  }
}

/* ------------------------------------------------------------ Service Worker */

const canUseServiceWorker = "serviceWorker" in navigator && location.protocol !== "file:";

async function enableOffline() {
  if (!canUseServiceWorker) return false;
  try {
    await navigator.serviceWorker.register("./sw.js");
    return true;
  } catch {
    return false;
  }
}

async function disableOffline() {
  if (!canUseServiceWorker) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));
  if (window.caches) {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("g04explore")).map((key) => caches.delete(key)));
  }
}

async function setupOfflineToggle() {
  const toggle = $("#settings-offline");
  const hint = $("#offline-hint");

  if (!canUseServiceWorker) {
    toggle.checked = false;
    toggle.disabled = true;
    hint.textContent = t("offline.httpOnly");
    return;
  }

  const wanted = readSetting("g04-offline", "on") === "on";
  toggle.checked = wanted;

  if (wanted) {
    // Der Schalter darf nur „an“ zeigen, wenn die Registrierung wirklich klappt.
    const ok = await enableOffline();
    toggle.checked = ok;
    if (!ok) hint.textContent = t("offline.unavailable");
  }

  toggle.onchange = async () => {
    if (toggle.checked) {
      const ok = await enableOffline();
      toggle.checked = ok;
      writeSetting("g04-offline", ok ? "on" : "off");
      hint.textContent = ok ? t("offline.enabled") : t("offline.enableError");
    } else {
      await disableOffline();
      writeSetting("g04-offline", "off");
      hint.textContent = t("offline.removed");
    }
  };
}

function setupNotificationsToggle() {
  const toggle = $("#settings-notifications");
  const hint = $("#notifications-hint");

  if (!("Notification" in window)) {
    toggle.checked = false;
    toggle.disabled = true;
    hint.textContent = t("notifications.unsupported");
    return;
  }

  const granted = Notification.permission === "granted";
  const wanted = readSetting("g04-notifications", "off") === "on";
  toggle.checked = granted && wanted;

  if (Notification.permission === "denied") {
    toggle.disabled = true;
    hint.textContent = t("notifications.blocked");
    return;
  }

  toggle.onchange = async () => {
    if (!toggle.checked) {
      writeSetting("g04-notifications", "off");
      hint.textContent = t("notifications.hint");
      return;
    }
    const permission = await Notification.requestPermission();
    const ok = permission === "granted";
    toggle.checked = ok;
    writeSetting("g04-notifications", ok ? "on" : "off");
    hint.textContent = ok ? t("notifications.active") : t("notifications.denied");
  };
}

/* --------------------------------------------------------------------- Start */

function bindEvents() {
  // Navigation
  $$("[data-view]").forEach((button) => {
    button.onclick = () => showView(button.dataset.view);
  });

  $("#clear-filter").onclick = () => showView("saved");

  $$('[data-search-nav]').forEach((button) => {
    button.onclick = () => {
      showView("search");
      const search = $("#search");
      search?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => search?.focus(), 220);
    };
  });

  // Kategorien, Orte und Listen sind Karten — Klick und Tastatur müssen gleich wirken.
  document.addEventListener("click", (event) => {
    const openSettings = event.target.closest("[data-open-settings]");
    if (openSettings) {
      hideSuggestions();
      return showView("settings");
    }

    const category = event.target.closest("[data-category]");
    if (category) return showView("saved", { category: category.dataset.category });

    const googlePlace = event.target.closest("[data-google-place]");
    if (googlePlace) {
      const result = googleSearchResults.get(googlePlace.dataset.googlePlace);
      if (!result) return;
      hideSuggestions();
      $("#search").value = "";
      return openGoogleResult(result);
    }

    const place = event.target.closest("[data-place]");
    if (place) {
      hideSuggestions();
      return showDetail(place.dataset.place);
    }

    const trip = event.target.closest("[data-trip]");
    if (trip) return showTripModal(trip.dataset.trip);

    if (event.target.closest("[data-new]")) {
      hideSuggestions();
      const query = $("#search").value.trim();
      $("#search").value = "";
      showPlaceForm(null);
      const nameField = $("#f-name");
      if (nameField) nameField.value = query;
      return;
    }

    if (!event.target.closest(".search-wrap")) hideSuggestions();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const card = event.target.closest('[role="button"], [role="option"]');
      if (card) {
        event.preventDefault();
        card.click();
      }
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      showView("search");
      $("#search").focus();
    }
  });

  // Orte anlegen
  $$(".add-place-btn").forEach((button) => {
    button.onclick = () => showPlaceForm(null);
  });

  // Listen
  $("#new-trip").onclick = createTrip;
  $("#saved-search").oninput = () => renderSavedView();
  $("#saved-filter-toggle").onclick = () => {
    const controls = $("#saved-view .saved-controls");
    const hidden = controls.classList.toggle("hidden");
    $("#saved-filter-toggle").setAttribute("aria-expanded", String(!hidden));
  };

  // Suche
  $("#search").oninput = (event) => runSearch(event.target.value);
  $("#search-filter-toggle").onclick = () => {
    const filters = $(".search-quick-filters");
    const hidden = filters.classList.toggle("hidden");
    $("#search-filter-toggle").setAttribute("aria-pressed", String(!hidden));
  };
  $$('[data-search-query]').forEach((button) => {
    button.onclick = () => {
      showView("search");
      const input = $("#search");
      input.value = button.dataset.searchQuery;
      runSearch(input.value);
      input.focus();
    };
  });
  $("#search-nearby-shortcut").onclick = () => {
    showView("search");
    $("#use-location").click();
  };
  $("#close-search-results").onclick = () => {
    $("#search-explorer").classList.add("hidden");
    searchMarkers.forEach((marker) => (marker.map = null));
    searchMarkers = [];
  };
  $("#use-location").onclick = async () => {
    await requestCurrentLocation({ search: true });
  };
  $("#search-map-area").onclick = () => {
    if (!searchMap) {
      announce(t("search.mapFirst"));
      return;
    }
    const bounds = searchMap.getBounds();
    const query = lastGoogleQuery || $("#search").value.trim();
    if (!query || !bounds) return;
    const localHits = places.filter((place) =>
      (place.name + " " + place.address + " " + place.category).toLowerCase().includes(query.toLowerCase()),
    );
    const version = ++googleSearchVersion;
    searchGooglePlaces(query, localHits, version, bounds);
  };
  const openNearbyMap = () => {
    showView("search");
    $("#use-location").click();
  };
  $("#home-location").onclick = openNearbyMap;
  $("#home-location-arrow").onclick = openNearbyMap;
  ["#filter-category", "#filter-status", "#filter-favorites", "#sort-places"].forEach((selector) => {
    $(selector).onchange = () => renderSavedView();
  });

  // Einstellungen
  $("#theme-toggle").onclick = () => applyTheme(!document.body.classList.contains("dark"));
  $("#settings-theme").onchange = (event) => applyTheme(event.target.checked);
  $("#settings-language").onchange = (event) => setLocale(event.target.value);
  $("#google-places-connect").onclick = () => announce(googlePlacesKey() ? t("google.connected") : t("google.notConfigured"));
  $("#settings-reset").onclick = async () => {
    await disableOffline();
    ["g04-language", "g04-theme", "g04-offline", "g04-notifications"].forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        /* Privater Modus: die Ansicht bleibt benutzbar. */
      }
    });
    window.location.reload();
  };
  $("#header-language")?.querySelectorAll("[data-locale]").forEach((button) => {
    button.onclick = () => setLocale(button.dataset.locale);
  });
}

function init() {
  const storedLocale = readSetting("g04-language", "en");
  locale = TRANSLATIONS[storedLocale] ? storedLocale : "en";
  translateStatic();
  $("#google-places-hint").textContent = googlePlacesKey()
    ? t("google.connected")
    : t("google.notConfigured");
  applyTheme(readSetting("g04-theme", "light") === "dark");
  renderToday();
  render();
  bindEvents();
  setupNotificationsToggle();
  setupOfflineToggle();
  showView("search");
}

init();
