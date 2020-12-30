// Слайдер
const toggleSlider = () => {
	const slides = document.querySelectorAll('.portfolio-item'),
		slider = document.querySelector('.portfolio-content'),
		dotsContainer = document.querySelector('.portfolio-dots');

	let dots = document.querySelectorAll('.dot'),
		currentSlide = 0,
		idInterval;

	// добавляем пагинацию
	slides.forEach((item, index) => {
		const li = document.createElement('li');
		if (index === 0) {
			li.classList.add('dot');
			li.classList.add('dot-active');
		} else {
			li.classList.add('dot');
		}
		dotsContainer.append(li);
	});

	dots = document.querySelectorAll('.dot');

	// удаляем активный класс у текущего элемента слайдера
	const prevSlide = (element, index, strClass) => {
		element[index].classList.remove(strClass);
	};

	// добавляем активный класс следующему элементу слайдера
	const nextSlide = (element, index, strClass) => {
		element[index].classList.add(strClass);
	};

	// автоматическое переключение слайдов
	const autoPlaySlider = () => {
		prevSlide(slides, currentSlide, 'portfolio-item-active'); // скрываем текущий слайд
		prevSlide(dots, currentSlide, 'dot-active'); // удаляем активный стиль пагинации текущего слайда

		currentSlide++;

		if (currentSlide === slides.length) { currentSlide = 0; }

		nextSlide(slides, currentSlide, 'portfolio-item-active'); // делаем видимым следующий слайд
		nextSlide(dots, currentSlide, 'dot-active'); // добавялем активный стиль пагинации следующего слайда
	};

	// запуск слайдшоу
	const startAutoPlay = () => {
		idInterval = setInterval(autoPlaySlider, 2000);
	};
	startAutoPlay();

	// останов слайдшоу
	const stopAutoPlay = () => {
		clearInterval(idInterval);
	};

	// останов слайдшоу при наведении на кнопку или пагинацию
	slider.addEventListener('mouseover', e => {
		if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) { stopAutoPlay(); }
	});

	// запуск слайдшоу в иных случаях
	slider.addEventListener('mouseout', e => {
		if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) { startAutoPlay(); }
	});

	// переключение слайдов по клику на кнопку или пагинацию
	slider.addEventListener('click', e => {
		e.preventDefault();

		const target = e.target;

		// условие для предовращения влияния клика по слайду на верстку
		if (!target.matches('.dot') && !target.matches('.portfolio-btn')) { return; }

		// удаляем стили у текущего слайда и пагинации
		prevSlide(slides, currentSlide, 'portfolio-item-active');
		prevSlide(dots, currentSlide, 'dot-active');

		// обработка клика по кнопке или пагинации
		if (target.matches('.dot')) {
			dots.forEach((dot, index) => {
				if (dot === target) { currentSlide = index; }
			});
		} else if (target.matches('#arrow-right')) {
			currentSlide++;
		} else if (target.matches('#arrow-left')) {
			currentSlide--;
		}

		// условие для бесконечного листания слайдов
		if (currentSlide >= slides.length) {
			currentSlide = 0;
		} else if (currentSlide < 0) {
			currentSlide = slides.length - 1;
		}

		// добавляем стили следующему слайду и пагинации
		nextSlide(slides, currentSlide, 'portfolio-item-active');
		nextSlide(dots, currentSlide, 'dot-active');
	});
};

export default toggleSlider;
