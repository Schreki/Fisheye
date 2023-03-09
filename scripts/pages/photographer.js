//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(document.location);
const searchParams = url.searchParams;
idPhotographe = searchParams.get("id");


fetchData("data/photographers.json").then((photographersInfos)=>{

      const photographerInfos = getPhotographerInfos(idPhotographe, photographersInfos.photographers);

      const photographerMedias = getPhotographerMedias(idPhotographe, photographersInfos.media);

      displayPhotographerInfos(photographerInfos);

      displayPhotograherMedias(photographerMedias);


});

// Fonction qui recupere les informations d'un photographe

function getPhotographerInfos(photographerId, arrayOfPhotographers){

     return arrayOfPhotographers.find((photographerInfos)=>{

          return Number(photographerId) === Number(photographerInfos.id);

     });
   
}

// Fonction qui recupere les medias d'un photographe

function getPhotographerMedias(photographerId, arrayOfPhotographersMedias){

     return arrayOfPhotographersMedias.filter((photographerMedias)=>{

           return Number(photographerId) === Number(photographerMedias.photographerId);

     })

}


// Cette fonction affiche les informations d'un photographe

function displayPhotographerInfos(photographerInfos){

     const html = `
     
          <article class="photographer-header-item">
          
          
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


// Cette fontion affiche les medias d'un photographe

function displayPhotograherMedias(arrayOfMedias){



}

