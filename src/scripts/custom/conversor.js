const VET_NUMBERS = "0123456789";
const VET_OPERATORS = "+-*/%";
const VET_PARENTS = "()";

$(document).ready(() => {
  const inputText = $("#input-text");
  const outputText = $("#output-text");
  const selectedInputType = $("#types");
  const selectInput1 = $("#unit-in");
  const selectInput2 = $("#unit-out");

  const handleCalc = () => {
    if (selectedInputType.val() == "massa") {
      if (selectInput1.val() == "kg" && selectInput2.val("g")) {
        outputText.val(inputText.val() * 1000);
      } else if (selectInput1.val() == "g" && selectInput2.val("kg")) {
        outputText.val(inputText.val() / 1000);
      } else {
        outputText.val(inputText.val());
      }
    }

    if (selectedInputType.val() == "temperatura") {
      if (selectInput1.val() == "celsius" && selectInput2.val() == "kelvin") {
        outputText.val(inputText.val() + 273.15);
      } else if (
        selectInput1.val() == "celsius" &&
        selectInput2.val() == "fahrenheit"
      ) {
        outputText.val(inputText.val() * 1.8 + 32);
      } else if (
        selectInput1.val() == "fahrenheit" &&
        selectInput2.val() == "celsius"
      ) {
        outputText.val((inputText.val() - 32) / 1.8);
      } else if (
        selectInput1.val() == "fahrenheit" &&
        selectInput2.val() == "kelvin"
      ) {
        outputText.val((inputText.val() + 459.67) / 1.8);
      } else if (
        selectInput1.val() == "kelvin" &&
        selectInput2.val() == "celsius"
      ) {
        outputText.val(inputText.val() - 273.15);
      } else if (
        selectInput1.val() == "kelvin" &&
        selectInput2.val() == "fahrenheit"
      ) {
        outputText.val(inputText.val() * 1.8 - 459.67);
      } else {
        outputText.val(inputText.val());
      }
    }

    if (selectedInputType.val() == "tempo") {
      if (selectInput1.val() == "hora" && selectInput2.val() == "minuto") {
        outputText.val(inputText.val() * 60);
      } else if (
        selectInput1.val() == "hora" &&
        selectInput2.val() == "segundo"
      ) {
        outputText.val(inputText.val() * 3600);
      } else if (
        selectInput1.val() == "minuto" &&
        selectInput2.val() == "segundo"
      ) {
        outputText.val(inputText.val() * 60);
      } else if (
        selectInput1.val() == "minuto" &&
        selectInput2.val() == "hora"
      ) {
        outputText.val(inputText.val() / 60);
      } else if (
        selectInput1.val() == "segundo" &&
        selectInput2.val() == "minuto"
      ) {
        outputText.val(inputText.val() / 60);
      } else if (
        selectInput1.val() == "segundo" &&
        selectInput2.val() == "hora"
      ) {
        outputText.val(inputText.val() / 3600);
      } else {
        outputText.val(inputText.val());
      }
    }

    if (outputText.val()) {
      historyCalc.add(`
        Tipo de Conversão: ${selectedInputType.val()}<br>
        Unidade de Entrada: ${selectInput1.val()}<br>
        Valor: ${inputText.val()}<br>
        Unidade de Saída: ${selectInput2.val()}<br>
        Saída: ${outputText.val()}<br>
      `);
    }
  };

  const handleClean = () => {
    selectInput1.html("");
    selectInput2.html("");
    outputText.val("");
    inputText.val("");
  };

  const fillForm = (type = "") => {
    handleClean();

    if (type == "massa") {
      const options = `
        <option value=""></option>
        <option value="kg">kg</option>
        <option value="g">g</option>
      `;

      selectInput1.html(options);
      selectInput2.html(options);

      return;
    }

    if (type == "temperatura") {
      const options = `
        <option value=""></option>
        <option value="celsius">Celsius</option>
        <option value="kelvin">Kelvin</option>
        <option value="fahrenheit">Fahrenheit</option>
      `;

      selectInput1.html(options);
      selectInput2.html(options);

      return;
    }

    if (type == "tempo") {
      const options = `
          <option value=""></option>
          <option value="hora">Hora</option>
          <option value="minuto">Minuto</option>
          <option value="segundo">Segundo</option>
      `;

      selectInput1.html(options);
      selectInput2.html(options);

      return;
    }
  };

  $("#types").change((event) => {
    fillForm(event.target.value);
  });

  $("#btn-share").click(() => {
    if (navigator.share) {
      navigator.share({
        title: "Conversão de " + selectedInputType.val(),
        text: `
        Tipo de Conversão: ${selectedInputType.val()}\n
        Unidade de Entrada: ${selectInput1.val()}\n
        Valor: ${inputText.val()}\n 
        Unidade de Saída: ${selectInput2.val()}\n
        Saída: ${outputText.val()}\n
        `,
      });
    }
  });

  $("body").delegate(".btn-num", "click", (event) => {
    event.preventDefault();

    const value = event.target.value;

    if (VET_NUMBERS.includes(parseInt(value))) {
      inputText.val(inputText.val() + value);
      inputText.focus();
      return;
    }

    if (value == "calc") {
      handleCalc();
      return;
    }

    if (value == "del") {
      inputText.val(inputText.val().substring(0, inputText?.val()?.length - 1));
      return;
    }

    if (value == "ac") {
      selectedInputType.val("");
      handleClean();
      return;
    }
  });
});
