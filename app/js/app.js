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


  // room description
  let roomsItemContent = document.querySelectorAll('.rooms-item-content');

  roomsItemContent.forEach((item) => {
    item.onclick = function(){
      item.classList.toggle('active');
    }
  });

  




  // swiper
  // var swiper = new Swiper(".mySwiper", {
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
  // });

  // Photoswipe

  // const lightbox = new PhotoSwipeLightbox({
  //   gallery: '.rooms-item-gallery',
  //   children: 'a',
  //   pswpModule: () => import('../../libs/photoswipe/dist/photoswipe.esm.js')
  // });
  // lightbox.init();
  

  // Мобильное меню
  let burgerMenuWrapper = document.querySelector('.burger-menu-wrapper'),
      mobileMenu = document.querySelector('.mobile-menu'),
      burgerMenu = document.querySelector('.burger-menu');

  burgerMenuWrapper.onclick = function () {
    body.classList.toggle('overflow-hidden');
    mobileMenu.classList.toggle('down');
    burgerMenu.classList.toggle('close');
  }

  // закрытие меню при клике на parent элемент
  // let listParentClick = document.querySelectorAll('.mobile-menu .menu-item a');
  // for (let i = 0; i < listParentClick.length; i++) {
  //   listParentClick[i].onclick = closeMenu;
  // }

  function closeMenu (event) {
    event.preventDefault();
    body.classList.remove('overflow-hidden');
    mobileMenu.classList.remove('down');
    burgerMenu.classList.remove('close');
    let hrefClick = this.href;
    setTimeout(function() {location.href = hrefClick}, 700);
  }

  // Окна
  let callbackBtn = document.querySelectorAll('.callback-btn'),
      callbackModal = document.querySelector('#callback-modal'),
      modalWindow = document.querySelectorAll('.modal-window'),
      modalCloseBtn = document.querySelectorAll('.modal-window .modal-close');

  // Открытие окна обратной связи
  for (let i = 0; i < callbackBtn.length; i++) {
    callbackBtn[i].onclick = function() {
      modalOpen(callbackModal);
    }
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
        checkbox: form.querySelector('.custom-checkbox').checked,
      };

      // Передача
      let request = new XMLHttpRequest();

      request.open('post', "phpmailer/mailer.php");
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send('name=' + encodeURIComponent(formData.name) + '&phone=' + encodeURIComponent(formData.phone) + '&checkbox=' + encodeURIComponent(formData.checkbox));

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