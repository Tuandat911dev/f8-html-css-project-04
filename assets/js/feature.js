const featureBtnEl = document.querySelectorAll('.feature-item');
let featureBtnElActive = document.querySelector('.feature-item.active');
const dividerEl = document.querySelector('.feature-info-sub-divider');
const featureContent = document.querySelectorAll('.feature-info-sub-desc');
let contentActive = document.querySelector('.feature-info-sub-desc.active');
const featureList = document.querySelector('.feature-list');

featureBtnEl.forEach((btn) => {
	btn.addEventListener('mousedown', () => {
		featureBtnElActive = document.querySelector('.feature-item.active');
		featureBtnElActive.classList.remove('active');
		btn.classList.add('active');

		let btnRect = btn.getBoundingClientRect();
		let featureListRect = featureList.getBoundingClientRect();
		dividerEl.style.left = btnRect.left - featureListRect.left + 'px';
		changeContent(btn.getAttribute('data-id'));
	});
});

function changeContent(id) {
	featureContent.forEach((content) => {
		if (content.getAttribute('data-id') == id) {
			contentActive = document.querySelector(
				'.feature-info-sub-desc.active'
			);
			contentActive.classList.remove('active');
			content.classList.add('active');
		}
	});
}
