export default () => {
  let currentYear = new Date().getFullYear();
  let years = [currentYear];
  for (let i = 30; i > 0; i--) {
    years.push(currentYear - i);
  }
  return years.sort((a, b) => {
    return b - a;
  });
};
