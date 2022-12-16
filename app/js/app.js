document.addEventListener('DOMContentLoaded', () => {

  // Общие переменные
  let body = document.querySelector('body');

  // air datepicker
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let offset = 2;
  let max = new Date(year, month + offset, day);

  new AirDatepicker('#start-date', {
    minDate: new Date(),
    maxDate: max,
    autoClose: true,
  });

  // Digits only
  let inputDigitsOnly = document.querySelector('#guest');
  inputDigitsOnly.oninput = function() {
    this.value = this.value.replace(/[^1-9\.]/g, '');
  }

  // room description
  let roomsItemContent = document.querySelectorAll('.rooms-item-content');

  roomsItemContent.forEach((item) => {
    item.onclick = function(){
      item.classList.toggle('active');
    }
  });

  // About swiper slider
  const aboutSlider = new Swiper('.about-slider', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Testimonials swiper slider
  const testimonialsSlider = new Swiper('.testimonials-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
  });

  // Мобильное меню
  let burgerMenuWrapper = document.querySelector('.burger-menu-wrapper'),
      mobileMenu = document.querySelector('.mobile-menu'),
      burgerMenu = document.querySelector('.burger-menu');

  burgerMenuWrapper.onclick = function () {
    body.classList.toggle('overflow-hidden');
    burgerMenuWrapper.classList.toggle('active');
    mobileMenu.classList.toggle('mobile-menu-open');
    burgerMenu.classList.toggle('close');
  }

  // закрытие меню при клике на parent элемент
  let listParentClick = document.querySelectorAll('.mobile-menu .menu-item a');
  for (let i = 0; i < listParentClick.length; i++) {
    listParentClick[i].onclick = function (event) {
      event.preventDefault();
      closeMenu ();
      let hrefClick = this.href;
      setTimeout(function() {location.href = hrefClick}, 700);
    }
  }

  function closeMenu () {
    body.classList.remove('overflow-hidden');
    burgerMenuWrapper.classList.remove('active');
    mobileMenu.classList.remove('mobile-menu-open');
    burgerMenu.classList.remove('close');
  }

  // Окна
  let callbackBtn = document.querySelectorAll('.js-callback-btn'),
      mobileMenuCallbackBtn = document.querySelector('.mobile-menu-callback-btn'),
      callbackModal = document.querySelector('#callback-modal'),
      modalWindow = document.querySelectorAll('.modal-window'),
      modalCloseBtn = document.querySelectorAll('.modal-window .modal-close');

  // Открытие окна обратной связи
  for (let i = 0; i < callbackBtn.length; i++) {
    callbackBtn[i].onclick = function() {
      modalOpen(callbackModal);
    }
  }

  mobileMenuCallbackBtn.onclick = function() {
    closeMenu();
    modalOpen(callbackModal);
  }

  function modalOpen(win) {
    body.classList.add('overflow-hidden');
    win.style.display = "block";
    win.childNodes[1].classList.add('active')
  }
  
  // Закрытие окон
  for (let i = 0; i < modalCloseBtn.length; i++) {
    modalCloseBtn[i].onclick = function() {
      modalClose(modalWindow[i]);
    }
  }

  for (let i = 0; i < modalWindow.length; i++) {
    modalWindow[i].onclick = function(event) {
      let classList = event.target.classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j] == "modal-window" || classList[j] == "modal-wrapper") {
          modalClose(modalWindow[i])
        }
      }
    }
  }

  function modalClose(win) {
    body.classList.remove('overflow-hidden');
    win.style.display = "";
    win.childNodes[1].classList.remove('active');
  }

  // Order btn and insert hidden data
  let orderBtn = document.querySelector('.order-btn');

  orderBtn.onclick = orderBtnFn;
  
  function orderBtnFn() { 
    let startDate = document.querySelector('#start-date'),
        guest = document.querySelector('#guest');

    if (startDate.value == "") {
      startDate.classList.add('required');
    } else {
      startDate.classList.remove('required');
    }
    if (guest.value == "") {
      guest.classList.add('required');
    } else {
      guest.classList.remove('required');
    }
    if (startDate.value != "" && guest.value != "") {
      document.querySelector('#modal-start-date').value = startDate.value;
      document.querySelector('#modal-guest').value = guest.value;
      document.querySelector('#start-date').value = '';
      document.querySelector('#guest').value = '';
      modalOpen(callbackModal);
    }
  }

  // Отправка формы ajax
  let callbackModalForm = document.querySelector("#callback-modal-form"),
      callbackModalFormBtn = document.querySelector('.js-callback-modal-btn');

  callbackModalFormBtn.onclick = function(event) {
    ajaxSend(callbackModalForm);
  }

  function ajaxSend(form) {  
    event.preventDefault();

    // Проверка обязательных полей
    let input = form.querySelectorAll('.input-field');
    let arr = [];
    for (let i = 0; i < input.length; i++) {
      let attr = input[i].hasAttribute('required');
      if (attr && input[i].value == "" ) {
        input[i].classList.add('required');
        arr.push(false);
      }
    }

    if (arr.length == 0) {
      for (let i = 0; i < input.length; i++) {
        input[i].classList.remove('required');
      }

      // Создание объекта
      let formData = {
        name: form.querySelector('.name').value,
        phone: form.querySelector('.phone').value,
        startDate: form.querySelector('#modal-start-date').value,
        guest: form.querySelector('#modal-guest').value,
        checkbox: form.querySelector('.custom-checkbox').checked,
      };

      // Передача
      let request = new XMLHttpRequest();

      request.open('post', "phpmailer/mailer.php");
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send('name=' + encodeURIComponent(formData.name) + '&phone=' + encodeURIComponent(formData.phone) + '&start_date=' + encodeURIComponent(formData.startDate) + '&guest=' + encodeURIComponent(formData.guest) + '&checkbox=' + encodeURIComponent(formData.checkbox));

      // Сообщение
      alert("Спасибо. Мы свяжемся с вами.");

      // Очистка формы
      form.reset();
    }

  }

  // Input mask
  let elementPhone = document.querySelector('#callback-phone');

  let maskOptionsPhone = {
    mask: '+{7} (000) 000 00 00'
  };

  let mask = IMask(elementPhone, maskOptionsPhone);

  // Current year
  let footerCityYear = document.querySelector('.city-year');
  footerCityYear.innerText = 'Миасс ' + year;

});