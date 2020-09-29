// // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
// let vh = window.innerHeight * 0.01;
// // Then we set the value in the --vh custom property to the root of the document
// document.documentElement.style.setProperty("--vh", `${vh}px`);
// console.log("current vh is: ", vh);

const fallback = ["K5gE2m1Svtw", "nu5qOYcrF4I", "2zhhollb_ec"];
const loader = document.getElementById("loader");
const videoSection = document.getElementById("videos");

function clearVideoContainer() {
  videoSection.innerHTML = "";
}

function getVideos() {
  const limit = 25;
  const playlistId = "UUgzt1OTiHXn7R75zRsAHdLg";
  const key = "AIzaSyBYsepI94PY97zc30fuDdUJ4p-qFUE2oSw";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&playlistId=${playlistId}&key=${key}&maxResults=${limit}`;
  fetch(url)
    .then((data) => {
      if (data.ok) {
        console.log("data is ok", data.ok);
        let videos = data.json().items;
        displayVideos(videos);
      } else {
        console.log("data is NOT ok", data.ok);
        throw data;
      }
    })
    .catch((error) => {
      console.error(error);
      useFallbacks();
    });
}

function displayVideos(videos) {
  clearVideoContainer();
  addVideo(fallback[0]);
  for (let i = 0; i < videos.length; i++) {
    let id = videos[i]["contentDetails"]["videoId"];
    if (videos.length < 3) {
      addVideo(id, `e${videos.length}`);
    } else {
      addVideo(id);
    }
  }
}

function useFallbacks() {
  clearVideoContainer();
  for (let i = 0; i < fallback.length; i++) {
    let id = fallback[i];
    if (fallback.length < 3) {
      addVideo(id, `e${fallback.length}`);
    } else {
      addVideo(id);
    }
  }
}

function addVideo(id, addClass) {
  let videoContainer = document.createElement("div");
  let classesToAdd = "video-container fade mb";
  if (addClass && typeof addClass == "string") {
    classesToAdd += " " + addClass;
  }
  videoContainer.setAttribute("class", classesToAdd);
  videoContainer.innerHTML = `<iframe
                                    width="853"
                                    height="480"
                                    src="https://www.youtube.com/embed/${id}?autoplay=0&controls=1"
                                    frameborder="0"
                                    allowfullscreen
                                >
                                </iframe>`;
  videoSection.appendChild(videoContainer);
}

getVideos();
