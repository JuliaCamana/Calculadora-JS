function light() {
  localStorage.setItem("dark", "0");
  putTheme();
}

function dark() {
  localStorage.setItem("dark", "1");
  putTheme();
}

function putTheme() {
  const dark = localStorage.getItem("dark") || "0";

  if (dark == 1) {
    document.body.setAttribute("dark", "");
  } else {
    document.body.removeAttribute("dark");
  }
}

window.onload = () => putTheme();
