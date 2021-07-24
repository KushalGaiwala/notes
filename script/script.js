const makeNote = document.querySelector(".note-points");

let noteLists = [];

pageLoad();

function pageLoad() {
  if (localStorage.getItem("lists") !== null) {
    makeNoteList();
    refreshNoteList();
  }
}

function makeNoteList() {
  if (noteLists.length === 0) {
    noteLists = JSON.parse(localStorage.getItem("lists"));
  }
  oldNote = "";
  noteLists.forEach(function (note) {
    console.log(note);
    makeNote.innerHTML = newNoteText(note) + makeNote.innerHTML;
  });
}

function insertLocalData(note) {
  noteLists.push(note);
  localStorage.setItem("lists", JSON.stringify(noteLists));
}

function newNoteText(note) {
  return (
    "<li>" +
    note +
    "<img src='./media/cancel.png' alt='delete' class='note-delete' />" +
    "</li>"
  );
}

document
  .querySelector(".take-note")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && event.target.value !== "") {
      saveNote = makeNote.innerHTML;
      newNote = newNoteText(event.target.value);
      makeNote.innerHTML = newNote + saveNote;
      insertLocalData(event.target.value);
      event.target.value = "";
      refreshNoteList();
    }
  });

function removeArrayElement(note) {
  return noteLists.splice(noteLists.indexOf(note), 1);
}

function refreshNoteList() {
  Array.from(document.querySelectorAll(".note-delete")).forEach(function (
    note
  ) {
    note.addEventListener("click", function (event) {
      removeArrayElement(event.target.parentElement.innerText);
      localStorage.setItem("lists", JSON.stringify(noteLists));
      event.target.parentElement.remove();
    });
  });
}
