const VET_NUMBERS = "0123456789";
const VET_OPERATORS = "+-*/%";

$(document).ready(() => {
  const displayInput = $("#input-display");
  let answer = "";

  //result
  const handleResult = () => {
    try {
      let expression = displayInput.val();

      displayInput.val(eval(expression));
    } catch (error) {
      alert("Expressão Inválida!");
    }
  };

  const getInputLastChar = () => {
    return displayInput.val().charAt(displayInput.val().length - 1);
  };

  $("#btn-open-parent").click(() => {
    displayInput.val(displayInput.val());
  });

  $("#btn-close-parent").click(() => {});

  //numbers
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

  //operators
  $("body").delegate(".btn-operators", "click", (event) => {
    const value = event.target.value;

    if (
      (!displayInput.val() && value == "-") ||
      VET_NUMBERS.includes(getInputLastChar())
    ) {
      displayInput.val(displayInput.val() + value);
    }
  });

  //igual
  $("body").delegate(".btn-igual", "click", (event) => {
    handleResult();
  });

  //answer
  $("body").delegate(".btn-answer", "click", () => {
    if (
      VET_NUMBERS.includes(getInputLastChar()) &&
      displayInput.val() == eval(displayInput.val())
    ) {
      answer = displayInput.val();
    } else if (VET_OPERATORS.includes(getInputLastChar()) && answer) {
      displayInput.val(displayInput.val() + answer);
      answer = "";
    }
  });
});
