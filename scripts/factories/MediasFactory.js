/**
 *
 * @param {*} media
 * @returns
 */

function mediaFactory(media) {
  if (media.image !== undefined) {
    return createImage(media.image, media.title, media.likes, media.id);
  }
  return createVideo(media.video, media.title, media.likes, media.id);
}

/**
 *
 * @param {string} imgSrc
 * @param {string} imgAlt
 * @param {string} likes
 * @param {string} imgId
 * @returns
 */
function createImage(imgSrc, imgAlt, likes, imgId) {
  return `
  <article class="photograph-media-item" id="${imgId}">  
     <img src="assets/medias/${imgSrc}" alt="Photo de ${imgAlt}" class="media" tabindex="0">  
          <section class="media-card-info"> 
            <h2 class="media-card-title" aria-label ="Titre de l'image : ${imgAlt}" tabindex="0">${imgAlt} </h2>        
            <div class="media-like-container">
             <span class="media-like-count" tabindex="0" aria-label="nombre de like ${likes}">${likes} </span>
              <button class="media-like-button" aria-label="Bouton de likes">
                <i class="media-like-logo fa-heart fa-regular"></i>
              </button>
            </div> 
          </section>           
     </article>`;
}

/**
 *
 * @param {string} videoSrc
 * @param {string} videoAlt
 * @param {string} videoLikes
 * @param {string} videoId
 * @returns
 */
function createVideo(videoSrc, videoAlt, videoLikes, videoId) {
  return `
    <article class="photograph-media-item" id="${videoId}">
           <video class="media" tabindex="0" aria-label="Vidéo de ${videoAlt}">
                <source src="assets/medias/${videoSrc}" type="video/mp4" alt="Vidéo de ${videoAlt}"></source>
            </video>   
            <section class="media-card-info"> 
            <h2 class="media-card-title" tabindex="0" aria-label="Titre de la video : ${videoAlt}">${videoAlt} </h2>
            <div class="media-like-container">
          <span class="media-like-count" tabindex="0" aria-label="Nombre de like : ${videoLikes} ">${videoLikes} </span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
          </button>          
        </div>
        </section>        
    </article>`;
}
