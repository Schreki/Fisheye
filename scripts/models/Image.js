class Image {
  constructor(type) {
    this.title = type.title;
    this.image = type.image;
    this.photographerId = type.photographerId;
  }

  getimage() {
    const htmlMedia = `
     <article class="photographer-header-item">     
          <img src="assets/photographers/Mimi/${this.image}" />
     </article>
     `;
    return (document.querySelector(".photograph-media").innerHTML = htmlMedia);
  }
}
