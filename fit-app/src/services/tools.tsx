
export const filterNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Delete" || e.key === "Enter" || e.key === "Tab") {
    return;
  }
  const testString = /^[0-9]*$/;
  if (!testString.test(e.key)) {
    e.preventDefault();
  }
}
