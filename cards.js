(function () {
  function Card(cardData, deleteTimeout) {
    const {
      proudctName,
      descripe,
      firstName,
      lastName,
      collectArea,
      phonnmbr,
      images,
      key,
    } = cardData;
    const [firstImage] = images;

    var hostElement = document.createElement("div");
    hostElement.setAttribute("class", "card");
    hostElement.setAttribute("data-key", key);

    var imgElememt = document.createElement("img");
    imgElememt.setAttribute("id", "prdcimg");
    imgElememt.setAttribute("alt", "your image");
    imgElememt.src = firstImage;

    var nameElement = document.createElement("h2");
    nameElement.setAttribute("id", "Nameofprdc");
    nameElement.setAttribute("class", "cardTitle");
    nameElement.innerText = proudctName;

    var firstNameElement = document.createElement("h6");
    firstNameElement.setAttribute("id", "firstName");
    firstNameElement.innerText = "Name: " + firstName;

    var lastNameElement = document.createElement("h6");
    lastNameElement.setAttribute("id", "lastName");
    lastNameElement.innerText = "Lastname: " + lastName;

    var areaElement = document.createElement("h6");
    areaElement.setAttribute("id", "area");
    areaElement.innerText = "Collect Destination: " + collectArea;

    var nbrElement = document.createElement("h6");
    nbrElement.setAttribute("id", "nbr");
    nbrElement.innerText = "Number: " + phonnmbr;

    var descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("id", "description");
    descriptionElement.innerText = descripe;

    function selfDestroy() {
      const deleteEvent = new Event("card-remove", { bubbles: true });
      hostElement.dispatchEvent(deleteEvent);
      hostElement.parentElement.removeChild(hostElement);
    }

    var deleteButtonElement = document.createElement("button");
    deleteButtonElement.setAttribute("id", "deleteButton");
    deleteButtonElement.addEventListener("click", selfDestroy);
    deleteButtonElement.innerText = "x";

    hostElement.appendChild(deleteButtonElement);
    hostElement.appendChild(imgElememt);
    hostElement.appendChild(nameElement);
    hostElement.appendChild(firstNameElement);
    hostElement.appendChild(lastNameElement);
    hostElement.appendChild(areaElement);
    hostElement.appendChild(nbrElement);
    hostElement.appendChild(descriptionElement);

    if (deleteTimeout && deleteTimeout > 0) {
      setTimeout(selfDestroy, deleteTimeout);
    }

    return hostElement;
  }

  window.Card = Card;
})();
