// Меню
const toggleMenu = () => {
	const menu = document.querySelector('menu');

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	document.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('.menu') ||
        target.classList.contains('close-btn') ||
        target.matches('ul>li>a')) {
			handlerMenu();
		} else if (!target.closest('.active-menu')) {
			menu.classList.remove('active-menu');
		}
	});
};

export default toggleMenu;
