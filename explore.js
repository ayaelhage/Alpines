//Departure billboard
const countries = [
    {
        id: "iceland", name: "Iceland", code: "KEF", season: "Oct – Mar", gate: "A1",
        tagline: "Glaciers, hot springs and the Northern Lights.",
        facts: [
            { label: "Winter temp", value: "-3 to 3°C" },
            { label: "Daylight", value: "4–6 hours" },
            { label: "Best for", value: "Northern Lights" }
        ],
        map: {
            center: [64.9, -18.6], zoom: 6,
            stops: [
                { name: "Reykjavík", lat: 64.1466, lng: -21.9426 },
                { name: "Þingvellir", lat: 64.2559, lng: -21.1299 },
                { name: "Geysir", lat: 64.3104, lng: -20.3024 },
                { name: "Gullfoss", lat: 64.3271, lng: -20.1199 },
                { name: "Seljalandsfoss", lat: 63.6156, lng: -19.9886 },
                { name: "Skógafoss", lat: 63.5321, lng: -19.5114 },
                { name: "Reynisfjara", lat: 63.4044, lng: -19.0715 },
                { name: "Jökulsárlón", lat: 64.0484, lng: -16.1790 }
            ]
        }
    },
    {
        id: "finland", name: "Finland", code: "HEL", season: "Nov – Mar", gate: "B2",
        tagline: "Snowy forests, husky rides and Santa's own village.",
        facts: [
            { label: "Winter temp", value: "-15 to -5°C" },
            { label: "Daylight", value: "2–4 hours" },
            { label: "Best for", value: "Huskies and Lapland" }
        ]
    },
    {
        id: "japan", name: "Japan", code: "HND", season: "Dec – Feb", gate: "C3",
        tagline: "Powder snow, hot springs and winter festivals.",
        facts: [
            { label: "Winter temp", value: "-7 to 0°C" },
            { label: "Daylight", value: "9 hours" },
            { label: "Best for", value: "Snow festivals and onsen" }
        ]
    },
    {
        id: "norway", name: "Norway", code: "OSL", season: "Nov – Mar", gate: "D4",
        tagline: "Fjords, polar nights and a sky full of aurora.",
        facts: [
            { label: "Winter temp", value: "-8 to 0°C" },
            { label: "Daylight", value: "0–4 hours" },
            { label: "Best for", value: "Aurora and fjords" }
        ]
    },
    {
        id: "switzerland", name: "Switzerland", code: "ZRH", season: "Dec – Mar", gate: "E5",
        tagline: "Alpine villages, scenic trains and Christmas markets.",
        facts: [
            { label: "Winter temp", value: "-10 to 2°C" },
            { label: "Daylight", value: "8–9 hours" },
            { label: "Best for", value: "Skiing and Christmas markets" }
        ]
    }
];

const board = document.querySelector("#board");

countries.forEach(function (country) {
    const row = document.createElement("button");
    row.className = "board-row";
    row.dataset.id = country.id;
    row.innerHTML =
        "<span>" + country.code + "</span>" +
        "<span>" + country.name + "</span>" +
        "<span>" + country.season + "</span>" +
        "<span>" + country.gate + "</span>" +
        '<span class="board-info">Gate open</span>';
    row.addEventListener("click", function () { location.hash = country.id; });
    board.appendChild(row);
});

const windowEl = document.getElementById('window');
const windowImg = document.getElementById('window-img');
const windowToggle = document.getElementById('window-toggle');
const heroRight = document.querySelector('.explore-hero-right');

function updateWindow(country) {
    // 1. open the shade for the new destination
    windowEl.classList.remove('is-closed');
    windowToggle.textContent = 'Close shade';
    windowToggle.setAttribute('aria-pressed', 'false');

    // 2. load the new photo in the background, then fade it in
    windowImg.style.opacity = 0;
    const next = new Image();
    next.onload = function () {
        windowImg.src = next.src;
        windowImg.alt = 'View from a plane window over ' + country.name;
        windowImg.style.opacity = 1;
    };
    next.src = 'assets/' + country.id + '-plane.jpg';
}

// ---------- MAP ----------
// 1. Create the map inside <div id="map">. Scroll-zoom is off so it doesn't hijack page scrolling.
const map = L.map('map', { scrollWheelZoom: false, zoomSnap: 0.25 });

// 2. The tiles (the picture of the map). Attribution is required by the free providers.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// 3. A "layer group" is a drawer that holds the markers and line,
//    so we can empty it in one go when another country is picked.
const routeLayer = L.layerGroup().addTo(map);

function updateMap(country) {
    routeLayer.clearLayers();                       // remove the old country's markers

    const stops = country.map.stops;
    const points = stops.map(function (s) { return [s.lat, s.lng]; });

    stops.forEach(function (stop, i) {              // one numbered marker per stop
        const icon = L.divIcon({
            className: 'stop-marker',               // styled in the CSS below
            html: '<span>' + (i + 1) + '</span>',
            iconSize: [34, 34]
        });
        L.marker([stop.lat, stop.lng], { icon: icon })
            .bindPopup('<strong>' + stop.name + '</strong>')   // small box when clicked
            .addTo(routeLayer);
    });

    if (points.length > 1) {
        // dashed red line through the stops, then zoom so they all fit
        L.polyline(points, { color: '#C64646', weight: 3, dashArray: '6 8' }).addTo(routeLayer);
        map.fitBounds(points, { padding: [30, 30] });
    } else {
        map.setView(country.map.center, country.map.zoom);     // no stops yet: just show the area
    }
}

function selectCountry(id) {
    document.querySelectorAll(".board-row").forEach(function (row) {
        const active = row.dataset.id === id;
        row.classList.toggle("is-active", active);
        row.querySelector(".board-info").textContent = active ? "Departing" : "Gate open";
    });

    const country = countries.find(function (c) {

        return c.id === id;
    });
    updateWindow(country);
    updateMap(country);
    document.querySelector("#country-name").textContent = country.name;
    document.querySelector("#country-tagline").textContent = country.tagline;

    const facts = document.querySelector("#country-facts");
    facts.innerHTML = "";
    country.facts.forEach(function (fact) {
        const li = document.createElement("li");
        li.innerHTML = '<span class="fact-label">' + fact.label + '</span>' +
            '<span class="fact-value">' + fact.value + '</span>';
        facts.appendChild(li);
    });
}

const clock = document.querySelector("#board-clock");
function tick() {
    clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}
tick();
setInterval(tick, 30000);

function getCountryFromUrl() {
    const id = location.hash.replace("#", "");          // "#japan" becomes "japan"
    const found = countries.find(function (c) { return c.id === id; });
    return found ? found.id : countries[0].id;          // not a real country? use the first one
}

window.addEventListener("hashchange", function () {
    selectCountry(getCountryFromUrl());
});

selectCountry(getCountryFromUrl());

document.querySelectorAll('footer a[href^="explore.html#"]').forEach(function (link) {
    link.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

windowToggle.addEventListener('click', function () {
    const closed = windowEl.classList.toggle('is-closed');   // add the class if missing, remove it if there
    windowToggle.textContent = closed ? 'Open shade' : 'Close shade';
    windowToggle.setAttribute('aria-pressed', closed);
});
//map
