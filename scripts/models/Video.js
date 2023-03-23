class Video {
  constructor(type) {
    this.title = type.title;
    this.video = type.video;
  }

  getvideo() {
    const htmlMedia = `
     <video width="320" height="240" controls>
      <source src=”assets/photographers/Mimi/${this.video}” type=video> 
    </video>   
     `;
    return (document.querySelector(".photograph-media").innerHTML = htmlMedia);
  }
}
