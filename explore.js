//Departure billboard
const countries = [
    {
        id: "iceland", name: "Iceland", code: "KEF", season: "Oct – Mar", gate: "A1",
        tagline: "Glaciers, hot springs and the Northern Lights.",
        facts: [
            { label: "Winter temp", value: "-3 to 3°C" },
            { label: "Daylight",    value: "4–6 hours" },
            { label: "Best for",    value: "Northern Lights" }
        ]
    },
    {
        id: "finland", name: "Finland", code: "HEL", season: "Nov – Mar", gate: "B2",
        tagline: "Snowy forests, husky rides and Santa's own village.",
        facts: [
            { label: "Winter temp", value: "-15 to -5°C" },
            { label: "Daylight",    value: "2–4 hours" },
            { label: "Best for",    value: "Huskies and Lapland" }
        ]
    },
    {
        id: "japan", name: "Japan", code: "HND", season: "Dec – Feb", gate: "C3",
        tagline: "Powder snow, hot springs and winter festivals.",
        facts: [
            { label: "Winter temp", value: "-7 to 0°C" },
            { label: "Daylight",    value: "9 hours" },
            { label: "Best for",    value: "Snow festivals and onsen" }
        ]
    },
    {
        id: "norway", name: "Norway", code: "OSL", season: "Nov – Mar", gate: "D4",
        tagline: "Fjords, polar nights and a sky full of aurora.",
        facts: [
            { label: "Winter temp", value: "-8 to 0°C" },
            { label: "Daylight",    value: "0–4 hours" },
            { label: "Best for",    value: "Aurora and fjords" }
        ]
    },
    {
        id: "switzerland", name: "Switzerland", code: "ZRH", season: "Dec – Mar", gate: "E5",
        tagline: "Alpine villages, scenic trains and Christmas markets.",
        facts: [
            { label: "Winter temp", value: "-10 to 2°C" },
            { label: "Daylight",    value: "8–9 hours" },
            { label: "Best for",    value: "Skiing and Christmas markets" }
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

function selectCountry(id) {
    document.querySelectorAll(".board-row").forEach(function (row) {
        const active = row.dataset.id === id;
        row.classList.toggle("is-active", active);
        row.querySelector(".board-info").textContent = active ? "Departing" : "Gate open";
    });
    
    const country = countries.find(function (c) {
        return c.id === id;
    });

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

//between board and map
