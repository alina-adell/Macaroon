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

    }
    if (!product.val()) {
        product.next().show();
        product.addClass('error');
        hasError = true;

    }

    if (!phone.val()) {
        phone.next().show();
        phone.addClass('error');
        hasError = true;

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
                if (msg.success === 1 && msg.name === "itlogia") {

            const orderData = document.querySelector('.order');
            orderData.style.display = 'none';

            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!';


            document.body.appendChild(successMessage);
        } else {
            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
        }

            });
    }
})































