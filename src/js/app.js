import MessageController from "./messageController";

const app = document.querySelector(".app");
const messageManager = new MessageController(app);
const inputText = document.querySelector(".message-input");

document.addEventListener("keyup", (e) => {
  if (
    e.code === "Enter" &&
    document.activeElement === inputText &&
    inputText.value !== ""
  ) {
    messageManager.addMessage(inputText.value);
  }
});
