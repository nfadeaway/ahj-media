import MessageController from "./messageController";

test("Правильно валидируются значения координат", () => {
  expect(MessageController._checkCoords("51.50851, −0.12572")).toEqual(true);
  expect(MessageController._checkCoords("51.50851,−0.12572")).toEqual(true);
  expect(MessageController._checkCoords("[51.50851, −0.12572]")).toEqual(true);
  expect(MessageController._checkCoords("test")).toEqual(false);
  expect(MessageController._checkCoords("51.50851, −0.12572]")).toEqual(false);
});
