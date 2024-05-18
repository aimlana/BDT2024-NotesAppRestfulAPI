function noteApi() {
  const BASE_URL = "https://notes-api.dicoding.dev/v2";

  const getNote = () => {
    fetch(`${BASE_URL}/notes`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllNotes(responseJson.Notes);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const insertNote = (Note) => {
    fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(Note),
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

  const updateNote = (Note) => {
    fetch(`${baseUrl}/edit/${Note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(Note),
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

  const removeNote = (NoteId) => {
    fetch(`${baseUrl}/delete/${NoteId}`, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "12345",
      },
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
}

export default noteApi