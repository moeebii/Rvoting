let currentImage = 1;
const totalImages = 10; // Total number of postcards
const imgElement = document.getElementById('postcard');
const exploreBtn = document.getElementById('explore-btn');
const exploreContainer = document.getElementById('explore-container');
const slideshow = document.querySelector('.slideshow'); // Get the slideshow container

// Create the popup container
const popup = document.createElement('div');
popup.classList.add('popup');
const popupImg = document.createElement('img');
popup.appendChild(popupImg);
document.body.appendChild(popup);

// Function to change the image
function changeImage() {
    currentImage = (currentImage % totalImages) + 1;  // Increment image, reset to 1 after 10
    imgElement.src = `PostCard${currentImage}.jpg`;
}

// Automatically change image every 1 second
let autoSlide = setInterval(changeImage, 1000);

// Add event listener for image click
imgElement.addEventListener('click', () => {
    changeImage();  // Change image on click
});

// Function to show all images in a grid format
function showExplore() {
    // Hide the slideshow
    slideshow.style.display = 'none';

    // Show the explore container and display the grid
    exploreContainer.style.display = 'grid';
    exploreContainer.innerHTML = ''; // Clear any existing content

    // Create and add images to the container
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `PostCard${i}.jpg`;
        img.alt = `Postcard ${i}`;
        img.classList.add('explore-img');
        exploreContainer.appendChild(img);

        // Add event listener to each image to open the popup
        img.addEventListener('click', () => openPopup(`PostCard${i}.jpg`));
    }

    // Change the button text to "Back"
    exploreBtn.textContent = 'Back';
    exploreBtn.removeEventListener('click', showExplore);
    exploreBtn.addEventListener('click', goBack); // Add event listener to go back
}

// Function to open the popup with the larger image
function openPopup(imageSrc) {
    popupImg.src = imageSrc; // Set the source of the larger image
    popup.style.display = 'flex'; // Show the popup
}

// Function to go back to the slideshow view
function goBack() {
    // Hide the explore container
    exploreContainer.style.display = 'none';

    // Show the slideshow again
    slideshow.style.display = 'flex';

    // Change the button text back to "Explore"
    exploreBtn.textContent = 'Explore';
    exploreBtn.removeEventListener('click', goBack);
    exploreBtn.addEventListener('click', showExplore); // Add event listener to show the grid again
}

// Add event listener to close the popup when clicked outside the image
popup.addEventListener('click', (e) => {
    if (e.target === popup) {  // Check if the click is outside the image (inside the popup background)
        popup.style.display = 'none';  // Close the popup
    }
});

// Add event listener for explore button to show the grid initially
exploreBtn.addEventListener('click', showExplore);
