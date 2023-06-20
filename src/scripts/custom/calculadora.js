const VET_NUMBERS = "0123456789";
const VET_OPERATORS = "+-*/%";
const VET_PARENTS = "()";

$(document).ready(() => {
  const displayInput = $("#input-display");
  let lastCalc = {
    expression: "",
    result: "",
  };

  let answer = "";

  const factorialRecursive = (num) => {
    if (num === 0 || num === 1) {
      return 1;
    }

    return num * factorialRecursive(num - 1);
  };

  const handleResult = () => {
    try {
      let expression = displayInput.val();

      lastCalc.expression = expression;

      expression = expression.split("^").join("**");

      const result = eval(expression);

      lastCalc.result = result;

      displayInput.val(result);

      historyCalc.add(`${expression}=${result}`);
    } catch (error) {
      alert("Expressão Inválida!");
    }
  };

  const getInputLastChar = () => {
    return displayInput.val().charAt(displayInput.val().length - 1);
  };

  $(".btn-sqrt").click(() => {
    try {
      displayInput.val(Math.sqrt(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-ln").click(() => {
    try {
      displayInput.val(Math.log(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-log").click(() => {
    try {
      displayInput.val(Math.log10(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-tan").click(() => {
    try {
      displayInput.val(Math.tan(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-cos").click(() => {
    try {
      displayInput.val(Math.cos(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-sin").click(() => {
    try {
      displayInput.val(Math.sin(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-csc").click(() => {
    try {
      displayInput.val(1 / Math.sin(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-sec").click(() => {
    try {
      displayInput.val(1 / Math.cos(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-double").click(() => {
    try {
      const x = eval(displayInput.val());

      displayInput.val(eval(x + "**2"));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-div-one").click(() => {
    try {
      const result = 1 / eval(displayInput.val());
      displayInput.val(isNaN(result) ? "" : result);
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-fat").click(() => {
    try {
      displayInput.val(factorialRecursive(eval(displayInput.val())));
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $(".btn-expo").click(() => {
    if (VET_NUMBERS.includes(getInputLastChar())) {
      displayInput.val(displayInput.val() + "^");
    }
  });

  $(".btn-open-parent").click(() => {
    displayInput.val(displayInput.val() + "(");
  });

  $(".btn-euler").click(() => {
    displayInput.val(displayInput.val() + Math.E);
  });

  $(".btn-pi").click(() => {
    displayInput.val(displayInput.val() + Math.PI);
  });

  $(".btn-close-parent").click(() => {
    if (VET_NUMBERS.includes(getInputLastChar())) {
      displayInput.val(displayInput.val() + ")");
    }
  });

  $("body").delegate(".btn-only-num", "click", (event) => {
    displayInput.val(displayInput.val() + event.target.value);
  });

  $("body").delegate(".btn-del", "click", () => {
    displayInput.val(
      displayInput.val().substring(0, displayInput?.val()?.length - 1)
    );
  });

  $("body").delegate(".btn-ac", "click", () => {
    displayInput.val("");
  });

  $(".btn-point").click(() => {
    if (!VET_NUMBERS.includes(getInputLastChar())) return;

    let addComa = null;

    for (let i = displayInput.val().length; i >= 0; i--) {
      const char = displayInput.val()[i];

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
      displayInput.val(displayInput.val() + ".");
  });

  $("body").delegate(".btn-operators", "click", (event) => {
    const value = event.target.value;

    if (
      (!displayInput.val() && value == "-") ||
      VET_NUMBERS.includes(getInputLastChar()) ||
      getInputLastChar() == ")"
    ) {
      displayInput.val(displayInput.val() + value);
    }
  });

  $("body").delegate(".btn-igual", "click", (event) => {
    handleResult();
  });

  $("body").delegate(".btn-answer", "click", () => {
    try {
      if (
        VET_NUMBERS.includes(getInputLastChar()) &&
        displayInput.val() == eval(displayInput.val())
      ) {
        answer = displayInput.val();
      } else if (VET_OPERATORS.includes(getInputLastChar()) && answer) {
        displayInput.val(displayInput.val() + answer);
        answer = "";
      }
    } catch {
      alert("Expressão Inválida!");
    }
  });

  $("#btn-export").click(() => {
    if (navigator.share) {
      navigator.share({
        title: "Resultado de uma operação!",
        text: `
          Expressão: ${lastCalc.expression}\n
          Resultado: ${lastCalc.result}
        `,
      });
    }
  });
});
