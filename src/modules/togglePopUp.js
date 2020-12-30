// Popup-окно
const togglePopUp = () => {
	const popupButtons = document.querySelectorAll('.popup-btn'),
		popup = document.querySelector('.popup'),
		popUpContent = document.querySelector('.popup-content');

	// animate popup
	let idInterval,
		count = 0;

	const animatePopUp = () => {
		count++;
		if (parseFloat(popUpContent.style.left) < 38) {
			popUpContent.style.left = count + '%';
		} else {
			clearInterval(idInterval);
			count = 0;
		}
	};

	// Открытие popup окна + анимация
	popupButtons.forEach(item => {
		item.addEventListener('click', () => {
			popup.style.display = 'block';
			popUpContent.style.left = '-50%';
			if (window.innerWidth > 768) {
				idInterval = setInterval(animatePopUp, 10);
			} else {
				popUpContent.style.left = '38%';
			}
		});
	});

	// Закрытие popup окна
	popup.addEventListener('click', e => {
		const target = e.target;
		// если нажимаем кнопку "Закрыть" или нажимаем вне области окна, то закрываем его
		if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {
			popup.style.display = 'none';
		}
	});
};

export default togglePopUp;
