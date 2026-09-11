/*
 * G04Explore — persönlicher Speicher und Planer für Lieblingsorte.
 *
 * Reine Client-App ohne Build-Schritt. Alle Daten liegen in localStorage,
 * es werden keine Inhalte an einen Server gesendet.
 */

"use strict";

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

function countLabel(n, singular, plural) {
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
    const size = [index === 0 ? "large" : "", category.name.length > 13 ? "wide" : ""].join(" ").trim();
    return `<article class="category-card ${category.slug} ${size}" data-category="${esc(category.name)}"
      role="button" tabindex="0" aria-label="Kategorie ${esc(category.name)}, ${countLabel(count, "Ort", "Orte")}">
      <span class="card-icon">${iconFor(category.name)}</span>
      <h3>${esc(category.name)}</h3>
      <p>${esc(category.tagline)}</p>
      <span class="count">${countLabel(count, "Ort", "Orte")} gespeichert</span>
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
                  <span class="favorite-mark" aria-label="${place.favorite ? "Favorit" : "Kein Favorit"}">${
                    place.favorite ? "♥" : "♡"
                  }</span>
                </div>
                <h3>${esc(place.name)}</h3>
                <p>${esc(place.address)}</p>
                <div class="place-meta">
                  ${place.rating ? `<span>★ ${esc(place.rating)}</span>` : ""}
                  <span>${esc(VISIT_STATUS[place.visitStatus] || "Möchte ich besuchen")}</span>
                  ${distance !== null ? `<span>${distance.toFixed(1)} km</span>` : ""}
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
          aria-label="Liste ${esc(trip.name)}, ${countLabel(count, "Ort", "Orte")}">
          <div class="trip-cover" aria-hidden="true">${esc(trip.emoji)}</div>
          <h3>${esc(trip.name)}</h3>
          <p>${countLabel(count, "Ort", "Orte")} · Nur auf diesem Gerät</p>
        </article>`;
        })
        .join("")
    : `<div class="empty">Noch keine Liste angelegt. Leg deine erste mit „＋ Neue Liste“ an.</div>`;
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
  renderInsightList("#recent-places", recent, "Noch keine Orte gespeichert.");
  renderInsightList("#favorite-places", places.filter((place) => place.favorite), "Markiere Orte als Favorit.");
  const nearby = places
    .map((place) => ({ place, distance: distanceKm(place) }))
    .filter((entry) => entry.distance !== null)
    .sort((a, b) => a.distance - b.distance)
    .map((entry) => entry.place);
  renderInsightList("#nearby-places", nearby, "Standort auf Anfrage verwenden.");
}

function renderSavedView() {
  const title = $("#saved-title");
  const eyebrow = $("#saved-eyebrow");
  const clearButton = $("#clear-filter");
  let list = places;
  let empty = "Noch keine Orte gespeichert. Leg deinen ersten mit „＋ Ort speichern“ an.";

  if (activeCategory) {
    list = places.filter((place) => place.category === activeCategory);
    title.textContent = activeCategory;
    eyebrow.textContent = "KATEGORIE";
    empty = "In dieser Kategorie ist noch nichts gespeichert.";
  } else if (activeTrip) {
    const trip = trips.find((t) => t.id === activeTrip);
    list = trip ? places.filter((place) => trip.placeIds.includes(place.id)) : [];
    title.textContent = trip ? trip.name : "Liste";
    eyebrow.textContent = "REISE-LISTE";
    empty = "Diese Liste ist noch leer.";
  } else {
    title.textContent = "Alle gespeicherten Orte";
    eyebrow.textContent = "DEINE ORTE";
  }

  const categoryFilter = $("#filter-category")?.value || "";
  const statusFilter = $("#filter-status")?.value || "";
  const favoritesOnly = $("#filter-favorites")?.checked || false;
  const sort = $("#sort-places")?.value || "recent";
  if (categoryFilter) list = list.filter((place) => place.category === categoryFilter);
  if (statusFilter) list = list.filter((place) => (place.visitStatus || "wishlist") === statusFilter);
  if (favoritesOnly) list = list.filter((place) => place.favorite);
  list = [...list].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "de");
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
  const destination =
    place.latitude && place.longitude ? place.latitude + "," + place.longitude : place.address || place.name;
  const mapsUrl =
    place.mapsUrl || "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(destination);

  openModal(
    `<div class="modal detail-modal">
      <button class="close" type="button" aria-label="Schließen">×</button>
      <div class="detail-hero" aria-hidden="true">${
        place.photoUrl ? `<img src="${esc(place.photoUrl)}" alt="" />` : iconFor(place.category)
      }</div>
      <span class="status ${place.open ? "" : "closed"}">${place.open ? "● Jetzt geöffnet" : "● Geschlossen"}</span>
      <h2>${esc(place.name)}</h2>
      <p class="address">${esc(place.address)}</p>
      ${
        place.rating
          ? `<div class="rating">★ ${esc(place.rating)} ${
              place.userRatingCount ? `(${esc(place.userRatingCount)} Bewertungen)` : ""
            } <span>· ${esc(place.category)}</span></div>`
          : ""
      }
      <div class="detail-info">
        <div><small>ÖFFNUNGSZEITEN</small><strong>${esc(place.hours) || "—"}</strong></div>
        <div><small>STATUS</small><strong>${esc(VISIT_STATUS[place.visitStatus] || "Möchte ich besuchen")}</strong></div>
        <div><small>EIGENE BEWERTUNG</small><strong>${place.ownRating ? "★ " + esc(place.ownRating) : "—"}</strong></div>
        <div><small>PREIS</small><strong>${esc(String(place.priceLevel || "—").replaceAll("PRICE_LEVEL_", ""))}</strong></div>
      </div>
      ${
        memberships.length
          ? `<p class="membership">Auf ${memberships.length === 1 ? "der Liste" : "den Listen"}:
             ${memberships.map((trip) => esc(trip.emoji + " " + trip.name)).join(", ")}</p>`
          : ""
      }
      <label for="note">DEINE NOTIZEN</label>
      <textarea id="note" rows="3">${esc(place.note)}</textarea>
      <div class="actions">
        <button class="secondary edit" type="button">Bearbeiten</button>
        <button class="secondary share" type="button">Teilen</button>
        <button class="primary route" type="button">↗ Route starten</button>
      </div>
      <div class="quick-actions">
        ${place.phone ? `<a class="quick-link" href="tel:${esc(place.phone)}">☎ Anrufen</a>` : ""}
        ${
          place.website
            ? `<a class="quick-link" href="${esc(place.website)}" target="_blank" rel="noopener noreferrer">↗ Website</a>`
            : ""
        }
        <button class="delete" type="button">🗑 Löschen</button>
      </div>
    </div>`,
    "Details zu " + place.name,
  );

  const root = $("#modal-root");
  const noteField = $("#note", root);

  $(".close", root).onclick = closeModal;

  // Notiz automatisch sichern, sobald das Feld verlassen wird.
  noteField.onblur = () => {
    if (noteField.value === place.note) return;
    place.note = noteField.value;
    savePlaces();
    announce("Notiz gespeichert.");
  };

  $(".route", root).onclick = () => {
    noteField.blur();
    window.open(mapsUrl, "_blank", "noopener");
  };

  $(".share", root).onclick = async () => {
    const shareData = { title: place.name, text: place.name + " — " + place.address, url: place.mapsUrl || mapsUrl };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard?.writeText(shareData.text + " / " + shareData.url);
        announce("Ort-Link kopiert.");
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
    if (!confirm("Möchtest du " + place.name + " wirklich löschen?")) return;
    places = places.filter((item) => item.id !== id);
    trips.forEach((trip) => {
      trip.placeIds = trip.placeIds.filter((pid) => pid !== id);
    });
    savePlaces();
    saveTrips();
    closeModal();
    render();
    announce(place.name + " wurde gelöscht.");
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
      <button class="close" type="button" aria-label="Schließen">×</button>
      <h2>${isNew ? "Ort speichern" : "Ort bearbeiten"}</h2>
      <form id="place-form" novalidate>
        <div class="field">
          <label for="f-name">NAME</label>
          <input id="f-name" name="name" type="text" required autofocus value="${esc(place.name)}" />
        </div>
        <div class="field">
          <label for="f-address">ADRESSE</label>
          <input id="f-address" name="address" type="text" value="${esc(place.address)}" />
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-category">KATEGORIE</label>
            <select id="f-category" name="category">
              ${CATEGORIES.map(
                (category) =>
                  `<option value="${esc(category.name)}" ${category.name === place.category ? "selected" : ""}>${esc(
                    category.name,
                  )}</option>`,
              ).join("")}
            </select>
          </div>
          <div class="field">
            <label for="f-rating">BEWERTUNG</label>
            <input id="f-rating" name="rating" type="number" min="0" max="5" step="0.1"
              placeholder="4.5" value="${esc(place.rating)}" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-own-rating">EIGENE BEWERTUNG</label>
            <input id="f-own-rating" name="ownRating" type="number" min="0" max="5" step="0.5"
              placeholder="5" value="${esc(place.ownRating)}" />
          </div>
          <div class="field">
            <label for="f-visit-date">BESUCHSDATUM</label>
            <input id="f-visit-date" name="visitDate" type="date" value="${esc(place.visitDate)}" />
          </div>
        </div>
        <div class="field">
          <label for="f-visit-status">BESUCHSSTATUS</label>
          <select id="f-visit-status" name="visitStatus">
            <option value="wishlist" ${place.visitStatus === "wishlist" || !place.visitStatus ? "selected" : ""}>Möchte ich besuchen</option>
            <option value="planned" ${place.visitStatus === "planned" ? "selected" : ""}>Geplant</option>
            <option value="visited" ${place.visitStatus === "visited" ? "selected" : ""}>Besucht</option>
          </select>
        </div>
        <div class="field">
          <label for="f-hours">ÖFFNUNGSZEITEN</label>
          <input id="f-hours" name="hours" type="text" placeholder="Heute 09:00 – 18:00" value="${esc(place.hours)}" />
        </div>
        <div class="field-row">
          <div class="field">
            <label for="f-phone">TELEFON</label>
            <input id="f-phone" name="phone" type="tel" value="${esc(place.phone)}" />
          </div>
          <div class="field">
            <label for="f-website">WEBSITE</label>
            <input id="f-website" name="website" type="url" placeholder="https://" value="${esc(place.website)}" />
          </div>
        </div>
        <div class="field">
          <label for="f-note">NOTIZ</label>
          <textarea id="f-note" name="note" rows="3">${esc(place.note)}</textarea>
        </div>
        <label class="check-row">
          <input id="f-open" name="open" type="checkbox" ${place.open ? "checked" : ""} />
          <span>Aktuell geöffnet</span>
        </label>
        <label class="check-row">
          <input id="f-favorite" name="favorite" type="checkbox" ${place.favorite ? "checked" : ""} />
          <span>Als Favorit markieren</span>
        </label>
        <p class="form-error hidden" id="form-error" role="alert"></p>
        <div class="actions">
          <button class="secondary" type="button" data-cancel>Abbrechen</button>
          <button class="primary" type="submit">${isNew ? "Speichern" : "Änderungen sichern"}</button>
        </div>
      </form>
    </div>`,
    isNew ? "Neuen Ort speichern" : "Ort bearbeiten",
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
      error.textContent = "Bitte gib einen Namen ein.";
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
        announce(name + " ist bereits gespeichert.");
        return;
      }
      places.push(record);
    }
    else places = places.map((item) => (item.id === record.id ? record : item));

    savePlaces();
    closeModal();
    render();
    announce(isNew ? name + " wurde gespeichert." : "Änderungen an " + name + " gesichert.");
  };
}

/* ---------------------------------------------------------- Reise-Listen */

function showTripModal(id) {
  const trip = trips.find((item) => item.id === id);
  if (!trip) return;

  openModal(
    `<div class="modal form-modal">
      <button class="close" type="button" aria-label="Schließen">×</button>
      <h2>${esc(trip.emoji)} ${esc(trip.name)}</h2>
      <div class="field">
        <label for="t-name">NAME DER LISTE</label>
        <input id="t-name" type="text" autofocus value="${esc(trip.name)}" />
      </div>
      <div class="field">
        <span class="field-label">SYMBOL</span>
        <div class="emoji-row" role="group" aria-label="Symbol wählen">
          ${TRIP_EMOJIS.map(
            (emoji) =>
              `<button type="button" class="emoji-btn ${emoji === trip.emoji ? "selected" : ""}"
                data-emoji="${esc(emoji)}" aria-pressed="${emoji === trip.emoji}">${esc(emoji)}</button>`,
          ).join("")}
        </div>
      </div>
      <div class="field">
        <span class="field-label">ORTE IN DIESER LISTE</span>
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
              : '<p class="muted-note">Du hast noch keine Orte gespeichert.</p>'
          }
        </div>
      </div>
      <div class="actions">
        <button class="danger" type="button" data-delete>Liste löschen</button>
        <button class="primary" type="button" data-save>Speichern</button>
      </div>
    </div>`,
    "Liste " + trip.name,
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
    announce("Liste " + trip.name + " gespeichert.");
  };

  $("[data-delete]", root).onclick = () => {
    if (!confirm("Liste „" + trip.name + "“ wirklich löschen? Die Orte selbst bleiben erhalten.")) return;
    trips = trips.filter((item) => item.id !== id);
    saveTrips();
    closeModal();
    if (activeTrip === id) showView("trips");
    else renderTrips();
    announce("Liste gelöscht.");
  };
}

function createTrip() {
  const trip = { id: uid("t_"), name: "Neue Liste", emoji: TRIP_EMOJIS[0], placeIds: [] };
  trips.push(trip);
  saveTrips();
  renderTrips();
  showTripModal(trip.id);
}

/* -------------------------------------------------------------------- Suche */

function inferCategory(types = [], query = "") {
  const values = new Set(types);
  const text = query.toLowerCase();
  if (values.has("hotel") || values.has("lodging") || /hotel|unterkunft|pension/.test(text)) return "Hotels";
  if (values.has("restaurant") || values.has("meal_takeaway") || /restaurant|essen|food/.test(text)) {
    return "Restaurants";
  }
  if (values.has("cafe") || /café|cafe|kaffee/.test(text)) return "Cafés";
  if (values.has("museum") || values.has("art_gallery") || /museum|galerie/.test(text)) return "Museen";
  if (values.has("gym") || values.has("stadium") || values.has("sports_complex") || /sport|fitness/.test(text)) {
    return "Sport";
  }
  if (values.has("event_venue") || /event|veranstaltung|konzert/.test(text)) return "Events";
  return "Sehenswürdigkeiten";
}

function loadGooglePlaces() {
  const key = readSetting("g04-google-key", "").trim();
  if (!key) return Promise.reject(new Error("missing-key"));
  if (window.google?.maps?.importLibrary) return window.google.maps.importLibrary("places");
  if (googleLoaderPromise) return googleLoaderPromise;

  googleLoaderPromise = new Promise((resolve, reject) => {
    const callback = "__g04GooglePlacesReady";
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
      "&loading=async&libraries=places&v=weekly&language=de&region=DE&callback=" +
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
  $("#search-results-title").textContent = results.length + " Ergebnisse für „" + query.trim() + "“";
  list.innerHTML = results.length
    ? results
        .map((place) => {
          const distance = distanceKm(place);
          return `<article class="map-result-card">
            ${
              place.photoUrl
                ? `<img src="${esc(place.photoUrl)}" alt="Foto von ${esc(place.name)}" loading="lazy" />`
                : `<div class="map-result-placeholder">${iconFor(place.category)}</div>`
            }
            <div class="map-result-content">
              <span class="result-category">${esc(place.category)}</span>
              <h3>${esc(place.name)}</h3>
              <p>${esc(place.address)}</p>
              <div class="result-facts">
                ${place.rating ? `<span>★ ${esc(place.rating)} (${esc(place.userRatingCount)})</span>` : ""}
                ${place.priceLevel ? `<span>${esc(String(place.priceLevel).replaceAll("PRICE_LEVEL_", ""))}</span>` : ""}
                ${distance !== null ? `<span>${distance.toFixed(1)} km entfernt</span>` : ""}
                ${place.hours ? `<span>${esc(place.hours)}</span>` : ""}
              </div>
              <div class="result-actions">
                <button class="primary" type="button" data-google-place="${esc(place.id)}">＋ Speichern</button>
                <a class="secondary" data-map-link href="${esc(
                  place.mapsUrl ||
                    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.name + " " + place.address),
                )}" target="_blank" rel="noopener noreferrer">↗ Navigation</a>
              </div>
            </div>
          </article>`;
        })
        .join("")
    : '<div class="empty">Keine passenden Orte gefunden.</div>';

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
    $("#places-map").innerHTML = '<div class="map-unavailable">Karte momentan nicht verfügbar.</div>';
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
        <div><strong>${esc(place.name)}</strong><small>${esc(place.address)} · Gespeichert</small></div>
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
  const source = remote.length ? '<div class="search-source">Ergebnisse von Google Places</div>' : "";
  const status = message
    ? message === "missing-key"
      ? `<button class="search-message search-message-action" type="button" data-open-settings>
          Google Places ist noch nicht verbunden. <span>Settings öffnen →</span>
        </button>`
      : `<div class="search-message">${esc(message)}</div>`
    : "";
  const manual = `<div class="suggestion manual-suggestion" role="option" tabindex="0" data-new>
    <span class="suggestion-icon" aria-hidden="true">＋</span>
    <div><strong>„${esc(rawQuery.trim())}“ manuell speichern</strong><small>Eigenen Ort anlegen</small></div>
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
      language: "de",
      region: "de",
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
      results.length ? "" : "Keine passenden Orte bei Google gefunden.",
    );
  } catch (error) {
    if (version !== googleSearchVersion) return;
    const missing = error.message === "missing-key";
    renderSearchSuggestions(
      rawQuery,
      localHits,
      [],
      missing ? "missing-key" : "Google Places ist momentan nicht erreichbar.",
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
  const hasGoogleKey = Boolean(readSetting("g04-google-key", "").trim());
  renderSearchSuggestions(
    rawQuery,
    hits,
    [],
    hasGoogleKey ? "Suche bei Google Places …" : "missing-key",
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
  $("#greeting").textContent = clean ? "Hi, " + clean : "Hi";
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
  const formatted = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  $("#today").textContent = formatted.toUpperCase();
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
    hint.textContent = "Nur über http(s) verfügbar — nicht beim direkten Öffnen der Datei.";
    return;
  }

  const wanted = readSetting("g04-offline", "on") === "on";
  toggle.checked = wanted;

  if (wanted) {
    // Der Schalter darf nur „an“ zeigen, wenn die Registrierung wirklich klappt.
    const ok = await enableOffline();
    toggle.checked = ok;
    if (!ok) hint.textContent = "Offline-Modus ist in diesem Browser nicht verfügbar.";
  }

  toggle.onchange = async () => {
    if (toggle.checked) {
      const ok = await enableOffline();
      toggle.checked = ok;
      writeSetting("g04-offline", ok ? "on" : "off");
      hint.textContent = ok
        ? "Gespeicherte Orte offline verfügbar"
        : "Konnte nicht aktiviert werden — bitte Seite neu laden.";
    } else {
      await disableOffline();
      writeSetting("g04-offline", "off");
      hint.textContent = "Offline-Cache entfernt. Die App braucht jetzt eine Verbindung.";
    }
  };
}

function setupNotificationsToggle() {
  const toggle = $("#settings-notifications");
  const hint = $("#notifications-hint");

  if (!("Notification" in window)) {
    toggle.checked = false;
    toggle.disabled = true;
    hint.textContent = "Dieser Browser unterstützt keine Benachrichtigungen.";
    return;
  }

  const granted = Notification.permission === "granted";
  const wanted = readSetting("g04-notifications", "off") === "on";
  toggle.checked = granted && wanted;

  if (Notification.permission === "denied") {
    toggle.disabled = true;
    hint.textContent = "In den Browser-Einstellungen blockiert.";
    return;
  }

  toggle.onchange = async () => {
    if (!toggle.checked) {
      writeSetting("g04-notifications", "off");
      hint.textContent = "Tipps und Erinnerungen zu deinen Orten";
      return;
    }
    const permission = await Notification.requestPermission();
    const ok = permission === "granted";
    toggle.checked = ok;
    writeSetting("g04-notifications", ok ? "on" : "off");
    hint.textContent = ok ? "Aktiv — du bekommst Erinnerungen." : "Ohne Erlaubnis des Browsers nicht möglich.";
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
      announce("Dieser Browser unterstützt keinen Standort.");
      return;
    }
    announce("Standortfreigabe wird angefragt.");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        const query = $("#search").value.trim() || lastGoogleQuery || "Orte in meiner Nähe";
        const localHits = places.filter((place) =>
          (place.name + " " + place.address + " " + place.category).toLowerCase().includes(query.toLowerCase()),
        );
        const version = ++googleSearchVersion;
        searchGooglePlaces(query, localHits, version);
        announce("Standort verwendet — Ergebnisse werden geladen.");
      },
      () => announce("Standort nicht freigegeben. Die Suche funktioniert auch ohne Standort.")
    );
  };
  $("#search-map-area").onclick = () => {
    if (!searchMap) {
      announce("Erst eine Kartensuche starten.");
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
  $("#save-google-key").onclick = () => {
    const input = $("#settings-google-key");
    const hint = $("#google-places-hint");
    const key = input.value.trim();
    writeSetting("g04-google-key", key);
    googleLoaderPromise = null;
    const previousScript = $("#g04-google-maps-api");
    if (previousScript && !window.google?.maps?.importLibrary) previousScript.remove();
    hint.textContent = key
      ? "Verbunden — suche oben zum Beispiel nach „Hotel Bamberg“"
      : "API-Schlüssel eintragen, um Orte weltweit zu suchen";
    announce(key ? "Google Places wurde gespeichert." : "Google Places wurde getrennt.");
  };
}

function init() {
  const storedName = readSetting("g04-name", "");
  const storedGoogleKey = readSetting("g04-google-key", "");
  $("#settings-name").value = storedName;
  $("#settings-google-key").value = storedGoogleKey;
  if (storedGoogleKey) {
    $("#google-places-hint").textContent = "Verbunden — suche oben zum Beispiel nach „Hotel Bamberg“";
  }
  applyProfile(storedName);
  applyTheme(readSetting("g04-theme", "light") === "dark");
  renderToday();
  render();
  bindEvents();
  setupNotificationsToggle();
  setupOfflineToggle();
}

init();
