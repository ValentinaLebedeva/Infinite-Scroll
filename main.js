const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let uploadingImgCount = 5;
const apiKey = '3_AveFwtPxQlhqsv_g9tKaTS_5Ermor5k5mnpu5XaTk';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&uploadingImgCount=${uploadingImgCount}`;

// checking if all images were loaded
function nextImageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

        uploadingImgCount = 20;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&uploadingImgCount=${uploadingImgCount}`;
    };
};

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// creating element for links and photos, add to DOM
function displayPhotos() {
    nextImageLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // creating <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        })

        // creating <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // event listener, checking when each is finished loading
        img.addEventListener("load", nextImageLoaded);

        // putting <img> inside <a>, then into imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// getting photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error
    }
}

// chekcing to see if  scrolling near bototm of the page, load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//run the function
getPhotos();