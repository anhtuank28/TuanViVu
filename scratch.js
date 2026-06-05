global.pathAdmin = "admin";
const test = () => {
  try {
    console.log(pathAdmin);
  } catch(e) {
    console.error("Error:", e.message);
  }
}
test();
