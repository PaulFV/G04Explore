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
    "meta.title": "G04Explore — Your places. Your map.",
    "meta.description": "Your personal space for saving and planning favorite places.",
    "brand.eyebrow": "YOUR EXPLORER SPACE",
    "nav.main": "Main navigation",
    "nav.home": "Overview",
    "nav.saved": "All places",
    "nav.trips": "Travel lists",
    "nav.settings": "Settings",
    "offline.available": "Available offline",
    "offline.description": "Your collection stays with you on the go.",
    "theme.toggle": "Toggle dark mode",
    "profile.next": "Your next adventure?",
    "place.save": "＋ Save place",
    "search.label": "Search places",
    "search.placeholder": "Search places, cities or categories...",
    "search.suggestions": "Search suggestions",
    "search.resultsLabel": "Google Maps search results",
    "search.results": "Search results",
    "search.photoAlt": "Photo of {{name}}",
    "search.navigation": "↗ Navigation",
    "search.nearby": "⌖ Near me",
    "search.area": "Search this area",
    "search.close": "Close search results",
    "home.heading": "What would you like to discover?",
    "home.all": "View all",
    "home.recent": "Recently saved",
    "home.favorites": "Favorites",
    "home.nearby": "Near you",
    "home.search": "⌖ Search",
    "home.insights": "Overview insights",
    "saved.eyebrow": "YOUR PLACES",
    "saved.title": "All saved places",
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
    "trips.new": "＋ New list",
    "settings.eyebrow": "APP SETTINGS",
    "settings.heading": "Your settings",
    "settings.name": "Your name",
    "settings.nameHint": "For the greeting on the overview",
    "settings.namePlaceholder": "Alex",
    "settings.dark": "Dark mode",
    "settings.darkHint": "Easier on your eyes in low light",
    "settings.offline": "Offline mode",
    "settings.offlineHint": "Saved places available offline",
    "settings.notifications": "Notifications",
    "settings.notificationsHint": "Tips and reminders about your places",
    "settings.google": "Google Places",
    "settings.googleHint": "Provided centrally for all users",
    "settings.central": "CENTRAL",
    "settings.language": "Language",
    "settings.languageHint": "Choose your app language",
    "settings.english": "English",
    "settings.german": "German",
    "settings.footer": "G04EX · Your data stays on this device. © 2026 G04Explore.",
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
    "tagline.Restaurants": "Great addresses for every taste",
    "tagline.Hotels": "Sleep & settle in",
    "tagline.Events": "Dates you don't want to miss",
    "tagline.Sport": "Movement and fresh air",
    "tagline.Museen": "Art, history and ideas",
    "tagline.Sehenswürdigkeiten": "Places that stay with you",
    "tagline.Cafés": "Short breaks, great coffee",
    "place.singular": "place",
    "place.plural": "places",
    "saved.suffix": "saved",
    "device.only": "Only on this device",
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
    "profile.hi": "Hi",
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
    "meta.title": "G04Explore — Deine Orte. Deine Karte.",
    "meta.description": "Dein persönlicher Speicher und digitaler Planer für Lieblingsorte.",
    "brand.eyebrow": "DEIN ENTDECKER-SPACE",
    "nav.main": "Hauptnavigation",
    "nav.home": "Übersicht",
    "nav.saved": "Alle Orte",
    "nav.trips": "Reise-Listen",
    "nav.settings": "Einstellungen",
    "offline.available": "Offline verfügbar",
    "offline.description": "Deine Sammlung bleibt auch unterwegs bei dir.",
    "theme.toggle": "Dark Mode umschalten",
    "profile.next": "Dein nächstes Abenteuer?",
    "place.save": "＋ Ort speichern",
    "search.label": "Orte durchsuchen",
    "search.placeholder": "Nach Orten, Städten oder Kategorien suchen...",
    "search.suggestions": "Suchvorschläge",
    "search.resultsLabel": "Google-Maps-Suchergebnisse",
    "search.results": "Suchergebnisse",
    "search.photoAlt": "Foto von {{name}}",
    "search.navigation": "↗ Navigation",
    "search.nearby": "⌖ Meine Nähe",
    "search.area": "In diesem Bereich suchen",
    "search.close": "Suchergebnisse schließen",
    "home.heading": "Was möchtest du entdecken?",
    "home.all": "Alle anzeigen",
    "home.recent": "Zuletzt gespeichert",
    "home.favorites": "Favoriten",
    "home.nearby": "In deiner Nähe",
    "home.search": "⌖ Suchen",
    "home.insights": "Übersicht und Empfehlungen",
    "saved.eyebrow": "DEINE ORTE",
    "saved.title": "Alle gespeicherten Orte",
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
    "trips.new": "＋ Neue Liste",
    "settings.eyebrow": "APP EINSTELLUNGEN",
    "settings.heading": "Deine Einstellungen",
    "settings.name": "Dein Name",
    "settings.nameHint": "Für die Begrüßung auf der Übersicht",
    "settings.namePlaceholder": "Max",
    "settings.dark": "Dark Mode",
    "settings.darkHint": "Schont deine Augen bei wenig Licht",
    "settings.offline": "Offline-Modus",
    "settings.offlineHint": "Gespeicherte Orte offline verfügbar",
    "settings.notifications": "Benachrichtigungen",
    "settings.notificationsHint": "Tipps und Erinnerungen zu deinen Orten",
    "settings.google": "Google Places",
    "settings.googleHint": "Wird zentral für alle Nutzer bereitgestellt",
    "settings.central": "ZENTRAL",
    "settings.language": "Sprache",
    "settings.languageHint": "Wähle die Sprache der App",
    "settings.english": "Englisch",
    "settings.german": "Deutsch",
    "settings.footer": "G04EX · Deine Daten bleiben auf diesem Gerät gespeichert. © 2026 G04Explore.",
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
    "tagline.Restaurants": "Gute Adressen für jeden Geschmack",
    "tagline.Hotels": "Schlafen & ankommen",
    "tagline.Events": "Termine, die du nicht verpassen willst",
    "tagline.Sport": "Bewegung und frische Luft",
    "tagline.Museen": "Kunst, Geschichte und Ideen",
    "tagline.Sehenswürdigkeiten": "Orte, die bleiben",
    "tagline.Cafés": "Kurze Pausen, guter Kaffee",
    "place.singular": "Ort",
    "place.plural": "Orte",
    "saved.suffix": "gespeichert",
    "device.only": "Nur auf diesem Gerät",
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
    "profile.hi": "Hi",
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

let locale = "en";

function t(key, values = {}) {
  const text = TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return Object.entries(values).reduce((result, [name, value]) => result.replaceAll("{{" + name + "}}", String(value)), text);
}

function categoryText(category) {
  return t("category." + category) || category;
}

function categoryTagline(category) {
  return t("tagline." + category) || category;
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
];

const ICON_PATHS = {
  Restaurants: "M4 5h16M7 5v5a5 5 0 0010 0V5M5 19h14M12 15v4",
  Hotels: "M4 20V7l4-3 4 3v13M12 20V10l4-3 4 3v10M7 11h2M15 12h2",
  Events: "M5 6h14v13H5zM8 3v6M16 3v6M5 10h14M8 14h3M13 14h3",
  Sport: "M12 4a3 3 0 100 6 3 3 0 000-6M6 21l2-6 4-2 4 2 2 6M8 15l-3-3M16 15l3-3",
  Museen: "M4 20h16M6 17V9l6-4 6 4v8M9 17v-4h6v4",
  Sehenswürdigkeiten: "M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3",
  Cafés: "M6 8h10v5a5 5 0 01-10 0V8m10 2h2a3 3 0 010 6h-2M4 20h14",
};

const TRIP_EMOJIS = ["🌴", "☀️", "🍷", "🏔️", "🏙️", "🎒", "🚲", "⛱️"];

const SEED_PLACES = [
  {
    id: "p1",
    name: "Berggasthof Panorama",
    category: "Restaurants",
    address: "Panoramaweg 4, München",
    open: true,
    rating: "4.8",
    hours: "Heute 11:30 – 22:00",
    note: "Unbedingt den Kaiserschmarrn probieren.",
    phone: "",
    website: "",
  },
  {
    id: "p2",
    name: "The Hoxton Berlin",
    category: "Hotels",
    address: "Charlottenburg, Berlin",
    open: true,
    rating: "4.6",
    hours: "Rezeption 24 Stunden",
    note: "Schöne Lobby zum Arbeiten.",
    phone: "",
    website: "",
  },
  {
    id: "p3",
    name: "Museum Barberini",
    category: "Museen",
    address: "Alter Markt, Potsdam",
    open: false,
    rating: "4.7",
    hours: "Heute geschlossen",
    note: "Nächste Ausstellung vormerken.",
    phone: "",
    website: "",
  },
  {
    id: "p4",
    name: "Kleine Freiheit",
    category: "Cafés",
    address: "Gärtnerplatz 2, München",
    open: true,
    rating: "4.5",
    hours: "Heute 08:00 – 18:00",
    note: "",
    phone: "",
    website: "",
  },
  {
    id: "p5",
    name: "Teufelsberg",
    category: "Sehenswürdigkeiten",
    address: "Teufelsseechaussee, Berlin",
    open: true,
    rating: "4.8",
    hours: "Heute 11:00 – 20:00",
    note: "",
    phone: "",
    website: "",
  },
];

const SEED_TRIPS = [
  { id: "t1", name: "München entdecken", emoji: "🥨", placeIds: ["p1", "p4"] },
  { id: "t2", name: "Berlin Wochenende", emoji: "🏙️", placeIds: ["p2", "p5"] },
  { id: "t3", name: "Museumstag", emoji: "🎨", placeIds: ["p3"] },
];

/* ----------------------------------------------------------------- Zustand */

let places = readStore("g04-places", SEED_PLACES);
let trips = readStore("g04-trips", SEED_TRIPS);
let activeCategory = null;
let activeTrip = null;
let currentView = "home";
let googleLoaderPromise = null;
let googleSearchTimer = null;
let googleSearchVersion = 0;
let googleAuthError = "";
const googleSearchResults = new Map();
let searchMap = null;
let searchMarkers = [];
let currentLocation = null;
let lastGoogleQuery = "";

/* ----------------------------------------------------------------- Speicher */

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return structuredClone(fallback);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : structuredClone(fallback);
  } catch {
    // Privater Modus oder beschädigte Daten: mit den Beispieldaten weitermachen.
    return structuredClone(fallback);
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    announce("Speichern nicht möglich — der Browser-Speicher ist voll oder gesperrt.");
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
  const path = ICON_PATHS[category] || ICON_PATHS["Sehenswürdigkeiten"];
  return (
    '<svg class="neo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' +
    path +
    '"/></svg>'
  );
}

function announce(message) {
  const region = $("#live-region");
  if (region) region.textContent = message;
}

function countLabel(n, singular = t("place.singular"), plural = t("place.plural")) {
  return n + " " + (n === 1 ? singular : plural);
}

const VISIT_STATUS = {
  wishlist: "Möchte ich besuchen",
  planned: "Geplant",
  visited: "Besucht",
};

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
  $("#category-grid").innerHTML = CATEGORIES.map((category, index) => {
    const count = places.filter((place) => place.category === category.name).length;
    const label = categoryText(category.name);
    const size = [index === 0 ? "large" : "", label.length > 13 ? "wide" : ""].join(" ").trim();
    return `<article class="category-card ${category.slug} ${size}" data-category="${esc(category.name)}"
      role="button" tabindex="0" aria-label="${esc(t("category.aria", { category: label, count: savedCount(count) }))}">
      <span class="card-icon">${iconFor(category.name)}</span>
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
            return `<article class="place-card ${place.photoUrl ? "has-photo" : ""}" data-place="${esc(place.id)}"
              role="button" tabindex="0" aria-label="${esc(place.name)}, ${esc(place.address)}">
              ${place.photoUrl ? `<img class="place-card-photo" src="${esc(place.photoUrl)}" alt="" loading="lazy" />` : ""}
              <div class="place-card-body">
                <div class="place-top">
                  <span class="place-emoji">${iconFor(place.category)}</span>
                  <span class="favorite-mark" aria-label="${place.favorite ? t("favorite.yes") : t("favorite.no")}">${
                    place.favorite ? "♥" : "♡"
                  }</span>
                </div>
                <h3>${esc(place.name)}</h3>
                <p>${esc(place.address)}</p>
                <div class="place-meta">
                  ${place.rating ? `<span>★ ${esc(place.rating)}</span>` : ""}
                  <span>${esc(statusText(place.visitStatus))}</span>
                  ${distance !== null ? `<span>${esc(t("search.distance", { distance: distance.toFixed(1) }))}</span>` : ""}
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
  grid.innerHTML = trips.length
    ? trips
        .map((trip) => {
          const count = trip.placeIds.filter((id) => places.some((p) => p.id === id)).length;
          return `<article class="trip-card" data-trip="${esc(trip.id)}" role="button" tabindex="0"
          aria-label="${esc(t("trip.aria", { name: trip.name, count: placeCount(count) }))}">
          <div class="trip-cover" aria-hidden="true">${esc(trip.emoji)}</div>
          <h3>${esc(trip.name)}</h3>
          <p>${esc(placeCount(count))} · ${esc(t("device.only"))}</p>
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
  renderInsightList("#nearby-places", nearby, t("empty.nearby"));
}

function renderSavedView() {
  const title = $("#saved-title");
  const eyebrow = $("#saved-eyebrow");
  const clearButton = $("#clear-filter");
  let list = places;
  let empty = t("empty.places");

  if (activeCategory) {
    list = places.filter((place) => place.category === activeCategory);
    title.textContent = categoryText(activeCategory);
    eyebrow.textContent = t("saved.categoryEyebrow");
    empty = t("empty.category");
  } else if (activeTrip) {
    const trip = trips.find((t) => t.id === activeTrip);
    list = trip ? places.filter((place) => trip.placeIds.includes(place.id)) : [];
    title.textContent = trip ? trip.name : t("saved.list");
    eyebrow.textContent = t("saved.tripEyebrow");
    empty = t("empty.trip");
  } else {
    title.textContent = t("saved.title");
    eyebrow.textContent = t("saved.eyebrow");
  }

  const categoryFilter = $("#filter-category")?.value || "";
  const statusFilter = $("#filter-status")?.value || "";
  const favoritesOnly = $("#filter-favorites")?.checked || false;
  const sort = $("#sort-places")?.value || "recent";
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
        place.photoUrl ? `<img src="${esc(place.photoUrl)}" alt="" />` : iconFor(place.category)
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
        <div><small>${esc(t("detail.opening"))}</small><strong>${esc(place.hours) || "—"}</strong></div>
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

  openModal(
    `<div class="modal form-modal">
      <button class="close" type="button" aria-label="${esc(t("form.close"))}">×</button>
      <h2>${esc(trip.emoji)} ${esc(trip.name)}</h2>
      <div class="field">
        <label for="t-name">${esc(t("trip.name"))}</label>
        <input id="t-name" type="text" autofocus value="${esc(trip.name)}" />
      </div>
      <div class="field">
        <span class="field-label">${esc(t("trip.symbol"))}</span>
        <div class="emoji-row" role="group" aria-label="${esc(t("trip.chooseSymbol"))}">
          ${TRIP_EMOJIS.map(
            (emoji) =>
              `<button type="button" class="emoji-btn ${emoji === trip.emoji ? "selected" : ""}"
                data-emoji="${esc(emoji)}" aria-pressed="${emoji === trip.emoji}">${esc(emoji)}</button>`,
          ).join("")}
        </div>
      </div>
      <div class="field">
        <span class="field-label">${esc(t("trip.places"))}</span>
        <div class="chip-list">
          ${
            places.length
              ? places
                  .map(
                    (place) => `<label class="chip">
                      <input type="checkbox" data-place-id="${esc(place.id)}"
                        ${trip.placeIds.includes(place.id) ? "checked" : ""} />
                      <span>${esc(place.name)}</span>
                    </label>`,
                  )
                  .join("")
              : `<p class="muted-note">${esc(t("trip.noPlaces"))}</p>`
          }
        </div>
      </div>
      <div class="actions">
        <button class="danger" type="button" data-delete>${esc(t("trip.delete"))}</button>
        <button class="primary" type="button" data-save>${esc(t("trip.save"))}</button>
      </div>
    </div>`,
    t("trip.dialog", { name: trip.name }),
  );

  const root = $("#modal-root");
  let chosenEmoji = trip.emoji;

  $(".close", root).onclick = closeModal;

  $$(".emoji-btn", root).forEach((button) => {
    button.onclick = () => {
      chosenEmoji = button.dataset.emoji;
      $$(".emoji-btn", root).forEach((other) => {
        const selected = other === button;
        other.classList.toggle("selected", selected);
        other.setAttribute("aria-pressed", String(selected));
      });
    };
  });

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
  return typeof globalKey === "string" && globalKey.trim()
    ? globalKey.trim()
    : readSetting("g04-google-key", "").trim();
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
      (locale === "en" ? "US" : "DE") +
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

function googlePlaceToRecord(place, query) {
  const location = place.location;
  const name = typeof place.displayName === "string" ? place.displayName : place.displayName?.text || "Unbekannter Ort";
  const descriptions = place.regularOpeningHours?.weekdayDescriptions || [];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  let photoUrl = "";
  try {
    photoUrl = place.photos?.[0]?.getURI({ maxWidth: 900, maxHeight: 600 }) || "";
  } catch {
    photoUrl = "";
  }
  let isOpen = place.businessStatus !== "CLOSED_PERMANENTLY";
  try {
    const liveOpen = place.regularOpeningHours?.isOpen?.();
    if (typeof liveOpen === "boolean") isOpen = liveOpen;
  } catch {
    /* Öffnungsstatus ist optional. */
  }
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
    hours: descriptions[todayIndex] || "",
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
      searchMap = new Map($("#places-map"), { center, zoom: located.length ? 13 : 6, mapId: "DEMO_MAP_ID" });
    }
    searchMarkers.forEach((marker) => (marker.map = null));
    searchMarkers = [];
    const bounds = new LatLngBounds();
    located.forEach((place) => {
      const position = { lat: Number(place.latitude), lng: Number(place.longitude) };
      bounds.extend(position);
      const marker = new AdvancedMarkerElement({ map: searchMap, position, title: place.name, gmpClickable: true });
      marker.addEventListener("gmp-click", () => showPlaceForm(place, true));
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
      fields: [
        "id",
        "displayName",
        "formattedAddress",
        "location",
        "rating",
        "userRatingCount",
        "priceLevel",
        "photos",
        "regularOpeningHours",
        "businessStatus",
        "types",
        "nationalPhoneNumber",
        "websiteURI",
        "googleMapsURI",
      ],
      maxResultCount: 20,
      language: locale,
      region: locale === "en" ? "US" : "DE",
    };
    if (locationRestriction) request.locationRestriction = locationRestriction;
    else if (currentLocation) request.locationBias = currentLocation;
    const response = await Place.searchByText(request);
    if (version !== googleSearchVersion) return;
    const results = (response.places || []).map((place) => googlePlaceToRecord(place, rawQuery));
    googleSearchResults.clear();
    results.forEach((place) => googleSearchResults.set(place.id, place));
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
    googleSearchTimer = window.setTimeout(() => searchGooglePlaces(rawQuery, hits, version), 650);
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
  toggle.textContent = dark ? "☀" : "☾";
  toggle.setAttribute("aria-pressed", String(dark));
  $("#settings-theme").checked = dark;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#101114" : "#1769ff");
  writeSetting("g04-theme", dark ? "dark" : "light");
}

function applyProfile(name) {
  const clean = name.trim();
  $("#greeting").textContent = clean ? t("profile.hi") + ", " + clean : t("profile.hi");
  $("#avatar").textContent = clean
    ? clean
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "G4";
  writeSetting("g04-name", clean);
}

function renderToday() {
  const formatted = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  $("#today").textContent = formatted.toUpperCase();
}

function setLocale(nextLocale, announceChange = true) {
  locale = TRANSLATIONS[nextLocale] ? nextLocale : "en";
  writeSetting("g04-language", locale);
  translateStatic();
  applyProfile(readSetting("g04-name", ""));
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
      return showPlaceForm(result, true);
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
      $("#search").focus();
    }
  });

  // Orte anlegen
  $$(".add-place-btn").forEach((button) => {
    button.onclick = () => showPlaceForm(null);
  });

  // Listen
  $("#new-trip").onclick = createTrip;

  // Suche
  $("#search").oninput = (event) => runSearch(event.target.value);
  $("#close-search-results").onclick = () => {
    $("#search-explorer").classList.add("hidden");
    searchMarkers.forEach((marker) => (marker.map = null));
    searchMarkers = [];
  };
  $("#use-location").onclick = () => {
    if (!navigator.geolocation) {
      announce(t("search.noLocation"));
      return;
    }
    if (!confirm(t("search.locationDisclosure"))) return;
    announce(t("search.locationRequest"));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        const query = $("#search").value.trim() || lastGoogleQuery || t("search.nearbyQuery");
        const localHits = places.filter((place) =>
          (place.name + " " + place.address + " " + place.category).toLowerCase().includes(query.toLowerCase()),
        );
        const version = ++googleSearchVersion;
        searchGooglePlaces(query, localHits, version);
        announce(t("search.locationUsed"));
      },
      () => announce(t("search.locationDenied"))
    );
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
  $("#home-location").onclick = () => $("#use-location").click();
  ["#filter-category", "#filter-status", "#filter-favorites", "#sort-places"].forEach((selector) => {
    $(selector).onchange = () => renderSavedView();
  });

  // Einstellungen
  $("#theme-toggle").onclick = () => applyTheme(!document.body.classList.contains("dark"));
  $("#settings-theme").onchange = (event) => applyTheme(event.target.checked);
  $("#settings-name").oninput = (event) => applyProfile(event.target.value);
  $("#settings-language").onchange = (event) => setLocale(event.target.value);
}

function init() {
  const storedLocale = readSetting("g04-language", "en");
  locale = TRANSLATIONS[storedLocale] ? storedLocale : "en";
  translateStatic();
  const storedName = readSetting("g04-name", "");
  $("#settings-name").value = storedName;
  $("#google-places-hint").textContent = googlePlacesKey()
    ? t("google.connected")
    : t("google.notConfigured");
  applyProfile(storedName);
  applyTheme(readSetting("g04-theme", "light") === "dark");
  renderToday();
  render();
  bindEvents();
  setupNotificationsToggle();
  setupOfflineToggle();
}

init();
