function home() {
  const BASE_URL = "https://notes-api.dicoding.dev/v2";

  // Fungsi untuk menampilkan indikator loading
  function showLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loader");
    loadingIndicator.style.display = "block";
  }

  // Fungsi untuk menyembunyikan indikator loading
  function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loader");
    loadingIndicator.style.display = "none";
  }

  const getNote = () => {
    showLoadingIndicator();

    fetch(`${BASE_URL}/notes`)
      .then((response) => {
        hideLoadingIndicator();
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllNote(responseJson.data);
        }
      })
      .catch((error) => {
        hideLoadingIndicator();
        showResponseMessage(error);
      });
  };

  const insertNote = (note) => {
    fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        console.log(responseJson);
        getNote();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const removeNote = (noteId) => {
    fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  const renderAllNote = (notes) => {
    const noteListContainerElement =
      document.querySelector("#noteListContainer");
    const noteListElement = noteListContainerElement.querySelector("note-list");
    noteListElement.innerHTML = "";

    console.log(notes);

    notes.forEach((note) => {
      console.log(note);
      noteListElement.innerHTML += `
      <div class="card">
          <div class="card-head">
            <h3 id="notesTitle">${note.title}</h3>
            <button id="deleteBtn" data-note-id="${note.id}">Delete</button>
          </div>
        <div id="notesDesc">${note.body}</div>
      </div>
      `;
    });

    const buttons = document.querySelectorAll("#deleteBtn");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteId = event.target.getAttribute("data-note-id");
        removeNote(noteId);
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const inputNoteTitle = document.querySelector("#noteTitle");
    const inputNoteDescription = document.querySelector("#noteDesc");
    const saveBtn = document.querySelector("#saveBtn");

    saveBtn.addEventListener("click", function () {
      console.log("berhasil ditekan");
      const note = {
        title: inputNoteTitle.value,
        body: inputNoteDescription.value,
      };
      console.log("Data catatan:", note);
      insertNote(note);
    });

    getNote();
  });

  // Validasi Form custom
  const form = document.querySelector(".notes-form");
  const titleInput = form.elements.noteTitle;
  const descInput = form.elements.noteDesc;

  form.addEventListener("submit", (e) => e.preventDefault());

  titleInput.addEventListener("invalid", (e) => {
    e.target.setCustomValidity("");

    if (!e.target.validity.valid) {
      e.target.setCustomValidity("Wajib diisi.");
      return;
    }
  });

  descInput.addEventListener("invalid", (e) => {
    e.target.setCustomValidity("");

    if (!e.target.validity.valid) {
      e.target.setCustomValidity("Wajib diisi.");
      return;
    }
  });
}

export default home;
