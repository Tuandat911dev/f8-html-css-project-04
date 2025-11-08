const navigatorEl = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id], footer[id]');

navigatorEl.forEach((link) => {
	link.addEventListener('mousedown', (e) => {
		e.preventDefault();

		let targetId = link.getAttribute('href').substring(1);
		let currentActiveLink = document.querySelector(
			'.nav-item.nav-item__active'
		);
		let targetSection = document.getElementById(targetId);

		targetSection.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});

		currentActiveLink.classList.remove('nav-item__active');
		link.classList.add('nav-item__active');
	});
});

window.addEventListener('scroll', () => {
	let scrollPos = window.scrollY || window.pageYOffset;

	sections.forEach((section) => {
		const top = section.offsetTop; // từ đỉnh phần tử đến document
		const height = section.offsetHeight; // chiểu cao của phẩn tử không margin
		const id = section.getAttribute('id');

		// trừ 90px của navbar
		if (scrollPos >= top - 90 && scrollPos < top + height - 90) {
			navigatorEl.forEach((link) =>
				link.classList.remove('nav-item__active')
			);

			document
				.querySelector(`.nav-item[href="#${id}"]`)
				.classList.add('nav-item__active');
		}
	});
});
