// Cette fontion affiche les medias d'un photographe
class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image = data.image;
    this._video = data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._name = data.name;
  }
  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerID;
  }

  get title() {
    return this._title;
  }

  get image() {
    return `assets/photographers/${this.name}/${this._image}`;
  }
  get video() {
    return `assets/photographers/${this.name}/${this._video}`;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
  get name() {
    return this._name;
  }
}
