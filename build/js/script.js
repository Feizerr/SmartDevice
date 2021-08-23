'use strict';

// accordion

var minHeight = 0;
var accordionItemHeaders = document.querySelectorAll('.accordion__item > h2');
var accordionItemsBody = document.querySelectorAll('.accordion__item-body');
var padding = 30;

var addTabIndex = function () {
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 767) {
      accordionItemHeaders.forEach(function (header) {
        header.setAttribute('tabindex', 0);
      });
    }

    else {
      accordionItemHeaders.forEach(function (header) {
        header.removeAttribute('tabindex');
      });
    }
  })
}

addTabIndex();

accordionItemsBody.forEach(function (accordionItem) {
  accordionItem.classList.remove('accordion__no-js');
})

var useAccordion = function (element) {
  var currentlyActiveAccordionItemHeader = document.querySelector('.accordion__item > h2.active');
  if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== element) {
    currentlyActiveAccordionItemHeader.classList.toggle('active');
    currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = minHeight;
  }

  element.classList.toggle('active');
  var accordionItemBody = element.nextElementSibling;
  if (element.classList.contains('active')) {
    accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + padding + 'px';
  } else {
    accordionItemBody.style.maxHeight = minHeight;
  }
};

accordionItemHeaders.forEach(function (accordionItemHeader) {
  accordionItemHeader.addEventListener('click', function () {
    useAccordion(accordionItemHeader);
  });

  accordionItemHeader.addEventListener('keydown', function () {
    useAccordion(accordionItemHeader);
  });
})


// mask

var backspace = 'Backspace';
var startTemplate = '+7(';
var shortTemplate = '7(';
var shortenedStartTemplate = '+7';
var textPlus = '+';
var openBracket = '(';
var openBracketKeyCode = 219;
var shiftKeyCode = 'Shift';
var closingBracket = ')';

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
        input.value = input.value + closingBracket;
      }

      if (numberLength === 0 && (evt.key === backspace || evt.key === shiftKeyCode)) {
        input.value = startTemplate;
        evt.preventDefault();
      }

      if (numberLength === 0) {
        input.value = startTemplate;
      }

      if (numberLength === 1 && input.value === textPlus && evt.key !== backspace) {
        input.value += shortTemplate;
      }

      if (numberLength === 2 && input.value === shortenedStartTemplate && evt.key !== backspace && evt.key !== openBracketKeyCode)  {
        input.value += openBracket;
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

// pop-up

var buttonShowModal = document.querySelector('.header__button');
var closeModal = document.querySelector('.modal__close');
var buttonSend = document.querySelector('.modal__button');
var overlay = document.querySelector('.modal');
var body = document.querySelector('.body');

var changePopupCondition = function () {
  overlay.classList.toggle('modal__show');

  if (overlay.classList.contains('modal__show')) {
    personNameFromModal.focus();
  }

  body.classList.toggle('modal__hidden');
}

buttonShowModal.addEventListener('click', function (evt) {
  evt.preventDefault();
  changePopupCondition()
});

closeModal.addEventListener('click', function () {
  changePopupCondition();
});

buttonSend.addEventListener('onsubmit', function () {
  changePopupCondition();
});

window.addEventListener('keydown', function (evt) {
  if (evt.key === 27 || evt.key === 'Escape') {

    if (overlay.classList.contains('modal__show')) {
      evt.preventDefault();
      changePopupCondition();
    }
  }
});

document.onclick = function (e) {
  if (e.target === overlay) {
    changePopupCondition();
  }
};
