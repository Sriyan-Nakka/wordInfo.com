//* Form Variables
const wordForm = document.querySelector("#wordForm");
const enteredWord = document.querySelector("#enteredWord");
const includeAudio = document.querySelector("#includeAudio");

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
  findWordInfo();
});

enteredWord.addEventListener("input", () => {
  enteredWord.setCustomValidity("");
});

function findWordInfo() {}
