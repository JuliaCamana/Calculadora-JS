const historyCalc = {
  add(txt) {
    const data = JSON.parse(localStorage.getItem("history") || "[]");
    data.push(txt);
    localStorage.setItem("history", JSON.stringify(data));
  },
  get() {
    return JSON.parse(localStorage.getItem("history") || "[]");
  },
};

const existing = localStorage.getItem("history");

if (!existing) localStorage.setItem("history", "[]");
