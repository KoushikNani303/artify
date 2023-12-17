// Sample data for artworks
const artworks = [];
const categories = ['Featured', 'Modern Art', 'Classics', 'Sculptures']; // Add more categories if needed
const tags = ['abstract', 'colorful', 'modern', 'shapes', 'portrait', 'oil painting', 'historical', 'realism', 'bronze'];

// Sample data for random artist names
const artists = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Chris Brown', 'Emily Davis'];

// Generate 50 artworks with random details
for (let i = 1; i <= 50; i++) {
    const artwork = {
        id: i,
        title: `Artwork ${i}`,
        category: getRandomCategory(),
        tags: getRandomTags(),
        artist: getRandomArtist()
    };
    artworks.push(artwork);
}

document.addEventListener('DOMContentLoaded', function () {
    // Display featured artworks initially
    displayGallerySections();

    // Restore user's favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    updateFavoriteButtons(storedFavorites);

    // ... (any additional code you want to run when the page loads) ...
});

// Function to get a random category from the categories array
function getRandomCategory() {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
}

// Function to get a random set of tags from the tags array
function getRandomTags() {
    const randomTags = [];
    const numberOfTags = Math.floor(Math.random() * 3) + 1; // Random number of tags (1 to 3)
    for (let i = 0; i < numberOfTags; i++) {
        const randomIndex = Math.floor(Math.random() * tags.length);
        randomTags.push(tags[randomIndex]);
    }
    return randomTags;
}

// Function to get a random artist from the artists array
function getRandomArtist() {
    const randomIndex = Math.floor(Math.random() * artists.length);
    return artists[randomIndex];
}

document.addEventListener('DOMContentLoaded', function () {
    // Display featured artworks initially
    displayGallerySections();

    // Restore user's favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    updateFavoriteButtons(storedFavorites);

    // ... (any additional code you want to run when the page loads) ...
});

// Function to display gallery sections dynamically
function displayGallerySections() {
    const gallerySections = document.getElementById('gallery-sections');

    // Get unique categories from artworks
    const categories = [...new Set(artworks.map(artwork => artwork.category))];

    // Display gallery sections
    categories.forEach(category => {
        const gallerySection = document.createElement('div');
        gallerySection.classList.add('gallery-section');
        gallerySection.dataset.category = category;

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = category;
        gallerySection.appendChild(sectionTitle);

        const artworksInSection = artworks.filter(artwork => artwork.category === category);
        artworksInSection.forEach(artwork => {
            const artworkElement = createArtworkElement(artwork);
            gallerySection.appendChild(artworkElement);
        });

        gallerySections.appendChild(gallerySection);
    });
}

// Function to create HTML elements for an artwork
function createArtworkElement(artwork) {
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('artwork');
    artworkElement.dataset.artworkId = artwork.id;

    const imgElement = document.createElement('img');

    // Replace these placeholder URLs with actual URLs of cat and dog images from Unsplash
    if (artwork.category === 'Modern Art') {
        imgElement.src = 'https://source.unsplash.com/300x200/?cat'; // Unsplash cat image for Modern Art
    } else if (artwork.category === 'Classics') {
        imgElement.src = 'https://source.unsplash.com/300x200/?dog'; // Unsplash dog image for Classics
    } else if (artwork.category === 'Sculptures') {
        imgElement.src = 'https://source.unsplash.com/300x200/?cat'; // Unsplash cat image for Sculptures
    } else {
        // Use a default image or another placeholder for other categories
        imgElement.src = 'https://source.unsplash.com/300x200/?dog'; // Unsplash dog image for default
    }

    imgElement.alt = artwork.title;

    const titleElement = document.createElement('h3');
    titleElement.textContent = artwork.title;

    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.textContent = 'Favorite';

    artworkElement.appendChild(imgElement);
    artworkElement.appendChild(titleElement);
    artworkElement.appendChild(favoriteBtn);

    return artworkElement;
}

// Function to display detailed information about an artwork in a modal
function displayArtworkDetails(artworkId) {
    const modal = document.getElementById('artwork-details-modal');
    const titleElement = document.getElementById('modal-title');
    const artistNameElement = document.getElementById('artist-name');
    const tagsElement = document.getElementById('artwork-tags');
    const artworkImageElement = document.getElementById('artwork-image');

    const selectedArtwork = artworks.find(artwork => artwork.id == artworkId);

    titleElement.textContent = `Artwork Details - ${selectedArtwork.title}`;
    artistNameElement.textContent = selectedArtwork.artist;
    tagsElement.textContent = selectedArtwork.tags.join(', ');
    artworkImageElement.src = `https://picsum.photos/500/300?image=${artworkId}`; // Use Lorem Picsum for sample images
    artworkImageElement.alt = `Artwork ${artworkId}`;

    modal.style.display = 'flex';

    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Event listener for clicks on artworks and favorite buttons
document.addEventListener('click', function (event) {
    const artwork = event.target.closest('.artwork');
    if (artwork) {
        const artworkId = artwork.dataset.artworkId;
        displayArtworkDetails(artworkId);
    }

    const favoriteBtn = event.target.closest('.favorite-btn');
    if (favoriteBtn) {
        const artwork = favoriteBtn.closest('.artwork');
        const artworkId = artwork.dataset.artworkId;
        favoriteArtwork(artworkId);
    }
});

// Function to handle favoriting an artwork
function favoriteArtwork(artworkId) {
    // Retrieve user's favorites from local storage or initialize an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the artwork is already in favorites
    const isFavorite = favorites.includes(artworkId);

    if (!isFavorite) {
        // Add the artwork to favorites
        favorites.push(artworkId);
        // Update local storage with the new favorites
        localStorage.setItem('favorites', JSON.stringify(favorites));
        // Update favorite buttons
        updateFavoriteButtons(favorites);
        // Add your logic to visually indicate the artwork is now a favori
(`Artwork ${artworkId} is already a favorite!`);
    }
}

// Function to update the appearance of favorite buttons based on user's favorites
function updateFavoriteButtons(favorites) {
    // Update favorite buttons based on the user's favorites
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        const artwork = button.closest('.artwork');
        const artworkId = artwork.dataset.artworkId;
        const isFavorite = favorites.includes(artworkId);

        if (isFavorite) {
            // Add your logic to visually indicate that the artwork is a favorite (e.g., change button color)
            button.classList.add('favorited');
        } else {
            button.classList.remove('favorited');
        }
    });
}
