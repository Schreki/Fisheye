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
  renderDropdown();
  displayPhotographerInfos(photographerInfos);
  displayPhotograherMedias(photographerMedias);
  displayPhotographerLike();
  displayPhotographerPrice(photographerInfos.price);
  addEventListeners();
  loadLightbox(photographerMedias);
  triMedias(photographerMedias);
});

/**
 * Fonction qui recupere les informations d'un photographe
 * @param {*} photographerId
 * @param {*} arrayOfPhotographers
 * @returns
 */
function getPhotographerInfos(photographerId, arrayOfPhotographers) {
  return arrayOfPhotographers.find((photographerInfos) => {
    return Number(photographerId) === Number(photographerInfos.id);
  });
}

/**
 * Fonction qui recupere les medias d'un photographe
 * @param {*} photographerId
 * @param {*} arrayOfPhotographersMedias
 * @returns
 */
function getPhotographerMedias(photographerId, arrayOfPhotographersMedias) {
  return arrayOfPhotographersMedias.filter((photographerMedias) => {
    return Number(photographerId) === Number(photographerMedias.photographerId);
  });
}

/**
 * Fonction qui affiche les informations d'un photographe
 * @param {*} photographerInfos
 */
function displayPhotographerInfos(photographerInfos) {
  const html = `     
    <article class="photographer-header-item">
      <div class="photographer-profile">
        <h1 id="name">${photographerInfos.name}</h1>
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

/**
 * Fonction qui affiche les medias d'un photographe
 * @param {*} arrayOfMedias
 */
function displayPhotograherMedias(arrayOfMedias) {
  let mediasHTML = "";

  arrayOfMedias.forEach((media) => {
    mediasHTML += `          
            ${mediaFactory(media)}
          `;
  });

  document.querySelector(".photograph-media").innerHTML = mediasHTML;
}

/**
 * Fonction qui affiche le nombre de like total d'un photographe
 */
function displayPhotographerLike() {
  const mediaLikeCount = document.querySelectorAll(".media-like-count");
  let totalMediaLikeCount = 0;

  mediaLikeCount.forEach((media) => {
    totalMediaLikeCount += Number(media.textContent);
  });
  let likeHtml = `    
        <span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        <i class="fa-solid fa-heart"></i>
    `;
  document.querySelector(".footer-container").innerHTML = likeHtml;
}

/**
 * Fonction qui affiche le prix d'un photographe
 * @param {*} price
 */
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

/**
 * Fonction qui réagit au clique du like
 */
function addEventListeners() {
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });
}

/**
 *  Fonction qui modifie le nombre de like
 */
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

/**
 *Fonction qui charge la lightbox et affiche l'image
 * @param {*} arrayOfMedias
 */
function loadLightbox(arrayOfMedias) {
  let images = Array.from(document.getElementsByClassName("media"));
  images = Array.from(images);

  images.forEach((image) => {
    image.addEventListener("click", function createLightbox() {
      const article = image.closest(".photograph-media-item");

      const titleMedia = article.querySelector(
        "section h2:first-child"
      ).textContent;

      let imageSrc = article.querySelector("img.media");

      let videoSrc = article.querySelector("video.media source");
      let lightboxContentHtml = "";
      if (imageSrc == null) {
        videoSrc = videoSrc.getAttribute("src");
        lightboxContentHtml = document.createElement("video");
        lightboxContentHtml.classList.add("image-visionneuse");
        lightboxContentHtml.setAttribute("controls", "");
        const source = document.createElement("source");
        source.setAttribute("alt", titleMedia);
        source.setAttribute("id", "mediaSource");
        source.src = videoSrc;
        lightboxContentHtml.appendChild(source);
      } else {
        imageSrc = imageSrc.getAttribute("src");
        lightboxContentHtml = document.createElement("img");
        lightboxContentHtml.classList.add("image-visionneuse");
        lightboxContentHtml.setAttribute("id", "mediaSource");
        lightboxContentHtml.setAttribute("alt", titleMedia);
        lightboxContentHtml.src = imageSrc;
      }
      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");
      lightbox.setAttribute("id", "lightbox");
      const contentVisionneuse = document.createElement("div");
      contentVisionneuse.classList.add("content-visionneuse");
      const column1 = document.createElement("div");
      const column2 = document.createElement("div");
      const column3 = document.createElement("div");
      column1.classList.add("column-visionneuse");
      column2.classList.add("column-visionneuse");
      column3.classList.add("column-visionneuse");
      const icone = document.createElement("i");
      icone.classList.add("fa-solid", "fa-xmark");
      icone.setAttribute("id", "close");
      icone.setAttribute("role", "button");
      icone.setAttribute("aria-label", "Cliquez pour fermer la lightbox");

      const backArrow = document.createElement("i");
      const forwardArrow = document.createElement("i");

      backArrow.classList.add("fa-solid", "fa-angle-left");
      backArrow.setAttribute("id", "beforeMedia");
      backArrow.setAttribute("role", "button");
      backArrow.setAttribute(
        "aria-label",
        "Cliquez pour afficher le média précédent"
      );
      forwardArrow.classList.add("fa-solid", "fa-angle-right");
      forwardArrow.setAttribute("id", "nextMedia");
      forwardArrow.setAttribute("role", "button");
      forwardArrow.setAttribute(
        "aria-label",
        "Cliquez pour afficher le média suivant"
      );
      const titre = document.createElement("h1");
      titre.textContent = titleMedia;
      titre.setAttribute("id", "titre");
      icone.classList.add("iconeVisionneuse");
      column2.appendChild(lightboxContentHtml);
      column2.appendChild(titre);
      column1.appendChild(backArrow);
      column3.appendChild(forwardArrow);
      column3.appendChild(icone);
      contentVisionneuse.appendChild(column1);
      contentVisionneuse.appendChild(column2);
      contentVisionneuse.appendChild(column3);
      lightbox.appendChild(contentVisionneuse);
      if (document.getElementById("lightbox") == null) {
        main.appendChild(lightbox);
      }
      closeLightbox();
      beforeMedia(arrayOfMedias);
      nextMedia(arrayOfMedias);
    });
  });
}

/**
 * Fonction qui ferme la lightbox
 */
function closeLightbox() {
  const lightbox = document.querySelector("#lightbox");
  const close = document.querySelector("#close");
  if (close) {
    close.addEventListener("click", function () {
      lightbox.remove();
    });
  }
  document.addEventListener("keydown", function () {
    if (event.keyCode === 27) {
      lightbox.remove();
    }
  });
}

/**
 * Fonction qui prend le media précédent du tableau (arrayOfMedias) sur la lightbox
 * @param {*} arrayOfMedias
 */
function beforeMedia(arrayOfMedias) {
  const beforeArrow = document.getElementById("beforeMedia");
  let title = document.getElementById("titre");
  if (beforeArrow != null) {
    beforeArrow.addEventListener("click", function () {
      beforeMediaElement(arrayOfMedias, title);
    });
  }

  document.addEventListener("keydown", function () {
    if (event.keyCode === 37) {
      beforeMediaElement(arrayOfMedias, title);
    }
  });
}

/**
 * @param {*} arrayOfMedias
 * @param {*} title
 */
function beforeMediaElement(arrayOfMedias, title) {
  let actualValue = arrayOfMedias.indexOf(
    arrayOfMedias.find((item) => item.title === title.textContent)
  );

  if (actualValue - 1 < 0) {
    actualValue = arrayOfMedias.length - 1;
  } else {
    actualValue--;
  }
  changerMedia(arrayOfMedias[actualValue], title);
}

/**
 * Fonction qui prend le media suivant du tableau (arrayOfMedias) sur la lightbox
 * @param {*} arrayOfMedias
 */
function nextMedia(arrayOfMedias) {
  const nextArrow = document.getElementById("nextMedia");
  let title = document.getElementById("titre");
  if (nextArrow != null) {
    nextArrow.addEventListener("click", function () {
      nextMediaElement(arrayOfMedias, title);
    });
  }

  // Naviation par touche clavier
  document.addEventListener("keydown", function () {
    if (event.keyCode === 39) {
      nextMediaElement(arrayOfMedias, title);
    }
  });
}

/**
 *
 * @param {*} arrayOfMedias
 * @param {*} title
 */
function nextMediaElement(arrayOfMedias, title) {
  let actualValue = arrayOfMedias.indexOf(
    arrayOfMedias.find((item) => item.title === title.textContent)
  );
  if (actualValue + 1 >= arrayOfMedias.length) {
    actualValue = 0;
  } else {
    actualValue++;
  }
  changerMedia(arrayOfMedias[actualValue], title);
}

/**
 * Fonction qui permet de changer le type de média entre photo et video en navigant dans la lightbox
 * @param {*} arrayOfMedias
 * @param {*} title
 */
function changerMedia(arrayOfMedias, title) {
  title.textContent = arrayOfMedias.title;

  let media = document.querySelector(".image-visionneuse");
  let urlMedia = "assets/medias";

  if (arrayOfMedias.image == null) {
    if (media.tagName == "IMG") {
      let newMedia = document.createElement("video");
      newMedia.classList.add("image-visionneuse");
      newMedia.setAttribute("controls", "");
      const source = document.createElement("source");
      source.setAttribute("id", "mediaSource");
      source.src = urlMedia + "/" + arrayOfMedias.video;
      newMedia.appendChild(source);
      media.parentElement.replaceChild(newMedia, media);
    } else {
      const mediaSource = document.getElementById("mediaSource");
      mediaSource.src = urlMedia + "/" + arrayOfMedias.video;
    }
  } else {
    if (media.tagName == "VIDEO") {
      let newMedia = document.createElement("img");
      newMedia.classList.add("image-visionneuse");
      newMedia.setAttribute("id", "mediaSource");
      newMedia.src = urlMedia + "/" + arrayOfMedias.image;
      media.parentElement.replaceChild(newMedia, media);
    } else {
      const mediaSource = document.getElementById("mediaSource");
      mediaSource.src = urlMedia + "/" + arrayOfMedias.image;
    }
  }
}

/**
 * Création du menu de tri
 */
function renderDropdown() {
  const dropdownHtml = `
   <label for="select_filter">Trier par </label>
    <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">   
      <option class="dropdown-options" value="Popularité">Popularité</option>
      <option class="dropdown-options" value="Date">Date</option>
      <option class="dropdown-options" value="Titre">Titre</option>
    </select>
  `;
  const filter = document.querySelector(".filter");
  filter.innerHTML = dropdownHtml;
}

/**
 * Fonction qui renvoie un tableau de media avec les valeurs triées
 * @param {*} arrayOfMedias
 * @param {*} value
 * @returns
 */
function switchTri(arrayOfMedias, value) {
  switch (value) {
    case "Date":
      arrayOfMedias.sort(function (a, b) {
        //Transforme les chaînes en dates, faire une soustraction pour avoir un resultat.
        return new Date(b.date) - new Date(a.date);
      });
      return arrayOfMedias;
    case "Popularité":
      arrayOfMedias.sort(function (a, b) {
        return b.likes - a.likes;
      });
      return arrayOfMedias;
    case "Titre":
      arrayOfMedias.sort((a, b) => a.title.localeCompare(b.title));
      return arrayOfMedias;

    default:
      console.log("erreur");
      break;
  }
}

/**
 * Permet de faire le tri au click sur le select
 * @param {*} arrayOfMedias
 * @returns
 */
async function triMedias(arrayOfMedias) {
  console.log("en arrivant dans la fonction trimedia");
  console.log(arrayOfMedias);
  const selectTri = document.getElementById("dropdownMenu");
  selectTri.addEventListener("input", function () {
    let value = selectTri.value;
    console.log(value);
    arrayOfMedias = switchTri(arrayOfMedias, value);
    console.log(switchTri(arrayOfMedias, value));
    displayPhotograherMedias(arrayOfMedias);
  });
  return arrayOfMedias;
}
