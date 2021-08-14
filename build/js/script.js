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
