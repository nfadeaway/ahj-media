export default class MessageController {
  constructor(app) {
    this.app = app;
    this.messagesContainer = app.querySelector(".message-container__messages");
    this.modalCoords = app.querySelector(".modal-coords");
    this.modalInput = app.querySelector(".modal-coords__input");
    this.modalError = app.querySelector(".error");
    this.modalCancelBtn = app.querySelector(".modal-coords__cancel-btn");
    this.modalSubmitBtn = app.querySelector(".modal-coords__submit-btn");
    this.coords = undefined;

    this.modalCancelBtn.addEventListener("click", () => {
      this.modalInput.value = "";
      this.modalError.classList.add("hidden");
      this.modalCoords.classList.add("hidden");
      this.app.querySelector(".message-input").classList.remove("disabled");
    });

    this.modalSubmitBtn.addEventListener("click", () => {
      if (this._checkCoords(this.modalInput.value)) {
        this.coords = this.modalInput.value;
        const text = app.querySelector(".message-input").value;
        this._renderTextMessage(text, this.coords);
        this.modalCoords.classList.add("hidden");
        this.modalError.classList.add("hidden");
        this.app.querySelector(".message-input").value = "";
        this.modalInput.value = "";
        this.app.querySelector(".message-input").classList.remove("disabled");
      } else {
        this.modalError.classList.remove("hidden");
      }
    });
  }
  _renderTextMessage(text, coords) {
    const messageContainerDiv = document.createElement("div");
    messageContainerDiv.classList.add("message-container__message-container");
    const messageTextDiv = document.createElement("div");
    messageTextDiv.classList.add("message-text");
    messageTextDiv.textContent = text;
    const messageTimeDiv = document.createElement("div");
    messageTimeDiv.classList.add("message-time");
    messageTimeDiv.textContent = this._getCurrentTime();
    const messageCoordsDiv = document.createElement("div");
    messageCoordsDiv.classList.add("message-coords");
    messageCoordsDiv.textContent = coords;
    const timelineMarkerDiv = document.createElement("div");
    timelineMarkerDiv.classList.add("timeline-marker");
    messageContainerDiv.appendChild(messageTextDiv);
    messageContainerDiv.appendChild(messageTimeDiv);
    messageContainerDiv.appendChild(messageCoordsDiv);
    messageContainerDiv.appendChild(timelineMarkerDiv);
    this.messagesContainer.prepend(messageContainerDiv);
    this.coords = undefined;
  }
  _getCurrentTime() {
    let dateNow = new Date();
    return `${("0" + dateNow.getDate()).slice(-2)}.${(
      "0" +
      (dateNow.getMonth() + 1)
    ).slice(-2)}.${("" + dateNow.getFullYear()).slice(-2)} ${(
      "0" + dateNow.getHours()
    ).slice(-2)}:${("0" + dateNow.getMinutes()).slice(-2)}`;
  }
  addMessage(text) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data.coords;
          this.coords = `[${latitude}, ${longitude}]`;
          this._renderTextMessage(text, this.coords);
          this.app.querySelector(".message-input").value = "";
        },
        () => {
          this.modalCoords.classList.remove("hidden");
          this.app.querySelector(".message-input").classList.add("disabled");
        },
      );
    }
  }
  _checkCoords(coords) {
    const re = /^[-−]?\d{1,2}.\d{5,},\s?[-−]?\d{1,3}.\d{5,}$/;
    const re_sq = /^\[[-−]?\d{1,2}.\d{5,},\s?[-−]?\d{1,3}.\d{5,}\]$/;
    return re.test(coords) || re_sq.test(coords);
  }
}
