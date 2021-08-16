'use strict';

var minHeight = 0;
var accordionItemHeaders = document.querySelectorAll('.accordion__item-header');

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener('click', event => {
        var currentlyActiveAccordionItemHeader = document.querySelector('.accordion__item-header.active');
        if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
            currentlyActiveAccordionItemHeader.classList.toggle('active');
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = minHeight;

        }

        accordionItemHeader.classList.toggle('active');
        var accordionItemBody = accordionItemHeader.nextElementSibling;
        if(accordionItemHeader.classList.contains('active')) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
        }
        else {
            accordionItemBody.style.maxHeight = minHeight;
        }
    });
})

//mask

var backspace = 'Backspace';
var startTemplate = '+7(';
var bracket = ')';


var validation = function () {

    var phone = document.querySelectorAll('[type=tel]');

    var addMask = function (input) {
      input.addEventListener('focus', function (evt) {
        if (!input.value && evt.key !== backspace) {
          input.value = startTemplate;
        } else {
          return;
        }
      });

      input.addEventListener('keydown', function (evt) {
        var numberLength = input.value.length;

        if (numberLength === 6 && evt.key !== backspace) {
          input.value = input.value + bracket;
        }

        if (numberLength === 0) {
          input.value = startTemplate;
        }
      });
    };

    if (phone) {
      for (var i = 0; i < phone.length; i++) {
        addMask(phone[i]);
      }
    }
};

validation();

// localStorage

var questionForm = document.querySelector('.question__form');
var personNameFromQuestionForm = questionForm.querySelector('#name');
var personPhoneFromQuestionForm = questionForm.querySelector('#phone');
var modalForm = document.querySelector('.modal__form');
var personNameFromModal = modalForm.querySelector('#modal-name');
var personPhoneFromModal = modalForm.querySelector('#modal-phone');

var addDataFromLocalStorage = function (form, personName, personPhone) {
  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  window.addEventListener('load', function () {
    if (storageName) {
      personName.value = storageName;
      if (storagePhone) {
        personPhone.value = storagePhone;
      }
    }
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('name', personName.value);
      localStorage.setItem('phone', personPhone.value);
    }
  });
};

addDataFromLocalStorage(questionForm, personNameFromQuestionForm, personPhoneFromQuestionForm);
addDataFromLocalStorage(modalForm, personNameFromModal, personPhoneFromModal);

//pop-up

var buttonShowModal = document.querySelector(".header__button");
var closeModal = document.querySelector(".modal__close");
var buttonSend = document.querySelector(".modal__button");
var overlay = document.querySelector(".modal");

buttonShowModal.addEventListener("click", function(evt) {
	evt.preventDefault();
	overlay.classList.add("modal__show");
  personNameFromModal.focus();
});

closeModal.addEventListener("click", function() {
	overlay.classList.remove("modal__show");
});

buttonSend.addEventListener("onsubmit", function() {
  overlay.classList.remove("modal__show");
});

window.addEventListener("keydown", function(evt) {
	if (evt.key === 27 || evt.key === "Escape") {
		if (modal.classList.contains("modal__show")) {
			evt.preventDefault();
			overlay.classList.remove("modal__show");
	  }
  }
})

document.onclick = function(e){
  if (e.target === overlay) {
    overlay.classList.remove("modal__show");
  };
};

