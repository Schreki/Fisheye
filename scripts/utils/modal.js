function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

fetchData("data/photographers.json").then((photographersInfos) => {
  const photographerInfos = getPhotographerInfos(
    idPhotographe,
    photographersInfos.photographers
  );
  createModal();
  namePhoto(photographerInfos);
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementsByClassName("close");
const validForm = document.querySelector(".validationForm");
const formulaire = document.getElementById("form");
const form = document.querySelector("#loginForm");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// CLOSE MODAL FORM
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function createModal() {
  const htmlModal = `
  
  <div class="modal">
    <div class="bground">
      <div class="content">
        <div class="modal-body">
        <header>
          <h2>Contactez-moi</h2>
           <br />
           <img
              src="assets/icons/close.svg"
              onclick="closeModal()"
              alt=""
            />
          </header>
          <p class="namePhoto"></p>
          <form
            id="loginForm"
            name="reserve"
            action="index.html"
            method="get"
            onsubmit="validate();"
          >
          <div class="formData">
            <label for="first">Prénom</label><br />
             <input
                class="text-control"
                type="text"
                id="first"
                name="first"
                minlength="2"
              />
              <div id="firstText"></div>
              <br />
          </div>
          <div class="formData">
            <label for="last">Nom</label><br />
            <input
              class="text-control"
              type="text"
              id="last"
              name="last"
          />
            <div id="lastText"></div>
            <br />
          </div>
           <div class="formData">
            <label for="email">E-mail</label><br />
            <input
              class="text-control"
              type="email"
              id="email"
              name="email"
            />
            <div id="emailText"></div>
            <br />
            </div>
            <div class="formData">
              <label for="message">Message :</label><br />
              <div id="message">
                <input
                  class="modal-input modal-msg"
                  type="text"
                  id="message"
                  name="message"
                  minlength="10"
                  maxlength="100"
                  pattern="(?!^ +$)^.+$"
                  required=""
                />
              </div>
              <br />
            </div>
            <input
              class="btn-submit button"
              type="submit"
              value="Envoyer"
            />
          </form>
        </div>
      </div>
    </div>
  </div>  
  `;
  document.querySelector("#contact_modal").innerHTML = htmlModal;
}

function namePhoto(photographerInfos) {
  const html = ` <h2>${photographerInfos.name}</h2>`;
  document.querySelector(".namePhoto").innerHTML = html;
}

// Validation Prénom
function validPrenom() {
  let firstText = document.getElementById("firstText");
  let prenomRegExp = new RegExp(/^([A-Z][A-Za-z\é\è\ê\-]{2,})+$/i);
  if (first.value.trim().match(prenomRegExp)) {
    firstText.classList.remove("text-danger");
    firstText.classList.add("text-succes");
    first.classList.remove("border-danger");
    first.classList.add("border-succes");
    firstText.innerHTML = "";
    return true;
  } else {
    firstText.innerHTML = "Veuillez saisir 2 caractère minimum";
    firstText.classList.remove("text-succes");
    firstText.classList.add("text-danger");
    first.classList.remove("border-succes");
    first.classList.add("border-danger");
    return false;
  }
}

// Validation Nom
function validNom() {
  let nomRegExp = new RegExp(/^([A-Z][A-Za-z\é\è\ê\-]{2,})+$/i);
  let lastText = document.getElementById("lastText");
  if (last.value.trim().match(nomRegExp)) {
    lastText.classList.remove("text-danger");
    lastText.classList.add("text-succes");
    last.classList.remove("border-danger");
    last.classList.add("border-succes");
    lastText.innerHTML = "";
    return true;
  } else {
    lastText.innerHTML = "Veuillez saisir 2 caractère minimum";
    lastText.classList.remove("text-succes");
    lastText.classList.add("text-danger");
    last.classList.remove("border-succes");
    last.classList.add("border-danger");
    return false;
  }
}

//Validation Email
function validEmail() {
  let emailText = document.getElementById("emailText");
  let emailRegExp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
  );
  if (email.value.trim().match(emailRegExp)) {
    emailText.classList.remove("text-danger");
    emailText.classList.add("text-succes");
    email.classList.remove("border-danger");
    email.classList.add("border-succes");
    emailText.innerHTML = "";
    return true;
  } else {
    emailText.innerHTML = "Veuillez saisir une adresse mail valide";
    emailText.classList.remove("text-succes");
    emailText.classList.add("text-danger");
    email.classList.remove("border-succes");
    email.classList.add("border-danger");
    return false;
  }
}

function tousChampsValide() {
  validPrenom();
  validNom();
  validEmail();
}

function formValide() {
  if (validPrenom() === true && validNom() === true && validEmail() === true) {
    return true;
  }
  return false;
}

//----- BTN VALIDATION -----
function openRemerciments() {
  form.style.display = "none";
  validForm.style.display = "flex";
  validMessage.innerHTML = "Merci pour votre inscription";
}

document.querySelector(".btn-submit").addEventListener("click", (event) => {
  event.preventDefault();
  if (formValide() == true) {
    document.querySelector("form").reset();
    closeModal();
  } else {
    tousChampsValide();
  }
});
