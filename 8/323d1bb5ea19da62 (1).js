// Базовые операции
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Ошибка: деление на ноль";
  }
  return a / b;
}

// Инженерные функции
function power(a, b) {
  return Math.pow(a, b);
}

function sqrt(a) {
  return Math.sqrt(a);
}

function percent(a, b) {
  return (a * b) / 100;
}

function constants(name) {
  const constants = {
    pi: Math.PI,
    e: Math.E
  };
  return constants[name];
}

function sin(a) {
  return Math.sin(a);
}

function cos(a) {
  return Math.cos(a);
}

function tan(a) {
  return Math.tan(a);
}

function log(a, b) {
  return Math.log(a) / Math.log(b);
}

// Сохранение вычислений
let lastResult = 0;

function saveResult(operation, a, b) {
  switch (operation) {
    case "+":
      lastResult = add(lastResult, a);
      break;
    case "-":
      lastResult = subtract(lastResult, a);
      break;
    case "*":
      lastResult = multiply(lastResult, a);
      break;
    case "/":
      lastResult = divide(lastResult, a);
      break;
    case "^":
      lastResult = power(lastResult, a);
      break;
    case "√":
      lastResult = sqrt(lastResult);
      break;
    case "%":
      lastResult = percent(lastResult, a);
      break;
    default:
      lastResult = a;
  }
  console.log(`Последний результат: ${lastResult}`);
  return lastResult;
}

// Обработка ввода пользователя
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("Калькулятор:");
  console.log("1. Сложение (+)");
  console.log("2. Вычитание (-)");
  console.log("3. Умножение (*)");
  console.log("4. Деление (/)");
  console.log("5. Возведение в степень (^)");
  console.log("6. Извлечение корня (√)");
  console.log("7. Расчёт процентов (%)");
  console.log("8. Константы (pi, e)");
  console.log("9. Тригонометрические функции (sin, cos, tan)");
  console.log("10. Логарифмы");
  console.log("0. Выход");
  console.log("Выберите действие (0-10):");
}

function handleUserInput(choice) {
  rl.question('Введите первое число: ', (num1) => {
    rl.question('Введите второе число (не нужно для √): ', (num2) => {
      const num1Value = parseFloat(num1);
      const num2Value = parseFloat(num2);

      let result;
      let operation;
      switch (choice) {
        case '1':
          result = add(num1Value, num2Value);
          operation = '+';
          break;
        case '2':
          result = subtract(num1Value, num2Value);
          operation = '-';
          break;
        case '3':
          result = multiply(num1Value, num2Value);
          operation = '*';
          break;
        case '4':
          result = divide(num1Value, num2Value);
          operation = '/';
          break;
        case '5':
          result = power(num1Value, num2Value);
          operation = '^';
          break;
        case '6':
          result = sqrt(num1Value);
          operation = '√';
          break;
        case '7':
          result = percent(num1Value, num2Value);
          operation = '%';
          break;
        case '8':
          rl.question('Введите константу (pi, e): ', (constant) => {
            result = constants(constant);
            console.log(`Результат: ${result}`);
            saveResult(constant, result, 0);
            showMenu();
          });
          return;
        case '9':
          rl.question('Введите функцию (sin, cos, tan): ', (func) => {
            switch (func) {
              case 'sin':
                result = sin(num1Value);
                break;
              case 'cos':
                result = cos(num1Value);
                break;
              case 'tan':
                result = tan(num1Value);
                break;
              default:
                result = 'Неверная функция';
            }
            console.log(`Результат: ${result}`);
            saveResult(func, result, 0);
            showMenu();
          });
          return;
        case '10':
          rl.question('Введите основание логарифма: ', (base) => {
            result = log(num1Value, parseFloat(base));
            console.log(`Результат: ${result}`);
            saveResult(`log(${num1Value}, ${base})`, result, 0);
            showMenu();
          });
          return;
        case '0':
          rl.close();
          return;
        default:
          result = 'Неверный выбор';
      }

      console.log(`Результат: ${result}`);
      saveResult(operation, num1Value, num2Value);
      showMenu();
    });
  });
}

showMenu();
rl.on('line', (input) => {
  handleUserInput(input);
});