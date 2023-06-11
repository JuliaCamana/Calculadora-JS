const VET_NUMBERS = "0123456789";
const VET_OPERATORS = "+-*/%";
const VET_PARENTS = "()";

$(document).ready(() => {
  let selectedInput = $("#tela-a");

  const inputA = $("#tela-a");
  const inputB = $("#tela-b");
  const inputC = $("#tela-c");

  const inputX1 = $("#tela-x1");
  const inputX2 = $("#tela-x2");

  const getInputLastChar = () => {
    return selectedInput.val().charAt(selectedInput.val().length - 1);
  };

  const handleCalc = () => {
    try {
      const a = parseFloat(inputA.val());
      const b = parseFloat(inputB.val());
      const c = parseFloat(inputC.val());

      const delta = b * b - 4 * a * c;

      if (!delta) return alert("Preencha todos os dados correctamente!");

      if (delta <= 0) {
        return alert("Delta é < 0 logo não existe X1 e X2");
      }

      const raiz = Math.sqrt(delta);

      const x1 = (-b + raiz) / (2 * a);
      const x2 = (-b - raiz) / (2 * a);

      inputX1.val(x1);
      inputX2.val(x2);

      if (inputX1.val()) {
        historyCalc.add(`
          ${a}x^2 + ${b}x + ${c} = 0<br>
          x1 = ${x1}<br>
          x2 = ${x2}<br>
        `);
      }
    } catch {
      alert("Expressão Inválida!");
    }
  };

  $("body").delegate(".btn-ac", "click", () => {
    inputA.val("");
    inputB.val("");
    inputC.val("");
    inputX1.val("");
    inputX2.val("");
  });

  $("#btn-shar").click(() => {
    if (navigator.share) {
      const a = parseFloat(inputA.val());
      const b = parseFloat(inputB.val());
      const c = parseFloat(inputC.val());
      const x1 = parseFloat(inputX1.val());
      const x2 = parseFloat(inputX2.val());

      navigator.share({
        title: "Equação do 2 Grau",
        text: `
        ${a}x^2 + ${b}x + ${c} = 0\n
        x1 = ${x1}\n
        x2 = ${x2}
        `,
      });
    }
  });

  $("body").delegate(".btn-del", "click", () => {
    selectedInput.val(
      selectedInput.val().substring(0, selectedInput?.val()?.length - 1)
    );
  });

  $(".eq-value").focus((event) => {
    selectedInput = $(event?.target);
  });

  $("body").delegate(".btn-num", "click", (event) => {
    event.preventDefault();

    const value = event.target.value;

    if (VET_NUMBERS.includes(parseInt(value))) {
      selectedInput.val(selectedInput.val() + value);
      selectedInput.focus();
      return;
    }

    if (value == "calc") {
      handleCalc();
    }
  });

  $(".btn-point").click(() => {
    if (!VET_NUMBERS.includes(getInputLastChar())) return;

    let addComa = null;

    for (let i = selectedInput.val().length; i >= 0; i--) {
      const char = selectedInput.val()[i];

      if (VET_OPERATORS.includes(char)) {
        addComa = true;
        break;
      }

      if (char == ".") {
        addComa = false;
        break;
      }
    }

    if (addComa == null || addComa == true)
      selectedInput.val(selectedInput.val() + ".");
  });
});
