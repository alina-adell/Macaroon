//
// const phoneInput =  document.getElementById('phoneInput');
// const nameInput =  document.getElementById('nameInput');
// const choiceOrder = document.getElementById('choiceOrder')
// const orderBtn = document.getElementById( 'orderBtn');
//
// Inputmask({mask: "+34 (999) 999-999" }).mask(phoneInput);
//
// function validateName(nameValue) {
//     return !!nameValue.trim();
// }
//
// function validatePhone(phoneValue) {
//     if (phoneInput.value.length === 17) {
//         return !!phoneValue.trim();
//     } else {
//         return false;
//     }
// }
// function validateOrder(orderValue) {
//     return !!orderValue.trim();
// }
//
//
// orderBtn.addEventListener('click', function() {
//     const phoneValue = phoneInput.value.trim();
//     const nameValue = nameInput.value.trim();
//     const orderValue = choiceOrder.value.trim();
//
//     const isValidName = validateName(nameValue);
//     const isValidPhone = validatePhone(phoneValue);
//     const isValidOrder = validateOrder(orderValue);
//
//     if (!isValidName) {
//         const nameError = document.getElementById('nameError');
//         nameError.textContent = 'Введите ваше имя';
//         nameInput.classList.add('error');
//     } else {
//         const nameError = document.getElementById('nameError');
//         nameError.textContent = '';
//         nameInput.classList.remove('error');
//     }
//
//     if (!isValidPhone) {
//         const phoneError = document.getElementById('phoneError');
//         phoneError.textContent = 'Необходимо ввести номер телефона полностью';
//         phoneInput.classList.add('error');
//     } else {
//         const phoneError = document.getElementById('phoneError');
//         phoneError.textContent = '';
//         phoneInput.classList.remove('error');
//     }
//     if (!isValidOrder) {
//         const orderError = document.getElementById('orderError');
//         orderError.textContent = 'Сделайте выбор';
//         choiceOrder.classList.add('error');
//     } else {
//         const orderError = document.getElementById('orderError');
//         orderError.textContent = '';
//         choiceOrder.classList.remove('error');
//     }
//     if (isValidName && isValidPhone && isValidOrder) {
//         // Отправить форму здесь
//     }
// });

const phoneInput = document.getElementById('phoneInput');
const nameInput = document.getElementById('nameInput');
const choiceOrder = document.getElementById('choiceOrder');
const orderBtn = document.getElementById('orderBtn');
const loader = document.getElementById('loader'); // Assuming a loader element exists

Inputmask({ mask: "+34 (999) 999-999" }).mask(phoneInput);

function validateName(nameValue) {
    return !!nameValue.trim();
}

function validatePhone(phoneValue) {
    // Проверка после ввода всех цифр
    if (phoneInput.value.length === 17) {
        return !!phoneValue.trim();
    } else {
        return false;
    }
}

function validateOrder(orderValue) {
    return !!orderValue.trim();
}

function submitForm() {
    const phoneValue = phoneInput.value.trim();
    const nameValue = nameInput.value.trim();
    const orderValue = choiceOrder.value.trim();

    const isValidName = validateName(nameValue);
    const isValidPhone = validatePhone(phoneValue);
    const isValidOrder = validateOrder(orderValue);

    if (!isValidName || !isValidPhone || !isValidOrder) {
        // Очистить сообщения об ошибках
        clearErrors();

        if (!isValidName) {
            const nameError = document.getElementById('nameError');
            nameError.textContent = 'Введите ваше имя';
            nameInput.classList.add('error');
        }

        if (!isValidPhone) {
            const phoneError = document.getElementById('phoneError');
            phoneError.textContent = 'Необходимо ввести номер телефона полностью';
            phoneInput.classList.add('error');
        }

        if (!isValidOrder) {
            const orderError = document.getElementById('orderError');
            orderError.textContent = 'Сделайте выбор';
            choiceOrder.classList.add('error');
        }

        return; // Предотвратить отправку формы
    }

    // Показать загрузчик
    loader.style.display = 'block';

    $.ajax({
        url: 'https://testologia.ru/checkout',
        method: 'POST',
        data: {
            product: orderValue, // Assuming 'product' is the data key for 'choiceOrder'
            name: nameValue,
            phone: phoneValue
        },
        success: function(response) {
            if (response.success === 1) {
                // Скрыть форму и показать сообщение об успехе
                hideForm();
                showSuccessMessage();
            } else {
                alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
                // Скрыть загрузчик
                loader.style.display = 'none';
            }
        },
        error: function(error) {
            console.error('Произошла ошибка при отправке данных:', error); // Логирование ошибки в консоль

            // Отображение сообщения об ошибке пользователю
            if (error.responseJSON && error.responseJSON.message) {
                alert(error.responseJSON.message); // Отображение сообщения из JSON-ответа
            } else {
                alert('Произошла ошибка при отправке данных. Повторите попытку позже.'); // Универсальное сообщение
            }
            alert('Произошла ошибка при отправке данных. Повторите попытку позже.');
            // Скрыть загрузчик
            loader.style.display = 'none';
        }
    });
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });

    const inputElements = document.querySelectorAll('input.error');
    inputElements.forEach(inputElement => {
        inputElement.classList.remove('error');
    });

    const selectElement = document.querySelector('select.error');
    if (selectElement) {
        selectElement.classList.remove('error');
    }
}

function hideForm() {
    const orderData = document.querySelector('.order__data');
    orderData.style.display = 'none';
}


function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Спасибо за Ваш заказ! Мы скоро свяжемся с Вами.';

    const container = document.querySelector('.container'); // Assuming a container element exists
    container.appendChild(successMessage);
}

orderBtn.addEventListener('click', function() {
    submitForm();
});















