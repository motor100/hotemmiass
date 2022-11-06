import PhotoSwipeLightbox from '../../libs/photoswipe/dist/photoswipe-lightbox.esm.js';
import Swiper from '../../libs/swiper/swiper-bundle.esm.browser.min.js';

document.addEventListener('DOMContentLoaded', () => {

  // air datepicker
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let offset = 2;
  let max = new Date(year, month + offset, day);

  new AirDatepicker('#header-in-select', {
    minDate: new Date(),
    maxDate: max,
    autoClose: true,
  });

  // swiper
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  // Photoswipe
  const lightbox = new PhotoSwipeLightbox({
    gallery: '.my-gallery',
    children: 'a',
    pswpModule: () => import('../../libs/photoswipe/dist/photoswipe.esm.js')
  });
  lightbox.init();
  

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
  let btns = document.querySelectorAll('.btn-click'),
      privacyPolicyBtn = document.querySelectorAll('.privacy-policy-btn'),
      feedbackModal = document.querySelector('#feedback-modal'),
      chess1Modal = document.querySelector('#chess1-modal'),
      chess2Modal = document.querySelector('#chess2-modal'),
      chess3Modal = document.querySelector('#chess3-modal'),
      chess4Modal = document.querySelector('#chess4-modal'),
      mahankovModal = document.querySelector('#mahankov-modal'),
      privacyPolicyModal = document.querySelector('#privacy-policy-modal'),
      modal = document.querySelectorAll('.modal'),
      modalCloseBtn = document.querySelectorAll('.modal-close'),
      teamPhoto = document.querySelectorAll('.team-item .photo'),
      more = document.querySelectorAll('.more');

  // Открытие окна обратной связи
  // for (let i = 0; i < btns.length; i++) {
  //   btns[i].onclick = function() {
  //     modalOpen(feedbackModal);
  //   }
  // }
  
  // Открытие окон шахматки chess
  // more[0].onclick = function() {
  //   modalOpen(chess1Modal);
  // }
  // more[1].onclick = function() {
  //   modalOpen(chess2Modal);
  // }
  // more[2].onclick = function() {
  //   modalOpen(chess3Modal);
  // }
  // more[3].onclick = function() {
  //   modalOpen(chess4Modal);
  // }

  // Открытие окон команды
  // teamPhoto[0].onclick = function() {
  //   modalOpen(mahankovModal);
  // }

  // Открытие окна политики
  // privacyPolicyBtn[0].onclick = privacyPolicyBtn[1].onclick = privacyPolicyModalOpen;

  function privacyPolicyModalOpen() {
    modalClose(modal[0]);
    modalOpen(privacyPolicyModal);
  }

  function modalOpen(win) {
    body.classList.add('overflow-hidden');
    win.style.display = "block";
  }
  
  // Закрытие окон
  // for (let i = 0; i < modalCloseBtn.length; i++) {
  //   modalCloseBtn[i].onclick = function() {
  //     modalClose(modal[i]);
  //   }
  // }

  // for (let i = 0; i < modal.length; i++) {
  //   modal[i].onclick = function(event) {
  //     let classList = event.target.classList;
  //     for (let j = 0; j < classList.length; j++) {
  //       if (classList[j] == "modal") {
  //         modalClose(modal[i])
  //       }
  //     }
  //   }
  // }

  function modalClose(n) {
    body.classList.remove('overflow-hidden');
    n.style.display = "";
  }

  // Отправка формы ajax
  let feedbackForm = document.querySelector("#feedback-form"),
      modalForm = document.querySelector("#modal-form"),
      feedbackFormBtn = document.querySelector('.form-btn'),
      modalFormBtn = document.querySelector('.modal-btn');

  // feedbackFormBtn.onclick = function(event) {
  //   ajaxSend(feedbackForm);
  // }
  // modalFormBtn.onclick = function(event) {
  //   ajaxSend(modalForm);
  // }
    
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
        email: form.querySelector('.email').value,
        message: form.querySelector('.message').value
      };

      // Передача
      let request = new XMLHttpRequest();

      request.open('post', "mailer.php");
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send('name=' + encodeURIComponent(formData.name) + '&phone=' + encodeURIComponent(formData.phone) + '&email=' + encodeURIComponent(formData.email) + '&message=' +   encodeURIComponent(formData.message));

      // Сообщение
      alert("Спасибо. Мы свяжемся с вами.");

      // Очистка формы
      form.reset();
    }

  }

})