// Get references to DOM elements
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const signupForm = document.getElementById('signup-form');
const signupSuccessMessage = document.getElementById('signup-success-message');


const amountButtons = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('custom-amount-input');
const customAmountBtn = document.getElementById('custom-amount-btn');
const formGroup = document.getElementById('form-group-id')
//const paymentForm = document.querySelector('.donation-form form');
const paymentForm = document.querySelector('#donation-form');
const payNowButton = document.getElementById('pay-now-button');

// Handle email validation on input change
emailInput.addEventListener('input', function () {
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        emailError.innerHTML = '';
        emailError.className = 'error';
    } else {
        emailError.innerHTML = 'Please enter a valid email address';
        emailError.className = 'error active';
    }
});

// Handle sign up form submission
signupForm.addEventListener('submit', function (submitEvent) {
    submitEvent.preventDefault();
    const fname = signupForm.elements['first-name'].value; // using a hyphen in the property name will cause a syntax error because it's not a valid JavaScript variable name. To access elements with hyphenated names, use bracket notation not dot notation
    const lname = signupForm.elements['last-name'].value;
    const email = signupForm.elements.email.value;

    fetch('/submit-form', {
        method: 'POST',
        body: new FormData(signupForm)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        signupForm.reset();
    })
    .catch(error => console.error(error));
    signupSuccessMessage.innerHTML = 'Thank you for signing up with SocioConnect!';
});

// Handle amount button clicks
amountButtons.forEach(function (amountButton) {
    amountButton.addEventListener('click', function () {
        // Set the selected amount
        const amount = amountButton.getAttribute('data-amount');
        customAmountInput.disabled = true;

        // Update the UI to show the selected amount
        amountButtons.forEach(function (btn) {
            if (btn === amountButton) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });



        if (amount === 'custom') {
            // Enable custom amount input if custom button is selected
            formGroup.style.display = "block";
            customAmountInput.disabled = false;
        } else {
            // Set the custom amount input to empty and disable it if another button is selected
            formGroup.style.display = "none";
            customAmountInput.value = '';
            customAmountInput.disabled = true;
            payNowButton.innerHTML = 'Pay $' + amount;
        }

        // Update the pay now button text


        // Enable the pay now button
        payNowButton.disabled = false;
    });
});

// Handle custom amount input change
customAmountInput.addEventListener('input', function () {
    const customAmount = customAmountInput.value;
    if (customAmount === '' || parseFloat(customAmount) <= 0) {
        payNowButton.disabled = true;
        // Show error message to user
        return;
    }

    // Update the pay now button text

    payNowButton.innerHTML = 'Pay $' + customAmount;


    // Enable the pay now button
    payNowButton.disabled = false;
});

// Handle payment form submission
paymentForm.addEventListener('submit', function (submitEvent) {
    submitEvent.preventDefault();

    // Reset the form and UI
    paymentForm.reset();
    amountButtons.forEach(function (btn) {
        btn.classList.remove('selected');
    });
    customAmountInput.value = '';
    customAmountInput.disabled = true;
    payNowButton.disabled = false;

    // Show a success message to the user
    alert('Thank you for the support! Your payment is successful.');
});
