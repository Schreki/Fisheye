//let photographers = [];

const fetchphotographers = async () => {
  await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((promise) => {
      photographers = promise;
      // console.log(photographers);
    });
};
async function getPhotographers() {
  // et bien retourner le tableau photographers seulement une fois récupéré
  await fetchphotographers();

  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();

  displayData(photographers);
}

init();
