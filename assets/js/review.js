let data = [
	{
		id: 1,
		avatar: './assets/images/review.png',
		background: '#90ccff',
		content:
			'“It was very comforting to recieve a text and pics each day about our pets and how they were doing. It was also nice that my pets were in the comfortable environment of their own home and received playfull attention from our pet sitters as well. Thanks so much!”',
		name: 'Karla Deras',
	},
	{
		id: 2,
		avatar: './assets/images/review.png',
		background: '#ffda54',
		content:
			'“It was very comforting to recieve a text and pics each day about our pets and how they were doing. It was also nice that my pets were in the comfortable environment of their own home and received playfull attention from our pet sitters as well. Thanks so much!”',
		name: 'Meisei Chikara',
	},
	{
		id: 3,
		avatar: './assets/images/review.png',
		background: '#ff997e',
		content:
			'“It was very comforting to recieve a text and pics each day about our pets and how they were doing. It was also nice that my pets were in the comfortable environment of their own home and received playfull attention from our pet sitters as well. Thanks so much!”',
		name: 'Onosato Daiki',
	},
    {
		id: 4,
		avatar: './assets/images/review.png',
		background: '#fac3d1',
		content:
			'“It was very comforting to recieve a text and pics each day about our pets and how they were doing. It was also nice that my pets were in the comfortable environment of their own home and received playfull attention from our pet sitters as well. Thanks so much!”',
		name: 'Okaryu Kazumo',
	},
];

class Review {
	constructor(id, avatar, background, content, name) {
		this.id = id;
		this.avatar = avatar;
		this.background = background;
		this.content = content;
		this.name = name;
	}
}

const reviews = data.map((review) => {
	return new Review(
		review.id,
		review.avatar,
		review.background,
		review.content,
		review.name
	);
});

if (reviews.length === 2) {
	reviews.push(reviews[0], reviews[1]);
}

class ReviewSlider {
	constructor(reviews) {
		this.reviews = reviews;
		this.reviewList = document.querySelector('.review-list');
		this.navigationWrapper = document.querySelector('.navigation-wrapper');
	}

	init() {
		let btnLeftEl = document.querySelector('.review-btn-left');
		let btnRightEl = document.querySelector('.review-btn-right');
		this.reviewList.innerHTML = '';
		this.navigationWrapper.innerHTML = '';

		this.reviews.forEach((item, index) => {
			let position = '';
			if (this.reviews.length === 1 && index === 0) {
				position = 'active';
			} else {
				if (index === 0) position = 'active';
				else if (index === 1) position = 'next';
				else if (index === 2) position = 'last';
				else position = '';
			}

			this.reviewList.innerHTML += `
                    <article class="review-item ${position}" data-id="${item.id}">
                            <div class="review-avatar" style="background-color: ${item.background};">
                                <img
                                    src="${item.avatar}"
                                    alt=""
                                />
                            </div>
                            <div class="review-info">
                                <h2 class="section-title review-title">
                                    Our Reviews
                                </h2>
                                <p class="review-content">
                                    ${item.content}
                                </p>
                                <p class="review-name">${item.name}</p>
                            </div>
                        </article>
                    `;

			this.navigationWrapper.innerHTML += `
                    <div class="navigation-item ${
						position === 'active' ? 'active' : ''
					}" data-id='${item.id}'></div>
                `;
		});

		btnLeftEl.addEventListener('mousedown', () => {
			if (this.reviews === 1) return;
			this.changeReview('prev');
			this.changeNavigation();
		});

		btnRightEl.addEventListener('mousedown', () => {
			if (this.reviews === 1) return;
			this.changeReview('next');
			this.changeNavigation();
		});

        this.eventNavigation();
	}

	changeReview(direction) {
		let reviews = document.querySelectorAll('.review-item');
		let lastReview = document.querySelector('.review-item.last');
		let activeReview = document.querySelector('.review-item.active');
		let nextReview = document.querySelector('.review-item.next');

		lastReview.classList.remove('last');
		activeReview.classList.remove('active');
		nextReview.classList.remove('next');

		if (direction !== 'next' && direction !== 'prev') {
			reviews.forEach((review) => {
				if (review.getAttribute('data-id') == direction) {
					review.classList.add('active');

					review.nextElementSibling === null
						? this.reviewList.firstElementChild.classList.add('next')
						: review.nextElementSibling.classList.add('next');

					review.previousElementSibling === null
						? this.reviewList.lastElementChild.classList.add('last')
						: review.previousElementSibling.classList.add('last');

                    this.changeNavigation();
                    return;
				}
			});
		}

		if (direction === 'next') {
			lastReview.nextElementSibling === null
				? this.reviewList.firstElementChild.classList.add('last')
				: lastReview.nextElementSibling.classList.add('last');

			activeReview.nextElementSibling === null
				? this.reviewList.firstElementChild.classList.add('active')
				: activeReview.nextElementSibling.classList.add('active');

			nextReview.nextElementSibling === null
				? this.reviewList.firstElementChild.classList.add('next')
				: nextReview.nextElementSibling.classList.add('next');
		}

		if (direction === 'prev') {
			lastReview.previousElementSibling === null
				? this.reviewList.lastElementChild.classList.add('last')
				: lastReview.previousElementSibling.classList.add('last');

			activeReview.previousElementSibling === null
				? this.reviewList.lastElementChild.classList.add('active')
				: activeReview.previousElementSibling.classList.add('active');

			nextReview.previousElementSibling === null
				? this.reviewList.lastElementChild.classList.add('next')
				: nextReview.previousElementSibling.classList.add('next');
		}
	}

	changeNavigation() {
		let navigators = document.querySelectorAll('.navigation-item');
		let activeNavigator = document.querySelector('.navigation-item.active');
		let activeReview = document.querySelector('.review-item.active');
		let activeId = activeReview.getAttribute('data-id');
		navigators.forEach((navigator) => {
			if (navigator.getAttribute('data-id') == activeId) {
				activeNavigator.classList.remove('active');
				navigator.classList.add('active');
			}
		});
	}

	eventNavigation() {
		let navigators = document.querySelectorAll('.navigation-item');
		navigators.forEach((navigator) => {
			navigator.addEventListener('mousedown', () => {
				this.changeReview(navigator.getAttribute('data-id'));
			});
		});
	}
}

const reviewSlider = new ReviewSlider(reviews);
reviewSlider.init();
