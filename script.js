//Hero slides
const images = [
    {
        image: "assets/IcelandLs2.jpg",
        country: "ICELAND",
        subtitle: "Where Ice Meets the Wild.",
        titleColor: "#030C26",
        subtitleColor: "#385B6B",

        description:
            "Cross black-sand coasts, glacier valleys, and quiet roads shaped by fire and frost. Iceland turns every mile into a landscape worth stopping for."
    },

    {
        image: "assets/NorwayLs3.jpg",
        country: "NORWAY",
        subtitle: "Follow the Fjords North.",
        titleColor: "#071426",
        subtitleColor: "#486E80",

        description:
            "Travel between snow-covered peaks, fishing villages, and deep blue fjords where winter feels untouched and impossibly still."
    },

    {
        image: "assets/SwissAlps4.jpg",
        country: "SWITZERLAND",
        subtitle: "Climb Into the Clouds.",
        titleColor: "#071426",
        subtitleColor: "#496C80",

        description:
            "Journey through alpine villages and towering snow-covered peaks, where crisp mountain air and warm chalets await."
    },

    {
        image: "assets/MountFuji3.jpg",
        country: "JAPAN",
        subtitle: "Winter Beneath Fuji.",
        titleColor: "#09172A",
        subtitleColor: "#915F4B",

        description:
            "Discover Japan beneath its most iconic peak, where clear winter skies, quiet lakes, and snow-covered towns frame the journey."
    },

    {
        image: "assets/Finland.jpg",
        country: "FINLAND",
        subtitle: "Find Silence in the North.",
        titleColor: "#071426",
        subtitleColor: "#51758A",

        description:
            "Wander through snow-covered forests and open Arctic landscapes, where Finland's winter feels peaceful, remote, and endless."
    }
];

// Preload hero images
images.forEach(slide => {
    const img = new Image();
    img.src = slide.image;
});


// Current slide
let currentIndex = 0;


// Elements
const jumbotron = document.querySelector(".jumbotron");
const heading = document.querySelector("#jumbotron-text");
const description = document.querySelector("#jumbotron-desc");
const forwardIcon = document.querySelector("#forward");
const backIcon = document.querySelector("#back");
const subtitle = document.querySelector("#jumbotron-subtitle");

// Change hero content
function changeContent(direction) {

    currentIndex += direction;

    // Go back to first slide
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // Go to final slide
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    const currentSlide = images[currentIndex];

    // Change background
    jumbotron.style.backgroundImage =
        `url("${currentSlide.image}")`;

    // Change country name
    heading.textContent = currentSlide.country;

    // Change country color
    heading.style.color = currentSlide.titleColor;

    // Change subtitle
    subtitle.textContent = currentSlide.subtitle;

    // Change subtitle color
    subtitle.style.color = currentSlide.subtitleColor;

    // Change description
    description.textContent = currentSlide.description;
}

// Next slide
forwardIcon.addEventListener("click", () => {
    changeContent(1);
});


// Previous slide
backIcon.addEventListener("click", () => {
    changeContent(-1);
});


// Load Iceland immediately
changeContent(0);

// World Map

const worldMap = document.querySelector("#world-map");
const destinationLinks = document.querySelectorAll(".destination-link");

const destinations = [
    "Finland",
    "Iceland",
    "Japan",
    "Norway",
    "Switzerland"
];

let selectedCountry = "Iceland";
let svgDocument;


// Select a country
function selectCountry(country) {

    selectedCountry = country;
    updateTicket(country);
    console.log("Selected:", selectedCountry);

    // Update map colours

    destinations.forEach(destination => {

        const countryParts =
            svgDocument.querySelectorAll(
                `[name="${destination}"], .${destination}`
            );


        countryParts.forEach(part => {

            if (destination === selectedCountry) {

                // Selected country stays red
                part.style.fill = "#C64646";

            } else {

                // Other countries return to original colour
                part.style.fill = part.dataset.originalFill;

            }

        });

        const ticket = document.querySelector(".destination-ticket");
        ticket.classList.remove("ticket-swap");
        void ticket.offsetWidth; // restarts the animation
        ticket.classList.add("ticket-swap");

    });

    // Update country list

    destinationLinks.forEach(link => {

        const buttonCountry = link.dataset.country;

        if (buttonCountry === selectedCountry) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}

// LOAD SVG MAP

worldMap.addEventListener("load", () => {

    svgDocument = worldMap.contentDocument;

    //Pins
    const pinOffsets = {
    Finland: { x: 3, y: 6},
    Iceland: { x: 0, y: 2 },
    Japan: { x: 3, y: 0 },
    Norway: { x: -40, y: 10 },
    Switzerland: { x: 0, y: -2 }
    };

    function addCountryPin(country) {

    const countryParts =
        svgDocument.querySelectorAll(
            `[name="${country}"], .${country}`
        );

    if (countryParts.length === 0) {
        return;
    }

    let mainPart = countryParts[0];
    let largestArea = 0;

    countryParts.forEach(part => {

        const box = part.getBBox();
        const area = box.width * box.height;

        if (area > largestArea) {
            largestArea = area;
            mainPart = part;
        }

    });


    const box = mainPart.getBBox();

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    const offset = pinOffsets[country] || { x: 0, y: 0 };

    const pin = svgDocument.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
    );

    const pinSize = 28;

    pin.setAttribute("width", pinSize);
    pin.setAttribute("height", pinSize);

    // Bottom point of pin lands around country centre
    pin.setAttribute(
    "x",
    centerX - pinSize / 2 + offset.x
   );

   pin.setAttribute(
    "y",
    centerY - pinSize + offset.y
    );


    // pin.svg is inside assets with world.svg
    const pinUrl =
        new URL("assets/pin.svg", document.baseURI).href;

    pin.setAttribute("href", pinUrl);

    pin.classList.add("map-pin");

    pin.style.cursor = "pointer";


    // Pin also selects the country
    pin.addEventListener("click", () => {
        selectCountry(country);
    });


    svgDocument.documentElement.appendChild(pin);
}

    destinations.forEach(country => {

        const countryParts =
            svgDocument.querySelectorAll(
                `[name="${country}"], .${country}`
            );


        countryParts.forEach(part => {

            // Remember original map colour
            part.dataset.originalFill =
                getComputedStyle(part).fill;


            // Show that this country is clickable
            part.style.cursor = "pointer";


            // Select country when map is clicked
            part.addEventListener("click", () => {

                selectCountry(country);

            });

        });

    });

    destinations.forEach(country => {
    addCountryPin(country);
});

    selectCountry("Iceland");

});

// country list buttons

destinationLinks.forEach(link => {

    link.addEventListener("click", () => {

        const country = link.dataset.country;

        selectCountry(country);

    });

});

// Destination Data
const destinationData = {
Finland:     { number: "01", destination: "FINLAND",     code: "HEL", coordinates: "61.9241° N, 25.7482° E", season: "December", expect: "Northern Lights" },
Iceland:     { number: "02", destination: "ICELAND",     code: "KEF", coordinates: "64.9631° N, 19.0208° W", season: "November", expect: "Glaciers & Aurora" },
Japan:       { number: "03", destination: "JAPAN",       code: "HND", coordinates: "36.2048° N, 138.2529° E", season: "January", expect: "Snow Towns & Onsen" },
Norway:      { number: "04", destination: "NORWAY",      code: "OSL", coordinates: "60.4720° N, 8.4689° E", season: "December", expect: "Fjords & Aurora" },
Switzerland: { number: "05", destination: "SWITZERLAND", code: "ZRH", coordinates: "46.8182° N, 8.2275° E", season: "February", expect: "Alpine Skiing" }
};

function updateTicket(country) {
  const data = destinationData[country];

  if (!data) {
    console.error(`No ticket found for country: ${country}`);
    return;
  }

  document.querySelector("#ticket-number").textContent = data.number;
  document.querySelector("#ticket-country").textContent = data.destination;
  document.querySelector("#ticket-coordinates").textContent = data.coordinates;
  document.querySelector("#ticket-season").textContent = data.season;
  document.querySelector("#ticket-expect").textContent = data.expect;
  document.querySelector("#ticket-flag").src =
    `assets/${country.toLowerCase()}-flag.svg`;
  document.querySelector("#ticket-flag").alt = `${country} flag`;
  document.querySelector("#ticket-code").textContent = data.code;
}

// =========================================================
// PACKAGES CAROUSEL
// =========================================================

const packages = [
    {
        id: 1,
        number: "01",
        country: "Finland",
        title: "Lapland Aurora Cabin",
        location: "Rovaniemi, Lapland",
        nights: 3,
        price: 450,
        food: true,
        tags: ["aurora", "cabins"],
        image: "assets/aurora.jpg",
        blurb: "A glass-roof cabin, husky safari and three nights under the northern lights."
    },
    {
        id: 2,
        number: "02",
        country: "Iceland",
        title: "Höfn Glacier Escape",
        location: "Höfn, South Iceland",
        nights: 3,
        price: 300,
        food: true,
        tags: ["glaciers", "aurora"],
        image: "assets/glacier.jpg",
        blurb: "Icebergs at Jökulsárlón, a lobster dinner and a hotel facing Vatnajökull."
    },
    {
        id: 3,
        number: "03",
        country: "Japan",
        title: "Fuji Onsen Retreat",
        location: "Lake Kawaguchi",
        nights: 4,
        price: 690,
        food: true,
        tags: ["hot-springs"],
        image: "assets/snowytown.jpg",
        blurb: "Soak in a private onsen with Mount Fuji in view and wander snowy lakeside towns."
    },
    {
        id: 4,
        number: "04",
        country: "Norway",
        title: "Lofoten Fjord Escape",
        location: "Lofoten Islands",
        nights: 4,
        price: 520,
        food: false,
        tags: ["fjords", "cabins", "aurora"],
        image: "assets/cabin.jpg",
        blurb: "Red fishing cabins, fjord cruises and aurora nights above the Arctic Circle."
    },
    {
        id: 5,
        number: "05",
        country: "Switzerland",
        title: "Alpine Ski Week",
        location: "Zermatt, Valais",
        nights: 5,
        price: 780,
        food: false,
        tags: ["skiing", "cabins"],
        image: "assets/ski.jpg",
        blurb: "Ski passes, a chalet below the Matterhorn and a lesson for every level."
    }
];


const packageTrack = document.querySelector("#package-track");

const total = packages.length;

// Endless loop
// jump is invisible.
const COPIES = 3;

let activePackage = total + 1; // middle copy, starting on Iceland


// Build the cards
function buildPackageCards() {

    let html = "";

    for (let copy = 0; copy < COPIES; copy++) {

        const isMiddle = copy === 1;

        packages.forEach((pkg, index) => {

            const globalIndex = copy * total + index;

            html += `
        <article class="package-card" data-index="${globalIndex}"
                 ${isMiddle
                     ? `tabindex="0" aria-label="${pkg.title}, ${pkg.location}"`
                     : `aria-hidden="true"`}>

            <img class="package-photo" src="${pkg.image}" alt="" decoding="async">

            <div class="package-top">
                <span class="package-num">${pkg.number}</span>
                <span class="package-price">From ${pkg.price}€</span>
            </div>

            <div class="package-info">

                <p class="package-country">
                    <img src="assets/${pkg.country.toLowerCase()}-flag.svg" alt="">
                    ${pkg.country}
                </p>

                <h3 class="package-name">${pkg.title}</h3>
                <p class="package-place">${pkg.location}</p>

                <div class="package-meta">
                    <span>${pkg.nights} nights</span>
                    <span>${pkg.food ? "Food included" : "Food not included"}</span>
                </div>

                <p class="package-blurb">${pkg.blurb}</p>

                <a class="package-link" href="packages.html?id=${pkg.id}"
                   ${isMiddle ? "" : 'tabindex="-1"'}>
                    View package <span aria-hidden="true">→</span>
                </a>

            </div>

        </article>`;
        });
    }

    packageTrack.innerHTML = html;
}


// Center the active card and style the rest
function updateCarousel(animate = true) {

    const cards = packageTrack.querySelectorAll(".package-card");
    const card = cards[activePackage];

    if (!animate) {
        packageTrack.classList.add("no-anim");
    }

    // distance from the track's left edge to the card's centre
    const cardCentre = card.offsetLeft + card.offsetWidth / 2;
    const viewportCentre = packageTrack.parentElement.offsetWidth / 2;

    packageTrack.style.transform =
        `translateX(${viewportCentre - cardCentre}px)`;

    cards.forEach((c, i) => {
        c.classList.toggle("is-active", i === activePackage);
    });

    // light up the banner icons that belong to the active card
    const lit = packages[activePackage % total].tags;

    document.querySelectorAll(".package-cat").forEach(cat => {
        cat.classList.toggle("is-lit", lit.includes(cat.dataset.category));
    });

    if (!animate) {
        // force the browser to apply the change, then turn animation back on
        void packageTrack.offsetWidth;
        packageTrack.classList.remove("no-anim");
    }
}


function goToPackage(index) {

    activePackage = Math.max(0, Math.min(total * COPIES - 1, index));
    updateCarousel();
}


// After a slide: if we are on an outer copy, jump back to the middle one
packageTrack.addEventListener("transitionend", event => {

    if (event.target !== packageTrack || event.propertyName !== "transform") {
        return;
    }

    if (activePackage < total || activePackage >= total * 2) {
        activePackage = (activePackage % total) + total;
        updateCarousel(false);
    }
});


buildPackageCards();
updateCarousel(false);


// Click a side card to bring it forward
packageTrack.addEventListener("click", event => {

    const card = event.target.closest(".package-card");

    if (card && !card.classList.contains("is-active")) {
        event.preventDefault();
        goToPackage(Number(card.dataset.index));
    }
});


// Keyboard: Enter on a side card, arrows anywhere in the carousel
packageTrack.addEventListener("keydown", event => {

    const card = event.target.closest(".package-card");

    if (event.key === "Enter" && card && !card.classList.contains("is-active")) {
        goToPackage(Number(card.dataset.index));
    }

    if (event.key === "ArrowRight") goToPackage(activePackage + 1);
    if (event.key === "ArrowLeft") goToPackage(activePackage - 1);
});


// Swipe on touch screens
let swipeStartX = null;

packageTrack.addEventListener("pointerdown", event => {
    swipeStartX = event.clientX;
});

packageTrack.addEventListener("pointerup", event => {

    if (swipeStartX === null) return;

    const distance = event.clientX - swipeStartX;
    swipeStartX = null;

    if (Math.abs(distance) > 50) {
        goToPackage(activePackage + (distance < 0 ? 1 : -1));
    }
});


// Keep the active card centred when the window changes size
window.addEventListener("resize", () => updateCarousel(false));

// Re-centre once the fonts and images have loaded
window.addEventListener("load", () => updateCarousel(false));


// =========================================================
// NUMBERS STRIP: count up when it scrolls into view
// =========================================================

const statCounters = document.querySelectorAll("[data-count]");

function countUp(element) {

    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function step(now) {

        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

if ("IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    const statsObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });

    }, { threshold: 0.6 });

    statCounters.forEach(counter => statsObserver.observe(counter));
}