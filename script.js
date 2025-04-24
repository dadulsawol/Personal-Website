const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

function changeColorMode() {
    toDarkOrLigt = document.querySelector('.dark-light-icon');

    if (toDarkOrLigt.classList.contains('fa-moon')) {
        document.querySelector('body').classList.add('to-dark');
        document.querySelector('footer').classList.add('footer-to-dark');
        document.querySelector('.dark-light-icon').classList.replace('fa-moon', 'fa-sun');
    }

    else {
        document.querySelector('body').classList.remove('to-dark');
        document.querySelector('footer').classList.remove('footer-to-dark');
        document.querySelector('.dark-light-icon').classList.replace('fa-sun', 'fa-moon');
    }
}