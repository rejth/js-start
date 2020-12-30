// Блок "Наша команда"
const handlerPhotoMouseEnter = () => {
	const images = document.querySelectorAll('.command img');
	images.forEach(img => {
		const imageSrc = img.src;
		img.addEventListener('mouseenter', () => {
			img.src = img.dataset.img;
		});
		img.addEventListener('mouseleave', () => {
			img.src = imageSrc;
		});
	});
};

export default handlerPhotoMouseEnter;
