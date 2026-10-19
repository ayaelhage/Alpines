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