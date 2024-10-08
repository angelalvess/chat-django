

const $chatMessages = document.querySelector(".messages");


const setRoomActive = (room_id) => {
    document.querySelectorAll(".list-rooms li").forEach((el) => el.classList.remove("active"));

    document.querySelector(`#room-${room_id}`).classList.add("active");
    document.querySelector("#select-room").value = room_id;

}

const getMessages = async (room_id) => {
    const response = await fetch(`/${room_id}`);
    const html = await response.text();
    $chatMessages.innerHTML = html;
    setRoomActive(room_id);
}


const sendMessage = async (data) => {
 

  const response = await fetch(`/${data.room_id}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": data.csrfmiddlewaretoken,
    },
    body: JSON.stringify(data),
  });

  const html = await response.text();
  const $uniqueMessageContainer = document.querySelector(".unique-message-container");
    $uniqueMessageContainer.insertAdjacentHTML("beforeend", html);
    document.querySelector(".send-message").reset();
}

const createRoom = async (data) => {
  console.log(data)

  const response = await fetch(`/create-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": data.csrfmiddlewaretoken,
    },
    body: JSON.stringify(data),
  });

  const html = await response.text();
  const $listRooms = document.querySelector(".list-rooms");
    $listRooms.insertAdjacentHTML("afterbegin", html);
    const modal = bootstrap.Modal.getInstance(document.querySelector(".modal"));
    modal.hide();
    document.querySelector(".create-room").reset();
    getLastRoom();
}

const getLastRoom =  () => {
    document.querySelector(".list-rooms li").click();
  }


// form send message
document.querySelector(".send-message").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    sendMessage(data);
});

// form create room
document.querySelector(".create-room").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    createRoom(data);
});

getLastRoom();