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
     <img src="assets/medias/${imgSrc}" alt="${imgAlt}" class="media">  
          <section class="media-card-info"> 
            <h2 class="media-card-title" aria-label ="${imgAlt}">${imgAlt}</h2>        
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
          </button></section>
        </div>
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
           <video  class="media">
                <source src="assets/medias/${videoSrc}" type="video/mp4" alt="${videoAlt}"></source>
            </video>   
            <section class="media-card-info"> 
            <h2 class="media-card-title">${videoAlt}</h2>
            <div class="media-like-container">
          <span class="media-like-count">${videoLikes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
          </button>          
        </div>
        </section>        
    </article>`;
}
