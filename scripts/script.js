'use strict';

$('#orderBtn').click(function () {

    let product = $('#choiceOrder');
    let name = $('#nameInput');
    let phone = $('#phoneInput');
    let hasError = false;
    let loader = $('.loader');
    let order = $('#order');

    Inputmask({mask: "+34 (999) 999-999"}).mask(phone);

    $('.error-message').hide();


    if (!name.val()) {
        name.next().show();
        name.addClass('error');
        hasError = true;
    } else {
        name.removeClass('error');
    }

    if (!product.val()) {
        product.next().show();
        product.addClass('error');
        hasError = true;
    }else {
        product.removeClass('error');
    }


    if (!phone.val()) {
        phone.next().show();
        phone.addClass('error');
        hasError = true;
    }else {
        phone.removeClass('error');
    }


    if (!hasError) {
        loader.css('display', 'flex');

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: name.val(), product: product.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success === 1) {
                    const orderData = document.querySelector('.order__form');
                    orderData.style.display = 'none';
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!';
                    const container = document.querySelector('.order__container');

                    container.appendChild(successMessage);


                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');

                }
            });
    }
})
// document.getElementById('burger').onclick = function () {
//     document.getElementById('menu').classList.add('#menuModal');
// }

document.getElementById('burger').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'block';
};

document.getElementById('menu__close').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'none';
};































