const wordForm = document.querySelector("#wordForm");
const enteredWord = document.querySelector("#enteredWord");

wordForm.addEventListener("submit", function (e) {
  e.preventDefault();
  enteredWord.setCustomValidity("");
  if (/\s/.test(enteredWord.value)) {
    enteredWord.setCustomValidity("No spaces and more than one word allowed.");
    enteredWord.reportValidity();
    return;
  }

  document.querySelector("#result").style.display = "flex";
  findWordInfo();
});

enteredWord.addEventListener("input", () => {
  enteredWord.setCustomValidity("");
});

function findWordInfo() {}
