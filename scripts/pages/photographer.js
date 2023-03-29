//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(document.location);
const searchParams = url.searchParams;
idPhotographe = searchParams.get("id");

fetchData("data/photographers.json").then((photographersInfos) => {
  const photographerInfos = getPhotographerInfos(
    idPhotographe,
    photographersInfos.photographers
  );

  const photographerMedias = getPhotographerMedias(
    idPhotographe,
    photographersInfos.media
  );
  displayPhotographerInfos(photographerInfos);
  displayPhotograherMedias(photographerMedias);
  displayPhotographerLike();
  displayPhotographerPrice(photographerInfos.price);
  addEventListeners();
});

// Fonction qui recupere les informations d'un photographe
function getPhotographerInfos(photographerId, arrayOfPhotographers) {
  return arrayOfPhotographers.find((photographerInfos) => {
    return Number(photographerId) === Number(photographerInfos.id);
  });
}

// Fonction qui recupere les medias d'un photographe
function getPhotographerMedias(photographerId, arrayOfPhotographersMedias) {
  return arrayOfPhotographersMedias.filter((photographerMedias) => {
    return Number(photographerId) === Number(photographerMedias.photographerId);
  });
}

// Fonction qui affiche les informations d'un photographe
function displayPhotographerInfos(photographerInfos) {
  const html = `
     
          <article class="photographer-header-item">
            <div class="photographer-profile">
              <h1>${photographerInfos.name}</h1>
              <h3>${photographerInfos.city}, ${photographerInfos.country}</h3>
                <p>${photographerInfos.tagline}</p>
            </div>
          </article>
          <article class="photographer-header-item">          
            <button class="contact_button photographer-header-item" onclick="displayModal()">Contactez-moi</button>
          </article>
          <article class="photographer-header-item">
              <img src="assets/photographers/Photographers ID Photos/${photographerInfos.portrait}" alt="${photographerInfos.name}" />
          </article>
       `;

  document.querySelector(".photograph-header").innerHTML = html;
}

function displayPhotograherMedias(arrayOfMedias) {
  let mediasHTML = "";

  arrayOfMedias.forEach((media) => {
    mediasHTML += `          
            ${mediaFactory(media)}
          `;
  });

  document.querySelector(".photograph-media").innerHTML = mediasHTML;
}
//Fonction qui affiche le nombre de like total d'un photographe
function displayPhotographerLike() {
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  let totalMediaLikeCount = 0;

  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });
  let likeHtml = `
    
      <div class="footer-container">
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
      </div>
      <p class="price"></p>

    `;
  document.querySelector(".footer").innerHTML = likeHtml;
}
//Fonction qui affiche le prix d'un photographe
function displayPhotographerPrice(price) {
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  let totalMediaLikeCount = 0;
  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });
  let priceHtml = `  
    ${price} €/ jour
    `;
  document.querySelector(".price").innerHTML = priceHtml;
}

// Fonction qui réagit au clique du like
function addEventListeners() {
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });
}

// Fonction qui modifie le nombre de like
function renderLikes() {
  const mediaLikeSpanEl = this.parentNode.firstElementChild;
  const mediaLikeIconEl = this.firstElementChild;

  if (mediaLikeIconEl.classList.contains("fa-regular")) {
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);
    mediaLikeCount++;
    mediaLikeSpanEl.textContent = mediaLikeCount;
    displayPhotographerLike();
    mediaLikeIconEl.classList.replace("fa-regular", "fa-solid");
  } else if (mediaLikeIconEl.classList.contains("fa-solid")) {
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);
    mediaLikeCount--;
    mediaLikeSpanEl.textContent = mediaLikeCount;
    displayPhotographerLike();
    mediaLikeIconEl.classList.replace("fa-solid", "fa-regular");
  }
}
