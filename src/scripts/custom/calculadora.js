$(document).ready(() => {
  $("body").delegate(".btn-only-num", "click", (event) => {
    console.log(event.target.value);
  });
});
