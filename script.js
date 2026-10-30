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
    Switzerland: { x: 0, y: 0 }
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