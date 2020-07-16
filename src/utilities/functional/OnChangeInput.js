/**
 * @param {*} modelInState adalah model yang sudah di initialisasi oleh state
 * @param {*} event adalah event yang diberikan saat ada perubahaan pada input from
 */
export default function OnChangeInput(modelInState, event) {
  const { name, value } = event.target;
  modelInState[name] = value;
  return modelInState;
}
