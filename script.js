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
    let jobDescription = "";
    if (jobTitle === "IT On-Site-Support") {
        jobDescription = "Provided hands-on technical support to on-site clients at KMC Solutions, ensuring smooth day-to-day IT operations. Used a ticketing system to efficiently manage, prioritize, and resolve support requests involving hardware, software, network connectivity, and user access issues. Assisted in the setup, configuration, and maintenance of workstations, printers, and other IT equipment. Collaborated with the central IT team to escalate complex issues and ensure timely resolution in line with service level agreements (SLAs). Maintained detailed documentation of support activities and actively contributed to improving IT support processes.";
    }
    else if (jobTitle === "Head, Finance") {
        jobDescription = "I was responsible for leading the financial  oversight of the graduation event. My role focused on financial forecasting, and reporting expenditures to ensure transparent and efficient use of funds. I developed detailed financial reports, tracked incoming and outgoing expenses, and provided strategic recommendations to align spending with the committee’s goals and timeline. My work supported data-driven decision-making and ensured financial accountability throughout the planning process.";
    }
    else if (jobTitle === "Finance Ticketing & Receipts") {
        jobDescription = "Focused on ticketing and receipt management. Handled the processing, verification, and documentation of ticket sales and participant payments, ensuring accurate financial tracking and timely issuance of official receipts. Coordinated with attendees and the organizing team to address payment-related concerns and maintained organized financial records to support transparency and reporting. Contributed to the smooth financial operations of the event through diligent monitoring and reconciliation of ticketing transactions.";
    }
    else if (jobTitle === "Social Media Strategist") {
        jobDescription = "I focused on implementing strategies to maximize engagement by optimizing post timings across various platforms. I analyzed audience behavior and engagement patterns to determine the most effective times to post content, ensuring maximum reach and interaction. I monitored trends, and adjusted strategies to improve overall engagement rates, helping the brand build a stronger online presence and connect more effectively with its audience.";
    }
    else if (jobTitle === "Social Media Coordinator" && companyName === "AWS User Group BuildHers+ Philippines") {
        jobDescription = "I led efforts in curating engaging content across various social media platforms to enhance brand presence and audience engagement. I managed posting schedules, ensuring consistent and timely content delivery, while continuously optimizing audience interaction through performance analysis. By monitoring key metrics and trends, I developed strategies to improve content reach and engagement, ultimately driving a more active and loyal online community.";
    }
    else if (jobTitle === "Social Media Coordinator" && companyName === "AWS Cloud Club Philippines") {
        jobDescription = "I was responsible for overseeing various social media accounts, ensuring the consistent scheduling and posting of engaging content. I actively interacted with the audience, responding to comments, messages, and inquiries to create a positive online community";
    }
    else if (jobTitle === "Social Media Relations Lead") {
        jobDescription = "I was responsible for managing the group’s online presence and engagement with the tech community. I developed and executed social media strategies to promote events, workshops, and collaborations, while maintaining consistent communication with followers.  I also worked closely with the team to align our social media efforts with the group's goals and amplify the impact of our initiatives across platforms.";
    }
    else if (jobTitle === "Creatives Committee") {
        jobDescription = "I was responsible for crafting engaging and eye-catching posts that spoke to our audience and captured the essence of what we were all about. Working closely with the team, we brainstormed creative concepts and made sure everything we shared on social media felt personal and connected with our community. Using design tools, I helped make sure our visuals were both impactful and in line with our organization, making every post something our members could resonate with.";
    }
    else if (jobTitle === "Data Analyst") {
        jobDescription = "Developed and implemented interactive dashboards using SQL, Google Sheets, and Excel to monitor facilitator performance, training sessions, and financial records for Quezon City Government training programs. Leveraged SQL queries and Excel functions such as SUMIF and VLOOKUP to ensure accurate financial tracking, budget allocation, and expenditure analysis. Created dynamic reports incorporating slicers, pivot tables, and visualizations, empowering data-driven decision-making for training enhancements and budget management.";
    }


    document.querySelector(".company-img").src = companyPic;
    document.querySelector(".company-name").textContent = companyName;
    document.querySelector(".job-title").textContent = jobTitle;
    document.querySelector(".job-explanation").textContent = jobDescription;

    expPopupCard.style.display = "flex";
}

gridCards.forEach(card => {
    card.addEventListener("click", handleCardClick);
});

// Close popup when back button is clicked
expPopupCardBackBtn.forEach(button => {
    button.addEventListener("click", () => {
        expPopupCard.style.display = "none";
    })
})

// Close popup when "Esc" key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        expPopupCard.style.display = "none";
    }
});



// POPUP EFFECT IN PROJECTS
const projectCards = document.querySelectorAll(".project-card");
const projPopupCard = document.querySelector(".proj-popup-container");
const projPopupCardBackBtn = document.querySelectorAll(".proj-popup-back-btn");

function handleProjectClick(event) {
    const card = event.currentTarget;
    const projectTitle = card.querySelector("h3").textContent;

    const projectPic = card.querySelector("img").src;
    const projectSkills = card.querySelector("p").textContent;

    projPopupCard.querySelector("img").src = projectPic;
    projPopupCard.querySelector("h3").textContent = projectTitle;
    projPopupCard.querySelector(".proj-popup-skills").textContent = projectSkills;

    projPopupCard.style.display = "flex";
}

projectCards.forEach(card => {
    card.addEventListener("click", handleProjectClick);
});

// Close popup when back button is clicked
projPopupCardBackBtn.forEach(button => {
    button.addEventListener("click", () => {
        projPopupCard.style.display = "none";
    })
})

// Close popup when "Esc" key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        projPopupCard.style.display = "none";
    }
});