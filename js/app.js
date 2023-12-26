document.addEventListener("DOMContentLoaded", function (event) {

	/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});



	// бургер меню
	let burger = document.querySelector(".burger-menu");
	let menu = document.querySelector(".menu");
	let body = document.querySelector("body");

	burger.addEventListener("click", function () {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		body.classList.toggle("lock");
	});

	/// прокрутка к блокам
	const smoothLinks = document.querySelectorAll('.menu__link');
	const headerHeight = document.querySelector('header').offsetHeight; // получаем высоту шапки

	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			e.preventDefault();
			burger.classList.remove("active");
			menu.classList.remove("active");
			body.classList.remove("lock");
			const id = smoothLink.getAttribute('href');

			const targetElement = document.querySelector(id);
			const targetPosition = targetElement.offsetTop - headerHeight; // вычитаем высоту шапки

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		});
	};

	// отправка
	const formMain = document.getElementById('form');
	const formPopup = document.getElementById('form-popup');
	const formNext = document.getElementById('form-next');


	formMain.addEventListener('submit', formSendMain);

	formPopup.addEventListener('submit', formSendPopup);

	formNext.addEventListener('submit', formSendNext);

	async function formSendMain(e) {
		e.preventDefault();

		let error = formValidateMain(formMain);


		let formData = new FormData(formMain);

		if (error === 0) {

			let response = await fetch('sendmail-main.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formMain.reset();
			} else {
				alert('Ошибка');
			}
		}
	}

	async function formSendPopup(e) {
		e.preventDefault();

		let error = formValidateMain(formPopup);


		let formData = new FormData(formPopup);

		if (error === 0) {

			let response = await fetch('sendmail-next.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPopup.reset();
				tt.close();
			} else {
				alert('Error');
			}
		}
	}

	async function formSendNext(e) {
		e.preventDefault();

		let error = formValidateMain(formNext);


		let formData = new FormData(formNext);

		if (error === 0) {

			let response = await fetch('sendmail-vacancy.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formNext.reset();
				tt.close();
			} else {
				alert('Error');
			}
		}
	}


	// валидация
	function formValidateMain(form) {
		let error = 0;
		let formReq = form.querySelectorAll('._req');
		em = false;

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);


			if (input.value === '') {
				formAddError(input);
				error++
				em = false;
			}
		}
		return error;
	}


	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	const fileInput = document.querySelector('.form-popup__file-item');

	if (fileInput) {
		fileInput.addEventListener("change", function (e) {
			const buttonFile = document.querySelector('.button-file__text');
			buttonFile.textContent = fileInput.files[0].name;
		});
	}





	// Слайдеры

	function initSliders() {
		// Перечень слайдеров
		// Проверяем, есть ли слайдер на стронице
		if (document.querySelector('.products__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.products__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 4,
				spaceBetween: 22,
				speed: 800,
				loop: true,
				// autoplay: {
				// 	delay: 2000,
				// 	disableOnInteraction: false,
				// },
				//preloadImages: false,
				//lazy: true,

				scrollbar: {
					el: '.products-scrollbar',
					draggable: true,
				},


				// Кнопки "влево/вправо"
				navigation: {
					prevEl: '.products-button-prev',
					nextEl: '.products-button-next',
				},

				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 22,
					},
				},
			});
		}

		if (document.querySelector('.about__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.about__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 4,
				spaceBetween: 75,
				speed: 800,
				//loop: true,
				//initialSlide: 2,
				centeredSlides: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},

				breakpoints: {
					320: {
						slidesPerView: 1.8,
						spaceBetween: 50,
					},
					768: {
						slidesPerView: 3.5,
						spaceBetween: 50,
					},
					992: {
						slidesPerView: 4,
						spaceBetween: 75,
					},
				},
			});
		}

		if (document.querySelector('.partners__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.partners__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 4,
				spaceBetween: 40,
				speed: 800,
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},

				breakpoints: {
					320: {
						slidesPerView: 2,
						spaceBetween: 30,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
					992: {
						slidesPerView: 5,
						spaceBetween: 40,
					},
				},
			});
		}
	}

	window.addEventListener("load", function (e) {
		// Запуск инициализации слайдеров
		initSliders();

	});

	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains('lock')) {
			bodyUnlock(delay);
		} else {
			bodyLock(delay);
		}
	}
	let bodyUnlock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				document.documentElement.classList.remove("lock");
			}, delay);
			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	let bodyLock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			}
			body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			document.documentElement.classList.add("lock");

			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}

	let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

	function FLS(message) {
		setTimeout(() => {
			if (window.FLS) {
				console.log(message);
			}
		}, 0);
	}


	// Класс Popup
	class Popup {
		constructor(options) {
			let config = {
				logging: true,
				init: true,
				// Для кнопок 
				attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
				attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
				// Для сторонних объектов
				fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
				// Для объекта попапа
				youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
				youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
				setAutoplayYoutube: true,
				// Изменение классов
				classes: {
					popup: 'popup',
					// popupWrapper: 'popup__wrapper',
					popupContent: 'popup__content',
					popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
					bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
				},
				focusCatch: true, // Фокус внутри попапа зациклен
				closeEsc: true, // Закрытие по ESC
				bodyLock: true, // Блокировка скролла
				hashSettings: {
					location: true, // Хэш в адресной строке
					goHash: true, // Переход по наличию в адресной строке
				},
				on: { // События
					beforeOpen: function () { },
					afterOpen: function () { },
					beforeClose: function () { },
					afterClose: function () { },
				},
			}
			this.youTubeCode;
			this.isOpen = false;
			// Текущее окно
			this.targetOpen = {
				selector: false,
				element: false,
			}
			// Предыдущее открытое
			this.previousOpen = {
				selector: false,
				element: false,
			}
			// Последнее закрытое
			this.lastClosed = {
				selector: false,
				element: false,
			}
			this._dataValue = false;
			this.hash = false;

			this._reopen = false;
			this._selectorOpen = false;

			this.lastFocusEl = false;
			this._focusEl = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			//this.options = Object.assign(config, options);
			this.options = {
				...config,
				...options,
				classes: {
					...config.classes,
					...options?.classes,
				},
				hashSettings: {
					...config.hashSettings,
					...options?.hashSettings,
				},
				on: {
					...config.on,
					...options?.on,
				}
			}
			this.bodyLock = false;
			this.options.init ? this.initPopups() : null
		}
		initPopups() {
			this.popupLogging(`Проснулся`);
			this.eventsPopup();
		}
		eventsPopup() {
			// Клик на всем документе
			document.addEventListener("click", function (e) {
				// Клик по кнопке "открыть"
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
				if (buttonOpen) {
					e.preventDefault();
					this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
						buttonOpen.getAttribute(this.options.attributeOpenButton) :
						'error';
					this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
						buttonOpen.getAttribute(this.options.youtubeAttribute) :
						null;
					if (this._dataValue !== 'error') {
						if (!this.isOpen) this.lastFocusEl = buttonOpen;
						this.targetOpen.selector = `${this._dataValue}`;
						this._selectorOpen = true;
						this.open();
						return;

					} else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);

					return;
				}
				// Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
				const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
				if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && !e.target.closest('.iti__country-list') && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
			}.bind(this));
			// Закрытие по ESC
			document.addEventListener("keydown", function (e) {
				if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
				if (this.options.focusCatch && e.which == 9 && this.isOpen) {
					this._focusCatch(e);
					return;
				}
			}.bind(this))

			// Открытие по хешу
			if (this.options.hashSettings.goHash) {
				// Проверка изменения адресной строки
				window.addEventListener('hashchange', function () {
					if (window.location.hash) {
						this._openToHash();
					} else {
						this.close(this.targetOpen.selector);
					}
				}.bind(this))

				window.addEventListener('load', function () {
					if (window.location.hash) {
						this._openToHash();
					}
				}.bind(this))
			}
		}
		open(selectorValue) {
			if (bodyLockStatus) {
				// Если перед открытием попапа был режим lock
				this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;

				// Если ввести значение селектора (селектор настраивается в options)
				if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
					this.targetOpen.selector = selectorValue;
					this._selectorOpen = true;
				}
				if (this.isOpen) {
					this._reopen = true;
					this.close();
				}
				if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
				if (!this._reopen) this.previousActiveElement = document.activeElement;

				this.targetOpen.element = document.querySelector(this.targetOpen.selector);

				if (this.targetOpen.element) {
					// YouTube
					if (this.youTubeCode) {
						const codeVideo = this.youTubeCode;
						const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
						const iframe = document.createElement('iframe');
						iframe.setAttribute('allowfullscreen', '');

						const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
						iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

						iframe.setAttribute('src', urlVideo);

						if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
							const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
						}
						this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
					}
					if (this.options.hashSettings.location) {
						// Получение хэша и его выставление 
						this._getHash();
						this._setHash();
					}

					// До открытия
					this.options.on.beforeOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("beforePopupOpen", {
						detail: {
							popup: this
						}
					}));

					this.targetOpen.element.classList.add(this.options.classes.popupActive);
					document.documentElement.classList.add(this.options.classes.bodyActive);

					if (!this._reopen) {
						!this.bodyLock ? bodyLock() : null;
					}
					else this._reopen = false;

					this.targetOpen.element.setAttribute('aria-hidden', 'false');

					// Запоминаю это открытое окно. Оно будет последним открытым
					this.previousOpen.selector = this.targetOpen.selector;
					this.previousOpen.element = this.targetOpen.element;

					this._selectorOpen = false;

					this.isOpen = true;

					setTimeout(() => {
						this._focusTrap();
					}, 50);

					// После открытия
					this.options.on.afterOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("afterPopupOpen", {
						detail: {
							popup: this
						}
					}));
					this.popupLogging(`Открыл попап`);

				} else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
			}
		}
		close(selectorValue) {
			if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
				this.previousOpen.selector = selectorValue;
			}
			if (!this.isOpen || !bodyLockStatus) {
				return;
			}
			// До закрытия
			this.options.on.beforeClose(this);
			// Создаем свое событие перед закрытием попапа
			document.dispatchEvent(new CustomEvent("beforePopupClose", {
				detail: {
					popup: this
				}
			}));

			// YouTube
			if (this.youTubeCode) {
				if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
					this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
			}
			this.previousOpen.element.classList.remove(this.options.classes.popupActive);
			// aria-hidden
			this.previousOpen.element.setAttribute('aria-hidden', 'true');
			if (!this._reopen) {
				document.documentElement.classList.remove(this.options.classes.bodyActive);
				!this.bodyLock ? bodyUnlock() : null;
				this.isOpen = false;
			}
			// Очищение адресной строки
			this._removeHash();
			if (this._selectorOpen) {
				this.lastClosed.selector = this.previousOpen.selector;
				this.lastClosed.element = this.previousOpen.element;

			}
			// После закрытия
			this.options.on.afterClose(this);
			// Создаем свое событие после закрытия попапа
			document.dispatchEvent(new CustomEvent("afterPopupClose", {
				detail: {
					popup: this
				}
			}));

			setTimeout(() => {
				this._focusTrap();
			}, 50);

			this.popupLogging(`Закрыл попап`);
		}
		// Получение хэша 
		_getHash() {
			if (this.options.hashSettings.location) {
				this.hash = this.targetOpen.selector.includes('#') ?
					this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
			}
		}
		_openToHash() {
			let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
				document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
					null;

			const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
			if (buttons && classInHash) this.open(classInHash);
		}
		// Утсановка хэша
		_setHash() {
			history.pushState('', '', this.hash);
		}
		_removeHash() {
			history.pushState('', '', window.location.href.split('#')[0])
		}
		_focusCatch(e) {
			const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
			const focusArray = Array.prototype.slice.call(focusable);
			const focusedIndex = focusArray.indexOf(document.activeElement);

			if (e.shiftKey && focusedIndex === 0) {
				focusArray[focusArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
				focusArray[0].focus();
				e.preventDefault();
			}
		}
		_focusTrap() {
			const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
			if (!this.isOpen && this.lastFocusEl) {
				this.lastFocusEl.focus();
			} else {
				focusable[0].focus();
			}
		}
		// Функция вывода в консоль
		popupLogging(message) {
			this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
		}
	}

	// Запускаем и добавляем в объект модулей
	let tt = new Popup({});



	// селект
	let formValidate = {
		getErrors(form) {
			let error = 0;
			let formRequiredItems = form.querySelectorAll('*[data-required]');
			if (formRequiredItems.length) {
				formRequiredItems.forEach(formRequiredItem => {
					if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
						error += this.validateInput(formRequiredItem);
					}
				});
			}
			return error;
		},
		validateInput(formRequiredItem) {
			let error = 0;
			if (formRequiredItem.dataset.required === "email") {
				formRequiredItem.value = formRequiredItem.value.replace(" ", "");
				if (this.emailTest(formRequiredItem)) {
					this.addError(formRequiredItem);
					error++;
				} else {
					this.removeError(formRequiredItem);
				}
			} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
				this.addError(formRequiredItem);
				error++;
			} else {
				if (!formRequiredItem.value) {
					this.addError(formRequiredItem);
					error++;
				} else {
					this.removeError(formRequiredItem);
				}
			}
			return error;
		},
		addError(formRequiredItem) {
			formRequiredItem.classList.add('_form-error');
			formRequiredItem.parentElement.classList.add('_form-error');
			let inputError = formRequiredItem.parentElement.querySelector('.form__error');
			if (inputError) formRequiredItem.parentElement.removeChild(inputError);
			if (formRequiredItem.dataset.error) {
				formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
			}
		},
		removeError(formRequiredItem) {
			formRequiredItem.classList.remove('_form-error');
			formRequiredItem.parentElement.classList.remove('_form-error');
			if (formRequiredItem.parentElement.querySelector('.form__error')) {
				formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
			}
		},
		formClean(form) {
			form.reset();
			setTimeout(() => {
				let inputs = form.querySelectorAll('input,textarea');
				for (let index = 0; index < inputs.length; index++) {
					const el = inputs[index];
					el.parentElement.classList.remove('_form-focus');
					el.classList.remove('_form-focus');
					formValidate.removeError(el);
				}
				let checkboxes = form.querySelectorAll('.checkbox__input');
				if (checkboxes.length > 0) {
					for (let index = 0; index < checkboxes.length; index++) {
						const checkbox = checkboxes[index];
						checkbox.checked = false;
					}
				}
				if (flsModules.select) {
					let selects = form.querySelectorAll('.select');
					if (selects.length) {
						for (let index = 0; index < selects.length; index++) {
							const select = selects[index].querySelector('select');
							flsModules.select.selectBuild(select);
						}
					}
				}
			}, 0);
		},
		emailTest(formRequiredItem) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
		}
	}


	// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}

	function FLS(message) {
		setTimeout(() => {
			if (window.FLS) {
				console.log(message);
			}
		}, 0);
	}

	// Класс построения Select
	class SelectConstructor {
		constructor(props, data = null) {
			let defaultConfig = {
				init: true,
				logging: true,
			}
			this.config = Object.assign(defaultConfig, props);
			// CSS классы модуля
			this.selectClasses = {
				classSelect: "select", // Главный блок
				classSelectBody: "select__body", // Тело селекта
				classSelectTitle: "select__title", // Заголовок
				classSelectValue: "select__value", // Значение в заголовке
				classSelectLabel: "select__label", // Лабел
				classSelectInput: "select__input", // Поле ввода
				classSelectText: "select__text", // Оболочка текстовых данных
				classSelectLink: "select__link", // Ссылка в элементе
				classSelectOptions: "select__options", // Выпадающий список
				classSelectOptionsScroll: "select__scroll", // Оболочка при скролле
				classSelectOption: "select__option", // Пункт
				classSelectContent: "select__content", // Оболочка контента в заголовке
				classSelectRow: "select__row", // Ряд
				classSelectData: "select__asset", // Дополнительные данные
				classSelectDisabled: "_select-disabled", // Запрешен
				classSelectTag: "_select-tag", // Класс тега
				classSelectOpen: "_select-open", // Список открыт
				classSelectActive: "_select-active", // Список выбран
				classSelectFocus: "_select-focus", // Список в фокусе
				classSelectMultiple: "_select-multiple", // Мультивыбор
				classSelectCheckBox: "_select-checkbox", // Стиль чекбокса
				classSelectOptionSelected: "_select-selected", // Выбранный пункт
				classSelectPseudoLabel: "_select-pseudo-label", // Псевдолейбл
			}
			this._this = this;
			// Запуск инициализации
			if (this.config.init) {
				// Получение всех select на странице
				const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
				if (selectItems.length) {
					this.selectsInit(selectItems);
					this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
				} else {
					this.setLogging('Сплю, нет ни одного select zzZZZzZZz');
				}
			}
		}
		// Конструктор CSS класса
		getSelectClass(className) {
			return `.${className}`;
		}
		// Геттер элементов псевдоселекта
		getSelectElement(selectItem, className) {
			return {
				originalSelect: selectItem.querySelector('select'),
				selectElement: selectItem.querySelector(this.getSelectClass(className)),
			}
		}
		// Функция инициализации всех селектов
		selectsInit(selectItems) {
			selectItems.forEach((originalSelect, index) => {
				this.selectInit(originalSelect, index + 1);
			});
			// Обработчики событий...
			// ...при клике
			document.addEventListener('click', function (e) {
				this.selectsActions(e);
			}.bind(this));
			// ...при нажатии клавиши
			document.addEventListener('keydown', function (e) {
				this.selectsActions(e);
			}.bind(this));
			// ...при фокусе
			document.addEventListener('focusin', function (e) {
				this.selectsActions(e);
			}.bind(this));
			// ...при потере фокуса
			document.addEventListener('focusout', function (e) {
				this.selectsActions(e);
			}.bind(this));
		}
		// Функция инициализации конкретного селекта
		selectInit(originalSelect, index) {
			const _this = this;
			// Создаем оболочку
			let selectItem = document.createElement("div");
			selectItem.classList.add(this.selectClasses.classSelect);
			// Выводим оболочку перед оригинальным селектом
			originalSelect.parentNode.insertBefore(selectItem, originalSelect);
			// Помещаем оригинальный селект в оболочку
			selectItem.appendChild(originalSelect);
			// Скрываем оригинальный селект
			originalSelect.hidden = true;
			// Присваиваем уникальный ID
			index ? originalSelect.dataset.id = index : null;

			// Работа с плейсхолдером
			if (this.getSelectPlaceholder(originalSelect)) {
				// Запоминаем плейсхолдер
				originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
				// Если включен режим label
				if (this.getSelectPlaceholder(originalSelect).label.show) {
					const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
					selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
				}
			}
			// Конструктор основных элементов
			selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
			// Запускаем конструктор псевдоселекта
			this.selectBuild(originalSelect);

			// Запоминаем скорость
			originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
			// Событие при изменении оригинального select
			originalSelect.addEventListener('change', function (e) {
				_this.selectChange(e);
			});
		}
		// Конструктор псевдоселекта
		selectBuild(originalSelect) {
			const selectItem = originalSelect.parentElement;
			// Добавляем ID селекта
			selectItem.dataset.id = originalSelect.dataset.id;
			// Получаем класс оригинального селекта, создаем модификатор и добавляем его
			selectItem.classList.add(originalSelect.getAttribute('class') ? `select_${originalSelect.getAttribute('class')}` : "");
			// Если множественный выбор, добавляем класс
			originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
			// Cтилизация элементов под checkbox (только для multiple)
			originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
			// Сеттер значения заголовка селекта
			this.setSelectTitleValue(selectItem, originalSelect);
			// Сеттер элементов списка (options)
			this.setOptions(selectItem, originalSelect);
			// Если включена опция поиска data-search, запускаем обработчик
			originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
			// Если указана настройка data-open, открываем селект
			originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
			// Обработчик disabled
			this.selectDisabled(selectItem, originalSelect);
		}
		// Функция реакций на события
		selectsActions(e) {
			const targetElement = e.target;
			const targetType = e.type;
			if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
				const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
				const originalSelect = this.getSelectElement(selectItem).originalSelect;
				if (targetType === 'click') {
					if (!originalSelect.disabled) {
						if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
							// Обработка клика на тег
							const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
							const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
							this.optionAction(selectItem, originalSelect, optionItem);
						} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
							// Обработка клика на заголовок селекта
							this.selectAction(selectItem);
						} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
							// Обработка клика на элемент селекта
							const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
							this.optionAction(selectItem, originalSelect, optionItem);
						}
					}
				} else if (targetType === 'focusin' || targetType === 'focusout') {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
						targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
					}
				} else if (targetType === 'keydown' && e.code === 'Escape') {
					this.selectsСlose();
				}
			} else {
				this.selectsСlose();
			}
		}
		// Функция закрытия всех селектов
		selectsСlose(selectOneGroup) {
			const selectsGroup = selectOneGroup ? selectOneGroup : document;
			const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
			if (selectActiveItems.length) {
				selectActiveItems.forEach(selectActiveItem => {
					this.selectСlose(selectActiveItem);
				});
			}
		}
		// Функция закрытия конкретного селекта
		selectСlose(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (!selectOptions.classList.contains('_slide')) {
				selectItem.classList.remove(this.selectClasses.classSelectOpen);
				_slideUp(selectOptions, originalSelect.dataset.speed);
			}
		}
		// Функция открытия/закрытия конкретного селекта
		selectAction(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;

			// Если селекты помещенны в элемент с дата атрибутом data-one-select
			// закрываем все открытые селекты
			if (originalSelect.closest('[data-one-select]')) {
				const selectOneGroup = originalSelect.closest('[data-one-select]');
				this.selectsСlose(selectOneGroup);
			}

			if (!selectOptions.classList.contains('_slide')) {
				selectItem.classList.toggle(this.selectClasses.classSelectOpen);
				_slideToggle(selectOptions, originalSelect.dataset.speed);
			}
		}
		// Сеттер значения заголовка селекта
		setSelectTitleValue(selectItem, originalSelect) {
			const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
			const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
			if (selectItemTitle) selectItemTitle.remove();
			selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
		}
		// Конструктор значения заголовка
		getSelectTitleValue(selectItem, originalSelect) {
			// Получаем выбранные текстовые значения
			let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
			// Обработка значений мультивыбора
			// Если включен режим тегов (указана настройка data-tags)
			if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
				selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
				// Если вывод тегов во внешний блок
				if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
					document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
					if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
				}
			}
			// Значение(я) или плейсхолдер
			selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
			// Если включен режим pseudo
			let pseudoAttribute = '';
			let pseudoAttributeClass = '';
			if (originalSelect.hasAttribute('data-pseudo-label')) {
				pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
				pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
			}
			// Если есть значение, добавляем класс
			this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
			// Возвращаем поле ввода для поиска или текст
			if (originalSelect.hasAttribute('data-search')) {
				// Выводим поле ввода для поиска
				return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
			} else {
				// Если выбран элемент со своим классом
				const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
				// Выводим текстовое значение
				return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
			}
		}
		// Конструктор данных для значения заголовка
		getSelectElementContent(selectOption) {
			// Если для элемента указан вывод картинки или текста, перестраиваем конструкцию
			const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
			const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
			let selectOptionContentHTML = ``;
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
			selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
			selectOptionContentHTML += selectOption.textContent;
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			selectOptionContentHTML += selectOptionData ? `</span>` : '';
			return selectOptionContentHTML;
		}
		// Получение данных плейсхолдера
		getSelectPlaceholder(originalSelect) {
			const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
			if (selectPlaceholder) {
				return {
					value: selectPlaceholder.textContent,
					show: selectPlaceholder.hasAttribute("data-show"),
					label: {
						show: selectPlaceholder.hasAttribute("data-label"),
						text: selectPlaceholder.dataset.label
					}
				}
			}
		}
		// Получение данных из выбранных элементов
		getSelectedOptionsData(originalSelect, type) {
			// Получаем все выбранные объекты из select
			let selectedOptions = [];
			if (originalSelect.multiple) {
				// Если мультивыбор
				// Убираем плейсхолдер, получаем остальные выбранные элементы
				selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
			} else {
				// Если единичный выбор
				selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
			}
			return {
				elements: selectedOptions.map(option => option),
				values: selectedOptions.filter(option => option.value).map(option => option.value),
				html: selectedOptions.map(option => this.getSelectElementContent(option))
			}
		}
		// Конструктор элементов списка
		getOptions(originalSelect) {
			// Настрока скролла элементов
			let selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
			let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : '';
			// Получаем элементы списка
			let selectOptions = Array.from(originalSelect.options);
			if (selectOptions.length > 0) {
				let selectOptionsHTML = ``;
				// Если указана настройка data-show, показываем плейсхолдер в списке
				if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
					selectOptions = selectOptions.filter(option => option.value);
				}
				// Строим и выводим основную конструкцию
				selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : '';
				selectOptions.forEach(selectOption => {
					// Получаем конструкцию конкретного элемента списка
					selectOptionsHTML += this.getOption(selectOption, originalSelect);
				});
				selectOptionsHTML += selectOptionsScroll ? `</div>` : '';
				return selectOptionsHTML;
			}
		}
		// Конструктор конкретного элемента списка
		getOption(selectOption, originalSelect) {
			// Если элемент выбран и включен режим мультивыбора, добавляем класс
			const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
			// Если элемент выбрани и нет настройки data-show-selected, скрываем элемент
			const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
			// Если для элемента указан класс добавляем
			const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
			// Если указан режим ссылки
			const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
			const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
			// Строим и возвращаем конструкцию элемента
			let selectOptionHTML = ``;
			selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
			selectOptionHTML += this.getSelectElementContent(selectOption);
			selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
			return selectOptionHTML;
		}
		// Сеттер элементов списка (options)
		setOptions(selectItem, originalSelect) {
			// Получаем объект тела псевдоселекта
			const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			// Запускаем конструктор элементов списка (options) и добавляем в тело псевдоселекта
			selectItemOptions.innerHTML = this.getOptions(originalSelect);
		}
		// Обработчик клика на элемент списка
		optionAction(selectItem, originalSelect, optionItem) {
			if (originalSelect.multiple) { // Если мультивыбор
				// Выделяем классом элемент
				optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
				// Очищаем выбранные элементы 
				const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
				originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
					originalSelectSelectedItem.removeAttribute('selected');
				});
				// Выбираем элементы 
				const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
				selectSelectedItems.forEach(selectSelectedItems => {
					originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
				});
			} else { // Если единичный выбор
				// Если не указана настройка data-show-selected, скрываем выбранный элемент
				if (!originalSelect.hasAttribute('data-show-selected')) {
					// Сначала все показать
					if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
						selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
					}
					// Скрываем выбранную
					optionItem.hidden = true;
				}
				originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
				this.selectAction(selectItem);
			}
			// Обновляем заголовок селекта
			this.setSelectTitleValue(selectItem, originalSelect);
			// Вызываем реакцию на изменение селекта
			this.setSelectChange(originalSelect);
		}
		// Реакция на измененение оригинального select
		selectChange(e) {
			const originalSelect = e.target;
			this.selectBuild(originalSelect);
			this.setSelectChange(originalSelect);
		}
		// Обработчик изменения в селекте
		setSelectChange(originalSelect) {
			// Моментальная валидация селекта
			if (originalSelect.hasAttribute('data-validate')) {
				formValidate.validateInput(originalSelect);
			}
			// При изменении селекта отправляем форму
			if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
				let tempButton = document.createElement("button");
				tempButton.type = "submit";
				originalSelect.closest('form').append(tempButton);
				tempButton.click();
				tempButton.remove();
			}
			const selectItem = originalSelect.parentElement;
			// Вызов коллбэк функции
			this.selectCallback(selectItem, originalSelect);
		}
		// Обработчик disabled
		selectDisabled(selectItem, originalSelect) {
			if (originalSelect.disabled) {
				selectItem.classList.add(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
			} else {
				selectItem.classList.remove(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
			}
		}
		// Обработчик поиска по элементам списка
		searchActions(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
			const _this = this;
			selectInput.addEventListener("input", function () {
				selectOptionsItems.forEach(selectOptionsItem => {
					if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) {
						selectOptionsItem.hidden = false;
					} else {
						selectOptionsItem.hidden = true;
					}
				});
				// Если список закрыт открываем
				selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
			});
		}
		// Коллбэк функция
		selectCallback(selectItem, originalSelect) {
			document.dispatchEvent(new CustomEvent("selectCallback", {
				detail: {
					select: originalSelect
				}
			}));
		}
		// Логгинг в консоль
		setLogging(message) {
			this.config.logging ? FLS(`[select]: ${message}`) : null;
		}
	}
	// Запускаем
	new SelectConstructor({});


	// выбор языка
	const languageButton = document.querySelector('.language-header__item');
	const languageList = document.querySelector('.language-header__list');


	if (languageButton) {
		languageButton.addEventListener("click", function (e) {
			_slideToggle(languageList, 300);
			languageButton.querySelector('.language-header__arrow').classList.toggle('language-header__arrow-act');
		});

		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (!targetElement.closest('.language-header')) {
				_slideUp(languageList, 300);
				languageButton.querySelector('.language-header__arrow').classList.remove('language-header__arrow-act');
			}
		});

	}



	// футер
	const languageButtonF = document.querySelector('.language-footer__item');
	const languageListF = document.querySelector('.language-footer__list');


	if (languageButtonF) {
		languageButtonF.addEventListener("click", function (e) {
			_slideToggle(languageListF, 300);
			languageButtonF.querySelector('.language-footer__arrow').classList.toggle('language-footer__arrow-act');
		});

		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (!targetElement.closest('.language-footer')) {
				_slideUp(languageListF, 300);
				languageButtonF.querySelector('.language-footer__arrow').classList.remove('language-footer__arrow-act');
			}
		});

	}






	// Динамический адаптив
	function DynamicAdapt(type) {
		this.type = type;
	}
	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");
		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}
		this.arraySort(this.оbjects);
		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});
		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];
			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};
	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			//for (let i = 0; i < оbjects.length; i++) {
			for (let i = оbjects.length - 1; i >= 0; i--) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};
	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}
	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}
	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};
	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};
	const da = new DynamicAdapt("max");
	da.init();

	

	var input = document.querySelector(".telephone");


	$(".telephone").intlTelInput({
		//separateDialCode: true,
	});



  $('.telephone').each(function() {
	$(this).on("countrychange", function() {
	  var countryCode = $(this).intlTelInput("getSelectedCountryData").dialCode;
	  var phoneNumber = $(this).val().replace(/\D/g,'');
	  if (phoneNumber.indexOf(countryCode) !== 0) {
		$(this).val("+" + countryCode + phoneNumber);
	  }
	});
  });


  //Добавление кода страны к номеру телефона при изменении выбранной страны
// $("#telephone").on("countrychange", function() {
// 	var countryCode = $("#telephone").intlTelInput("getSelectedCountryData").dialCode;
// 	var phoneNumber = $("#telephone").val().replace(/\D/g,'');
// 	if (phoneNumber.indexOf(countryCode) !== 0) {
// 	  $("#telephone").val("+" + countryCode + phoneNumber);
// 	}
//   });
	

});



