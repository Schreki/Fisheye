class MediaFactory {
  constructor(data, type) {
    // Si le type correspond à image, alors retourne moi une image
    if (type === "image") {
      return new Image(data);
      // Sinon retourne moi une video
    } else if (type === "video") {
      return new Video(data);
      // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
    } else {
      throw "Unknown type format";
    }
  }
}
