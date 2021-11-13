const imgContainer = document.getElementById("imgContainer");
const loader = document.getElementById("loader");
const apiKey = "12363929-9db4aedf50ea881a1245ac8b5";
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&per_page=200`;

let imgArr = [];

// Render Photos
function renderPhotos(arr, startCount) {
  if (arr.length === startCount) return;

  for (let i = startCount; i < startCount + 20; i++) {
    const img = document.createElement("img");
    img.setAttribute("src", `${arr[i].webformatURL}`);
    img.setAttribute("alt", `${arr[i].tags}`);
    img.classList.add("js-gallery-img");

    const figure = document.createElement("figure");
    figure.classList.add("gallery-item");

    figure.appendChild(img);
    imgContainer.appendChild(figure);
  }
}

async function getPhotos() {
  loader.style.display = "block";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    imgArr = data.hits;
    renderPhotos(data.hits, 0);
  } catch (err) {
    console.log(err);
  } finally {
    loader.style.display = "none";
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    const images = document.querySelectorAll(".js-gallery-img");
    if (imgArr.length === images.length) return;
    renderPhotos(imgArr, images.length);
  }
});

// On Load
getPhotos();
