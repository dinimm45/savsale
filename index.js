/**
 * TODO
 * 1- Create the logic behind gathering the data (JS) v
 * 2- Store that Data somewhere (JS) v
 * 3- Display the data in the DOM (JS/CSS)
 *  3-1- Creating the card element (JS/CSS/HTML) v
 *  3-2- Creating the cards wrapper (HTML/CSS) v
 *  3-3- Appending cards every time data changes v
 * 4- Display Image v
 * 5- Re-arrange elements v
 * 6- Store products images on firebase storage
 *
 *  => git clone <repo_url>
 *  => git push [branch_name]
 *  => git pull
 */

var cardsData = [];
var cardImg = null;
const DEFAULT_DELETE_TIMEOUT = 0;

(function () {
  var addButton = document.getElementById("btnadd");
  var cardsArea = document.getElementById("cardarticle");

  function gatherData() {
    var proudctName = document.getElementById("productName").value;
    var descripe = document.getElementById("txtarea").value;
    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;
    var collectArea = document.getElementById("collctid").value;
    var phonnmbr = document.getElementById("phnmbr").value;
    var img = document.getElementById("productImage").files[0];

    return {
      proudctName,
      descripe,
      firstName,
      lastName,
      collectArea,
      phonnmbr,
      img: img
        ? window.URL.createObjectURL(img)
        : "https://source.unsplash.com/random",
    };
  }

  async function storeData(cardData) {
    if (!cardData) return;

    const key = await createProduct(cardData);
    cardsData.push({ ...cardData, key });
  }

  function renderCards() {
    var cardsWrapper = document.getElementById("cardarticle");
    cardsWrapper.innerHTML = "";

    for (var card of cardsData) {
      var cardElement = Card(card, DEFAULT_DELETE_TIMEOUT);

      cardsWrapper.appendChild(cardElement);
    }
  }

  function resetforrm() {
    document.getElementById("productName").value = "";
    document.getElementById("txtarea").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    var collectArea = document.getElementById("collctid");
    document.getElementById("phnmbr").value = "";

    var validChoices = ["B-2", "B-3"];
    var isRightChoiceSelected = validChoices.includes(collectArea.value);
    if (isRightChoiceSelected) {
      alert("please select right ");
    }

    collectArea.value = "";

    return;
  }

  async function handleAddButtonClick() {
    var newCard = gatherData();
    await storeData(newCard);
    renderCards();
    resetforrm();
  }

  async function start() {
    cardsData = await fetchProducts();

    renderCards();
  }

  async function handleCardRemoval(event) {
    const key = event.target.getAttribute("data-key");

    await removeProductByKey(key);
  }

  cardsArea.addEventListener("card-remove", handleCardRemoval);
  window.addEventListener("load", start);
  addButton.addEventListener("click", handleAddButtonClick);
})();
