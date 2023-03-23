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

// Cette fonction affiche les informations d'un photographe

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
  //console.log(images.image);

  // console.log(arrayOfMedias);
  for (let media of arrayOfMedias) {
    //console.log(media.image);
    const image = new MediaFactory(media, "image");
    const video = new MediaFactory(media, "video");

    image.getimage();
    //  console.log(image.getimage());
    video.getvideo();
    console.log(video.getvideo());
  }
}
