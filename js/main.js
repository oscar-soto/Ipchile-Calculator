// Const
const unitsInMeter = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

// Elements
const form = document.querySelector('#formCalculator');
const elementResult = document.querySelector('#calculator_result');

// Functions
const isMajorThanZero = (number) => {
  return number >= 0;
};

const convertUnit = (fromUnit, toUnit, value) => {
  // Convertir a metros
  const valueInMeter = value * unitsInMeter[fromUnit];

  // Convertir a la unidad Correcta
  return valueInMeter / unitsInMeter[toUnit];
};

const handleSubmit = (e) => {
  // Evitar Refrescar la pagina
  e.preventDefault();

  // Obtener los datos
  const formData = new FormData(event.target);
  const { fromUnit, value, toUnit } = Object.fromEntries(formData.entries());

  // Prevenir que ingrese datos vacios
  const isEmpty = [fromUnit, toUnit, value].includes('');
  if (isEmpty) {
    alert('Todos los campos son obligatorios');
    return;
  }

  // Transforma de string a numero
  const transformValue = Number(value);

  // Validar que sean unidades diferentes
  const isDifferentUnit = fromUnit === toUnit;
  if (isDifferentUnit) {
    alert('Por favor ingrese unidades diferentes');
    return;
  }

  // Validar que sea mayor a 0
  const isValidNumber = isMajorThanZero(transformValue);
  if (!isValidNumber) {
    elementResult.textContent = `0 ${toUnit}`;
    return;
  }

  // Obtner el valor convertido
  const convertValue = convertUnit(fromUnit, toUnit, value);

  elementResult.textContent = `${convertValue} ${toUnit}`;
};

// Listener
form.addEventListener('submit', handleSubmit);
