// Tabs
const toggleTabs = () => {
	const tabsHeader = document.querySelector('.service-header'),
		tabs = document.querySelectorAll('.service-header-tab'),
		tabsContent = document.querySelectorAll('.service-tab');

	const toggleTabContent = index => {
		tabsContent.forEach((item, i) => {
			if (i === index) {
				tabs[i].classList.add('active');
				item.classList.remove('d-none');
			} else {
				tabs[i].classList.remove('active');
				item.classList.add('d-none');
			}
		});
	};

	tabsHeader.addEventListener('click', e => {
		let target = e.target;
		target = target.closest('.service-header-tab'); // если нет класса, поднимается выше по DOM-дереву к родителю
		if (target) {
			tabs.forEach((item, i) => {
				if (item === target) { toggleTabContent(i); }
			});
		}
	});
};

export default toggleTabs;
