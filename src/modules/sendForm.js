// Отправка данных формы на сервер
const sendForm = formIdString => {
	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form = document.getElementById(formIdString), // форма для заполнения заявки
		statusMessageElement = document.createElement('div'), // сообщение о статусе отправки заявки
		popup = document.querySelector('.popup'), // pop-up окно
		inputs = document.querySelectorAll(`#${formIdString} input`); // все inputs из формы

	statusMessageElement.style.cssText = 'font-size: 2rem; color: white';

	// Функция отправки данных формы на сервер
	const postData = requestBody => fetch('../server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	// Валидация данных при вводе телефона
	form.addEventListener('input', e => {
		if (e.target.matches('input[name="user_phone"]')) {
			e.target.setAttribute('pattern', '^[0-9-+()]{11,16}$');
			e.target.value = e.target.value.replace(/[^\d+()-]/g, '');
		}
	});

	// Валидация данных при вводе email
	form.addEventListener('input', e => {
		if (e.target.matches('input[name="user_email"]')) {
			e.target.setAttribute('pattern', '^[A-Za-z0-9._-]+@[A-Za-z]+.[A-Za-z]{2,3}$');
			e.target.value = e.target.value.replace(/[^A-Za-z\d.@_-]/g, '');
		}
	});

	// Валидация данных при вводе имени
	form.addEventListener('input', e => {
		if (e.target.matches('input[name="user_name"]')) {
			e.target.setAttribute('pattern', '[А-Яа-яЁё-]{2,}');
			e.target.value = e.target.value.replace(/[^А-Яа-яЁё\s-]|/g, '');
		}
	});

	// Валидация данных при вводе сообщения
	form.addEventListener('input', e => {
		if (e.target.matches('input[name="user_message"]')) {
			e.target.setAttribute('type', 'text');
			e.target.value = e.target.value.replace(/[^А-Яа-яЁё\s().,!?'";:-]/g, '');
		}
	});

	// Слушатель формы на отправку данных
	form.addEventListener('submit', e => {
		e.preventDefault();
		form.append(statusMessageElement);

		statusMessageElement.textContent = loadMessage; // сообщение о загрузке

		const formData = new FormData(form);
		const body = {};

		// Перебор данных формы и заполнение тела запроса body
		formData.forEach((item, index) => body[index] = item); // у объекта formData есть свой метод forEach()

		// Отправка данных и уведомление пользователя
		postData(body)
			.then(response => {
				if (response.status !== 200) { throw new Error('Response status code is not 200'); }
				statusMessageElement.textContent = successMessage;
			})
			.catch(error => {
				statusMessageElement.textContent = errorMessage;
				console.error(error);
			});

		inputs.forEach(item => item.value = ''); // очистка input после отправки данных

		setTimeout(() => statusMessageElement.remove(), 5000); // удаление сообщения о статусе
		setTimeout(() => popup.style.display = 'none', 7000); // закрытие модального окна
	});
};

export default sendForm;
