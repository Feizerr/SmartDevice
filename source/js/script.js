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

var form = document.querySelector('.question__form');
var personName = form.querySelector('#name');
var personPhone = form.querySelector('#phone');

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
    personPhone.focus();
    if (storagePhone) {
      personPhone.value = storagePhone;
    }
  } else {
    personName.focus();
  }
});

form.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('name', personName.value);
    localStorage.setItem('phone', personPhone.value);
  }
});

//pop-up

var modal = document.querySelector(".modal");
var buttonShowModal = document.querySelector(".header__button");
var closeModal = document.querySelector(".modal__close");
var buttonSend = document.querySelector(".modal__button");

buttonShowModal.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.add("modal__show");
});

closeModal.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.remove("modal-show");
});

buttonSend.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.remove("modal__show");
});

window.addEventListener("keydown", function(evt) {
	if (evt.key === 27) {
		if (modal.classList.contains("modal__show")) {
			evt.preventDefault();
			modal.classList.remove("modal__show");
	}
}
})
