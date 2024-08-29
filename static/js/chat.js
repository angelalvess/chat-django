

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
  console.log(data)

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
}


document.querySelector(".send-message").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    sendMessage(data);
});

getMessages(2);