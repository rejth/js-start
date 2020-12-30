// Калькулятор
const calculator = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		roomType = document.querySelector('.calc-type'),
		roomSquare = document.querySelector('.calc-square'),
		roomCount = document.querySelector('.calc-count'),
		workDuration = document.querySelector('.calc-day'),
		totalPrice = document.querySelector('.calc-total');

	// Валидация значений в калькуляторе
	const validateCalculatorValues = () => {
		const calcContainer = document.querySelector('.calc');
		calcContainer.addEventListener('input', e => {
			if (e.target.matches('input')) {
				e.target.value = e.target.value.replace(/[^\d]/g, '');
			}
		});
	};

	validateCalculatorValues();

	// Расчет
	const calcTotalPrice = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;

		const selectedRoomTypeValue = +roomType.options[roomType.selectedIndex].value,
			roomSquareValue = +roomSquare.value,
			roomCountValue = +roomCount.value,
			workDurationValue = +workDuration.value;

		if (roomCountValue > 1) {
			countValue += (roomCountValue - 1) / 10;
		}

		if (workDurationValue && workDurationValue < 5) {
			dayValue *= 2;
		} else if (workDurationValue && workDurationValue >= 5 && workDurationValue < 10) {
			dayValue *= 1.5;
		}

		if (roomType && roomSquare) {
			total = Math.floor(price * selectedRoomTypeValue * roomSquareValue * countValue * dayValue);
		}

		totalPrice.textContent = total;
	};

	calcBlock.addEventListener('change', e => {
		if (e.target.matches('select') || e.target.matches('input')) {
			calcTotalPrice();
		}
	});
};

export default calculator;
