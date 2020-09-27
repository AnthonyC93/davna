// // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
// let vh = window.innerHeight * 0.01;
// // Then we set the value in the --vh custom property to the root of the document
// document.documentElement.style.setProperty("--vh", `${vh}px`);
// console.log("current vh is: ", vh);
const loader = document.getElementById("loader");
const videoSection = document.getElementById("videos");
const loaderHtml = "<img id='loader' src='./assets/icons/loader.svg' />";

function clearVideoContainer() {
  videoSection.innerHTML = "";
}
function showLoader() {
  clearVideoContainer();
  videoSection.innerHTML = loaderHtml;
}

function hideLoader() {
  loader.style.display = "none";
}

function getVideos() {
  showLoader();
  console.log("getting vids");
  let url =
    "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCgzt1OTiHXn7R75zRsAHdLg&maxResults=25&key=AIzaSyBYsepI94PY97zc30fuDdUJ4p-qFUE2oSw&type=video";
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then(displayVideos)
    .catch((error) => {
      console.error(error);
    });
}

function displayVideos(data) {
  let videos = data.items;
  let container = document.getElementById("videos");
  clearVideoContainer();

  for (let i = 0; i < videos.length; i++) {
    let videoContainer = document.createElement("div");
    let id = videos[i]["id"]["videoId"];
    videoContainer.innerHTML = `<div class="video-container fade mb">
        <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/${id}?autoplay=0&controls=1"
          frameborder="0"
          allowfullscreen
        >
        </iframe>
      </div>`;
    container.appendChild(videoContainer);
  }
  container.appendChild(loaderHtml);
}

getVideos();
