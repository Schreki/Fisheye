function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price } = data;

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
  const lienPhotographe = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("portrait");
    const h2 = document.createElement("h2");

    h2.textContent = name;
    h2.classList.add("name");

    const a = document.createElement("a");
    a.setAttribute("href", lienPhotographe);

    const h3 = document.createElement("h3");
    h3.textContent = city;
    h3.classList.add("location");
    const tag = document.createElement("p");
    tag.classList.add("tagline");
    tag.textContent = tagline;
    const prix = document.createElement("p");
    prix.classList.add("price");
    prix.textContent = price + "€ /jour";
    article.appendChild(img);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(a);
    article.appendChild(h3);
    article.appendChild(tag);
    article.appendChild(prix);

    return article;
  }
  return { id, name, picture, city, tagline, price, getUserCardDOM };
}
