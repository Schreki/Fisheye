function mediaFactory(media) {
  if (media.image !== undefined) {
    return createImage(media.image, media.title, media.likes, media.id);
  }
  return createVideo(media.video, media.title, media.likes, media.id);
}

function createImage(imgSrc, imgAlt, likes, imgId) {
  return `
  <article class="photograph-media-item" id="${imgId}">  
     <img src="assets/medias/${imgSrc}" alt="${imgAlt}" >  
          <section class="media-card-info"> 
            <h2 class="media-card-title">${imgAlt}</h2>        
        <div class="media-like-container">
          <span class="media-like-count">${likes}</span>
          <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
          </button></section>
        </div>
     </article>`;
}

function createVideo(videoSrc, videoAlt, videoLikes, videoId) {
  return `
    <article class="photograph-media-item" id="${videoId}">
           <video>
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
