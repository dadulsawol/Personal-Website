// DARK MODE FEATURE
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
        document.querySelector('.exp-popup-card').classList.add('to-dark');
        document.querySelector('.dark-light-icon').classList.replace('fa-moon', 'fa-sun');
    }

    else {
        document.querySelector('body').classList.remove('to-dark');
        document.querySelector('footer').classList.remove('footer-to-dark');
        document.querySelector('.exp-popup-card').classList.remove('to-dark');
        document.querySelector('.dark-light-icon').classList.replace('fa-sun', 'fa-moon');
    }
}


// POPUP EFFECT IN EXPERIENCES
const gridCards = document.querySelectorAll(".grid-card");
const expPopupCard = document.querySelector(".exp-popup-container");
const expPopupCardBackBtn = document.querySelectorAll(".exp-popup-back-btn");

function handleCardClick(event) {
    const card = event.currentTarget;
    const title = card.querySelector("span");

    const companyPic = card.querySelector("img").src;
    const companyName = title.textContent;
    const jobTitle = card.querySelector("h3").textContent;
    const jobDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    document.querySelector(".company-img").src = companyPic;
    document.querySelector(".company-name").textContent = companyName;
    document.querySelector(".job-title").textContent = jobTitle;
    document.querySelector(".job-explanation").textContent = jobDescription;

    expPopupCard.style.display = "flex";
}

gridCards.forEach(card => {
    card.addEventListener("click", handleCardClick);
});

expPopupCardBackBtn.forEach(button => {
    button.addEventListener("click", () => {
        expPopupCard.style.display = "none";
    })
})