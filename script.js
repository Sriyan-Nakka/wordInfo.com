//* Form Variables
const wordForm = document.querySelector("#wordForm");
const enteredWord = document.querySelector("#enteredWord");
const includeAudio = document.querySelector("#includeAudio");

//* Results Variables
const resultWord = document.querySelector("#resultWord");
const resultPhonetic = document.querySelector("#resultPhonetic");
const definitionList = document.querySelector("#definitionList");
const synonymList = document.querySelector("#synonymList");
const antonymList = document.querySelector("#antonymList");
const wordAudio = document.querySelector("#wordAudio");

let li;
let synonym;
let antonym;

wordForm.addEventListener("submit", function (e) {
  e.preventDefault();
  enteredWord.setCustomValidity("");
  if (
    enteredWord.value.includes(" ") ||
    enteredWord.value.includes(",") ||
    enteredWord.value.includes("!") ||
    enteredWord.value.includes("@") ||
    enteredWord.value.includes("#") ||
    enteredWord.value.includes("$") ||
    enteredWord.value.includes("%") ||
    enteredWord.value.includes("^") ||
    enteredWord.value.includes("&") ||
    enteredWord.value.includes("*") ||
    enteredWord.value.includes("(") ||
    enteredWord.value.includes(")") ||
    enteredWord.value.includes("-") ||
    enteredWord.value.includes("_") ||
    enteredWord.value.includes("+") ||
    enteredWord.value.includes("=") ||
    enteredWord.value.includes("{") ||
    enteredWord.value.includes("}") ||
    enteredWord.value.includes("[") ||
    enteredWord.value.includes("]") ||
    enteredWord.value.includes("|") ||
    enteredWord.value.includes(":") ||
    enteredWord.value.includes(";") ||
    enteredWord.value.includes("'") ||
    enteredWord.value.includes("<") ||
    enteredWord.value.includes(">") ||
    enteredWord.value.includes(".") ||
    enteredWord.value.includes("?") ||
    enteredWord.value.includes("/")
  ) {
    enteredWord.setCustomValidity(
      "No spaces, numbers, special symbols and more than one word are allowed."
    );
    enteredWord.reportValidity();
    return;
  }
  console.log(includeAudio.checked);

  document.querySelector("#result").style.display = "flex";
  resultPhonetic.textContent = "";

  findWordInfo(enteredWord.value);
  if (li) definitionList.textContent = "";
  if (synonym) synonymList.textContent = "";
  if (antonym) antonymList.textContent = "";
});

enteredWord.addEventListener("input", () => {
  enteredWord.setCustomValidity("");
});

function findWordInfo(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0 && data[0].word) {
        resultWord.textContent = data[0].word.toUpperCase();

        data[0].meanings[0].definitions.forEach((definition) => {
          li = document.createElement("li");
          li.textContent = definition.definition;
          definitionList.appendChild(li);
        });

        if (includeAudio.checked) {
          document.querySelector("#audioFull").style.display = "inline-block";
          if (data[0].phonetics[0].audio) {
            wordAudio.style.display = "inline-block";
            console.log("audio: ", data[0].phonetics[0].audio);
            wordAudio.src = data[0].phonetics[0].audio;
            document.querySelector("#noAudio").style.display = "none";
          } else {
            wordAudio.style.display = "none";
            document.querySelector("#noAudio").style.display = "inline-block";
          }
        } else if (!includeAudio.checked) {
          document.querySelector("#audioFull").style.display = "none";
          wordAudio.src = "";
        }

        if (data[0].phonetics[0].text)
          resultPhonetic.textContent = data[0].phonetics[0].text;
        else resultPhonetic.textContent = data[0].phonetics[1].text;

        if (data[0].meanings[0].synonyms) {
          document.querySelector("#noSynonyms").style.display = "none";
          data[0].meanings[0].synonyms.forEach((syn) => {
            synonym = document.createElement("li");
            synonym.textContent = syn;
            synonymList.appendChild(synonym);
          });
        } else {
          document.querySelector("#noSynonyms").style.display = "inline-block";
        }
        if (data[0].meanings[0].antonyms) {
          document.querySelector("#noAntonyms").style.display = "none";
          data[0].meanings[0].antonyms.forEach((syn) => {
            antonym = document.createElement("li");
            antonym.textContent = syn;
            antonymList.appendChild(antonym);
          });
        } else {
          document.querySelector("#noSynonyms").style.display = "inline-block";
        }
      } else {
        resultWord.textContent =
          "Sorry pal, we couldn't find information for the word you were looking for.";
        resultPhonetic.textContent = data[0].phonetic;
      }
    });
}
