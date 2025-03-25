const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

/*shop now button */
function openIndexPage() {
    // Redirect to index.html
    window.location.href = 'index.html';
}

/*free shipping*/
function openCartPage() {
    // Redirect to cart.html
    window.location.href = 'cart.html';
}

/*online orders, happy sell*/
function openOrderPage() {
    // Redirect to shop.html
    window.location.href = 'shop.html';
}

/*promotions page*/
function openInformationPage() {
    // Redirect to blog.html
    window.location.href = 'Information.html';
}

/*Support page*/
    function openSupportPage() {
        // Redirect to contact.html
        window.location.href = 'contact.html';
    }

/*weathercheck page*/
function openWeatherPage() {
    // Redirect to weatherindex.html
    window.location.href = 'weather.html';
}

function openExpertPage() {
    // Redirect to weatherindex.html
    window.location.href = 'blog.html';
}




       
    