function mediaFactory(media){

    if(media.image !== undefined){

        return createImage(media.image, media.title);

    }

    return createVideo(media.video, media.title);

}

function createImage(imgSrc, imgAlt){

     return `<img src="assets/medias/${imgSrc}" alt="${imgAlt}"  />`;

}

function createVideo(videoSrc, videoAlt){

    return `<video>
              <source src="assets/medias/${videoSrc}" type="video/mp4" alt="${videoAlt}"></source>
            </video>
    
            `;

}