// Array to hold the background images and corresponding text colors
const images = [
    { 
        backgroundImage: 'url("/assets/Jumbotron.jpg")',
        textColor: '#030C26',  // Initial color of the text
        description: 'Indulge in the epitome of winter luxury with ALPINES. Experience the magic of snow-kissed landscapes...'
    },
    { 
        backgroundImage: 'url("/assets/jumbotron2.jpg")', 
        textColor: '#00A9D1',  // Color change for the text
        description: 'Embark on a thrilling adventure with exclusive winter packages in Iceland...'
    }
];

// Initialize current index
let currentIndex = 0;

// Select DOM elements
const jumbotron = document.querySelector('.jumbotron');
const heading = document.querySelector('#jumbotron-text');
const description = document.querySelector('#jumbotron-desc');
const forwardIcon = document.querySelector('#forward');
const backIcon = document.querySelector('#back');

// Function to change the content (image and text)
function changeContent(direction) {
    // Update index based on direction
    currentIndex += direction;

    // Loop back to the first image if moving forward past the last
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    // Loop back to the last image if moving back past the first
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    // Update the background image and text color
    jumbotron.style.backgroundImage = images[currentIndex].backgroundImage;
    heading.style.color = images[currentIndex].textColor;
    description.textContent = images[currentIndex].description;
}

// Event listeners for the icons
forwardIcon.addEventListener('click', () => {
    changeContent(1); // Move forward
});

backIcon.addEventListener('click', () => {
    changeContent(-1); // Move back
});
