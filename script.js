// ============================================
// BLOG POSTS DATA
// ============================================
// To add a new blog post, simply add a new object to this array!
const blogPosts = [
    {
        date: "January 15, 2025",
        title: "My Journey into AWS Cloud Engineering",
        excerpt: "Starting my career as a Technical Support Engineer has opened up amazing opportunities to work with cloud infrastructure. Here's what I've learned so far about AWS services and troubleshooting...",
        link: "#"
    },
    {
        date: "December 20, 2024",
        title: "Data Analytics: Transforming Raw Data into Insights",
        excerpt: "Working with the Quezon City Government showed me how powerful data analytics can be when making decisions. From SQL queries to Excel dashboards, here's my approach...",
        link: "#"
    },
    {
        date: "November 10, 2024",
        title: "Building My First Full-Stack Application",
        excerpt: "The Stockord project taught me so much about Django, PostgreSQL, and integrating multiple systems. Learn about the challenges and triumphs of building an inventory management system...",
        link: "#"
    }
    // Add more blog posts here by following the same format:
    // {
    //     date: "Date here",
    //     title: "Title here",
    //     excerpt: "Excerpt here...",
    //     link: "#" or "https://your-blog-post-url.com"
    // },
];

// ============================================
// INITIALIZE BLOG
// ============================================
function initializeBlog() {
    const blogContainer = document.getElementById('blog-container');
    
    if (!blogContainer || blogPosts.length === 0) {
        // Show message if no blog posts
        if (blogContainer) {
            blogContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <p style="font-size: 1.2rem; opacity: 0.8; font-style: italic;">
                        Blog posts coming soon! Check back later for updates.
                    </p>
                </div>
            `;
        }
        return;
    }
    
    blogContainer.innerHTML = blogPosts.map(post => `
        <article class="blog-post" onclick="window.location.href='${post.link}'">
            <span class="blog-post-date">${post.date}</span>
            <h3 class="blog-post-title">${post.title}</h3>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <a href="${post.link}" class="blog-post-read-more" onclick="event.stopPropagation();">
                Read more <i class="fa-solid fa-arrow-right"></i>
            </a>
        </article>
    `).join('');
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlog);

// ============================================
// VISITOR COUNTER
// ============================================
// Configuration: Choose your storage method
// Options: 'localStorage' (works immediately) or 'firebase' (requires setup)

const VISITOR_COUNTER_CONFIG = {
    method: 'localStorage', // Change to 'firebase' after Firebase setup
    firebaseConfig: null, // Add your Firebase config here when ready
};

// Firebase setup (optional - uncomment and configure when ready)
/*
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    databaseURL: "YOUR_DATABASE_URL",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
*/

// Initialize visitor counter
async function initializeVisitorCounter() {
    const visitorCountEl = document.getElementById('visitor-count');
    if (!visitorCountEl) return;

    try {
        let count;
        
        if (VISITOR_COUNTER_CONFIG.method === 'firebase') {
            // Firebase implementation (uncomment when Firebase is set up)
            /*
            if (!window.firebase) {
                // Load Firebase SDK if not already loaded
                const firebaseScript = document.createElement('script');
                firebaseScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
                document.head.appendChild(firebaseScript);
                
                const firebaseDatabaseScript = document.createElement('script');
                firebaseDatabaseScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js';
                document.head.appendChild(firebaseDatabaseScript);
                
                await new Promise(resolve => {
                    const checkFirebase = setInterval(() => {
                        if (window.firebase) {
                            clearInterval(checkFirebase);
                            resolve();
                        }
                    }, 100);
                });
            }
            
            if (!window.firebase.apps.length) {
                window.firebase.initializeApp(VISITOR_COUNTER_CONFIG.firebaseConfig || firebaseConfig);
            }
            
            const database = window.firebase.database();
            const visitorRef = database.ref('visitorCount');
            
            // Increment count
            await visitorRef.transaction((currentCount) => {
                return (currentCount || 0) + 1;
            });
            
            // Get and display count
            visitorRef.once('value', (snapshot) => {
                count = snapshot.val() || 0;
                displayVisitorCount(count);
            });
            */
            // Fallback to localStorage if Firebase not configured
            count = incrementLocalStorageCounter();
            displayVisitorCount(count);
        } else {
            // localStorage implementation (works immediately, per-session)
            count = incrementLocalStorageCounter();
            displayVisitorCount(count);
        }
    } catch (error) {
        console.error('Error initializing visitor counter:', error);
        // Fallback to localStorage on error
        const fallbackCount = incrementLocalStorageCounter();
        displayVisitorCount(fallbackCount);
    }
}

// Increment localStorage counter
function incrementLocalStorageCounter() {
    const STORAGE_KEY = 'ajd_portfolio_visitor_count';
    const SESSION_KEY = 'ajd_portfolio_session_id';
    
    // Generate a unique session ID for this visit
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    
    // Check if this session has already been counted
    const countedSessions = JSON.parse(localStorage.getItem('ajd_counted_sessions') || '[]');
    
    if (!countedSessions.includes(sessionId)) {
        // This is a new session, increment the count
        let currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        currentCount += 1;
        localStorage.setItem(STORAGE_KEY, currentCount.toString());
        
        // Remember this session so we don't count it again
        countedSessions.push(sessionId);
        // Keep only last 1000 session IDs to prevent storage bloat
        if (countedSessions.length > 1000) {
            countedSessions.shift();
        }
        localStorage.setItem('ajd_counted_sessions', JSON.stringify(countedSessions));
        
        return currentCount;
    } else {
        // This session was already counted, just return current count
        return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    }
}

// Display visitor count with animation
function displayVisitorCount(count) {
    const visitorCountEl = document.getElementById('visitor-count');
    if (!visitorCountEl) return;
    
    // Format number with commas for better readability
    const formattedCount = count.toLocaleString('en-US');
    
    // Animate the count update
    visitorCountEl.textContent = formattedCount;
    
    // Add a subtle animation when count updates
    visitorCountEl.style.transform = 'scale(1.2)';
    setTimeout(() => {
        visitorCountEl.style.transition = 'transform 0.3s ease';
        visitorCountEl.style.transform = 'scale(1)';
    }, 100);
}

// Initialize visitor counter when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeVisitorCounter);

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger icon animation
        menuIcon.classList.toggle('active');
    };
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// DARK MODE FEATURE
// ============================================
function changeColorMode() {
    const toDarkOrLight = document.querySelector('.dark-light-icon');
    const body = document.querySelector('body');
    const footer = document.querySelector('footer');
    
    if (!toDarkOrLight) return;
    
    if (toDarkOrLight.classList.contains('fa-moon')) {
        // Switch to dark mode
        body.classList.add('to-dark');
        if (footer) footer.classList.add('footer-to-dark');
        toDarkOrLight.classList.replace('fa-moon', 'fa-sun');
        
        // Save preference
        localStorage.setItem('darkMode', 'enabled');
    } else {
        // Switch to light mode
        body.classList.remove('to-dark');
        if (footer) footer.classList.remove('footer-to-dark');
        toDarkOrLight.classList.replace('fa-sun', 'fa-moon');
        
        // Save preference
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Update popup cards if they're open
    const expPopupCard = document.querySelector('.exp-popup-card');
    const projPopupCard = document.querySelector('.proj-popup-card');
    if (body.classList.contains('to-dark')) {
        if (expPopupCard) expPopupCard.classList.add('to-dark');
        if (projPopupCard) projPopupCard.classList.add('to-dark');
    } else {
        if (expPopupCard) expPopupCard.classList.remove('to-dark');
        if (projPopupCard) projPopupCard.classList.remove('to-dark');
    }
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        const toDarkOrLight = document.querySelector('.dark-light-icon');
        if (toDarkOrLight && toDarkOrLight.classList.contains('fa-moon')) {
            changeColorMode();
        }
    }
});

// ============================================
// EXPERIENCE FILTERING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const experienceCards = document.querySelectorAll('.grid-card[data-type]');
    
    // Show professional cards by default with rotation
    experienceCards.forEach((card, index) => {
        if (card.getAttribute('data-type') === 'professional') {
            // Get the natural rotation from CSS nth-child
            const rotations = [-1.5, 2, -2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
            const rotation = rotations[index % rotations.length];
            card.style.setProperty('--card-rotation', `${rotation}deg`);
            setTimeout(() => {
                card.classList.add('show');
            }, 100);
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Smooth transition
            experienceCards.forEach((card, index) => {
                const cardType = card.getAttribute('data-type');
                const rotations = [-1.5, 2, -2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
                const rotation = rotations[index % rotations.length];
                
                if (cardType === filter) {
                    card.style.setProperty('--card-rotation', `${rotation}deg`);
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 50);
                } else {
                    card.classList.remove('show');
                }
            });
        });
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });
    
    // Animate cards on scroll (but not experience cards initially - they use show class)
    const cards = document.querySelectorAll('.project-card, .skill-category, .blog-post');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
    
    // Animate experience cards when they become visible
    const experienceCards = document.querySelectorAll('.grid-card[data-type]');
    experienceCards.forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('show')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        observer.observe(card);
    });
});

// ============================================
// EXPERIENCE POPUP
// ============================================
const gridCards = document.querySelectorAll(".grid-card");
const expPopupCard = document.querySelector(".exp-popup-container");
const expPopupCardBackBtn = document.querySelectorAll(".exp-popup-back-btn");

function closeExpPopup() {
    if (expPopupCard) {
        expPopupCard.classList.remove('active');
        setTimeout(() => {
            expPopupCard.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }
}

function handleCardClick(event) {
    const card = event.currentTarget;
    const title = card.querySelector(".company-name") || card.querySelector("span");
    
    const companyPic = card.querySelector(".polaroid-image-container img")?.src || 
                       card.querySelector("img")?.src || '';
    const companyName = title ? title.textContent : '';
    const jobTitle = card.querySelector(".polaroid-caption h3")?.textContent || 
                     card.querySelector("h3")?.textContent || '';
    
    let jobDescription = "";
    if (jobTitle === "Technical Support Engineer") {
        jobDescription = "Provide technical support and troubleshooting for system issues. Manage maintenance, performance checks, and client support for AWS Cloud-related tasks, including troubleshooting, configuration, and system support.";
    }
    else if (jobTitle === "IT OSS Intern") {
        jobDescription = "Assisted in system backup and maintenance. Helped with network and hardware troubleshooting. Updated user and technical documentation. Provided help desk support and handled calls for troubleshooting.";
    }
    else if (jobTitle === "Data Analyst Intern") {
        jobDescription = "Cleaned, processed, and visualized data for analytics projects. Created dashboards and reports using Python and Excel. Supported analytics-related research and documentation.";
    }
    else if (jobTitle === "Social Media Strategist") {
        jobDescription = "Manage and create social media content related to tech events and community engagement. Focus on implementing strategies to maximize engagement by optimizing post timings across various platforms. Analyze audience behavior and engagement patterns to determine the most effective times to post content, ensuring maximum reach and interaction.";
    }
    else if (jobTitle === "Finance and Ticketing Volunteer") {
        jobDescription = "Assisted in financial tracking and ticketing operations for community events. Handled the processing, verification, and documentation of ticket sales and participant payments, ensuring accurate financial tracking and timely issuance of official receipts.";
    }
    else if (jobTitle === "Social Media Relations Lead") {
        jobDescription = "Managed social media campaigns and supported event promotions. Developed and executed social media strategies to promote events, workshops, and collaborations, while maintaining consistent communication with followers.";
    }
    else if (jobTitle === "Creative Assistant") {
        jobDescription = "Designed event materials and supported creative initiatives. Crafted engaging and eye-catching posts that spoke to our audience and captured the essence of what we were all about. Used design tools to ensure visuals were both impactful and aligned with the organization.";
    }
    else if (jobTitle === "Head of Finance") {
        jobDescription = "Oversaw budget planning and finance-related operations for the graduation committee. Led the financial oversight of the graduation event, focusing on financial forecasting and reporting expenditures to ensure transparent and efficient use of funds. Developed detailed financial reports and tracked incoming and outgoing expenses.";
    }
    
    const companyImg = document.querySelector(".exp-popup-card .company-img");
    const companyNameEl = document.querySelector(".exp-popup-card .company-name");
    const jobTitleEl = document.querySelector(".exp-popup-card .job-title");
    const jobExplEl = document.querySelector(".exp-popup-card .job-explanation");
    
    if (companyImg) companyImg.src = companyPic;
    if (companyNameEl) companyNameEl.textContent = companyName;
    if (jobTitleEl) jobTitleEl.textContent = jobTitle;
    if (jobExplEl) jobExplEl.textContent = jobDescription;
    
    // Apply dark mode if active
    const body = document.querySelector('body');
    const expPopupCardElement = document.querySelector(".exp-popup-card");
    if (body.classList.contains('to-dark')) {
        if (expPopupCardElement) expPopupCardElement.classList.add('to-dark');
    } else {
        if (expPopupCardElement) expPopupCardElement.classList.remove('to-dark');
    }
    
    if (expPopupCard) {
        expPopupCard.style.display = "flex";
        document.body.style.overflow = "hidden";
        // Trigger animation
        setTimeout(() => {
            expPopupCard.classList.add('active');
        }, 10);
    }
}

gridCards.forEach(card => {
    card.addEventListener("click", handleCardClick);
});

// Close popup when back button is clicked
expPopupCardBackBtn.forEach(button => {
    button.addEventListener("click", closeExpPopup);
});

// Close popup when clicking outside
if (expPopupCard) {
    expPopupCard.addEventListener("click", (e) => {
        if (e.target === expPopupCard) {
            closeExpPopup();
        }
    });
}

// Close popup when "Esc" key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (expPopupCard && expPopupCard.style.display === "flex") {
            closeExpPopup();
        }
        if (projPopupCard && projPopupCard.style.display === "flex") {
            closeProjPopup();
        }
    }
});

// ============================================
// PROJECTS POPUP
// ============================================
const projectCards = document.querySelectorAll(".project-card");
const projPopupCard = document.querySelector(".proj-popup-container");
const projPopupCardBackBtn = document.querySelectorAll(".proj-popup-back-btn");

function closeProjPopup() {
    if (projPopupCard) {
        projPopupCard.classList.remove('active');
        setTimeout(() => {
            projPopupCard.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }
}

function handleProjectClick(event) {
    const card = event.currentTarget;
    const projectTitle = card.querySelector("h3").textContent;
    
    const projectPic = card.querySelector("img").src;
    const projectSkills = card.querySelector("p").textContent;
    
    const projImg = projPopupCard.querySelector("img");
    const projTitle = projPopupCard.querySelector("h3");
    const projSkills = projPopupCard.querySelector(".proj-popup-skills");
    
    if (projImg) projImg.src = projectPic;
    if (projTitle) projTitle.textContent = projectTitle;
    if (projSkills) projSkills.textContent = projectSkills;
    
    let projectDescription = "";
    if (projectTitle === "QCG - L&D Program Trainer Performance Monitoring") {
        projectDescription = "The QCG L&D Program Trainer Performance Monitoring project is designed to systematically track, evaluate, and enhance the effectiveness of Learning & Development (L&D) trainers across all QCG training programs. This initiative aims to establish a standardized performance evaluation framework to ensure high-quality training delivery, promote continuous improvement, and align trainer output with organizational learning goals.";
    }
    else if (projectTitle === "QCG - Departmental Budget Utilization Report") {
        projectDescription = "The QCG Departmental Budget Utilization Report project aims to create a structured and transparent reporting system that tracks, analyzes, and communicates the financial performance of each department against their allocated budgets. This initiative is designed to enhance financial accountability, optimize resource allocation, and support data-driven decision-making across QCG.";
    }
    else if (projectTitle === "QCG - L&D Training Effectivity Monitoring") {
        projectDescription = "The QCG L&D Training Effectivity Monitoring project is focused on assessing the real-world impact and effectiveness of Learning & Development (L&D) programs delivered across the organization. This initiative aims to ensure that training interventions are not only well-executed but also drive measurable improvements in employee performance, knowledge retention, and overall organizational capability.";
    }
    else if (projectTitle === "Stockord: Inventory Management System Integrated with POS, & Procurement Systems") {
        projectDescription = "Stockord is an integrated Inventory Management System designed to streamline stock control by synchronizing real-time data across Point of Sale (POS) systems and procurement platforms. This solution aims to provide end-to-end visibility and automation in inventory handling—from purchase to sale—enhancing operational efficiency, reducing stock discrepancies, and improving decision-making across the supply chain.";
    }
    else if (projectTitle === "Transportation Habits Analysis of College Students") {
        projectDescription = "The Transportation Habits Analysis of College Students project aims to study and understand the commuting patterns, preferences, and challenges faced by college students in their daily travel to and from campus. The project seeks to collect data-driven insights into how factors such as distance, cost, accessibility, time, and environmental concerns influence students' choice of transportation modes.";
    }
    else if (projectTitle === "QR Code Marketing KPI Dashboard") {
        projectDescription = "The QR Code Marketing KPI Dashboard project is focused on developing a centralized, real-time analytics platform to measure the effectiveness and performance of QR code-based marketing campaigns. By tracking user engagement and conversion metrics, this dashboard will provide marketing teams with actionable insights into how QR codes are driving customer interaction, brand awareness, and campaign ROI.";
    }
    else if (projectTitle === "Kababayanrice: E-Commerce Web Application for Rice Products") {
        projectDescription = "Kababayanrice is a user-friendly e-commerce web application specifically designed for the online sale and distribution of rice products to consumers, retailers, and bulk buyers. The platform aims to bridge the gap between local rice producers and end customers by providing a streamlined, accessible, and reliable digital marketplace.";
    }
    else if (projectTitle === "Finance Tracker Native Application") {
        projectDescription = "The Finance Tracker Native Application is a mobile-first personal finance tool designed to help users manage their income, expenses, savings, and financial goals with ease and precision. Built as a native application for Android and iOS, this app ensures seamless performance, offline accessibility, and a user-centric interface tailored for daily financial tracking.";
    }
    
    const jobExpl = projPopupCard.querySelector(".job-explanation");
    if (jobExpl) jobExpl.textContent = projectDescription;
    
    // Apply dark mode if active
    const body = document.querySelector('body');
    const projPopupCardElement = document.querySelector(".proj-popup-card");
    if (body.classList.contains('to-dark')) {
        if (projPopupCardElement) projPopupCardElement.classList.add('to-dark');
    } else {
        if (projPopupCardElement) projPopupCardElement.classList.remove('to-dark');
    }
    
    if (projPopupCard) {
        projPopupCard.style.display = "flex";
        document.body.style.overflow = "hidden";
        // Trigger animation
        setTimeout(() => {
            projPopupCard.classList.add('active');
        }, 10);
    }
}

projectCards.forEach(card => {
    card.addEventListener("click", handleProjectClick);
});

// Close popup when back button is clicked
projPopupCardBackBtn.forEach(button => {
    button.addEventListener("click", closeProjPopup);
});

// Close popup when clicking outside
if (projPopupCard) {
    projPopupCard.addEventListener("click", (e) => {
        if (e.target === projPopupCard) {
            closeProjPopup();
        }
    });
}

// ============================================
// MOUSE ZOOM EFFECT ON PROJECT IMAGES
// ============================================
document.querySelectorAll('.proj-popup-card .company-info').forEach(container => {
    const img = container.querySelector('img');
    
    if (img) {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(4)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
        
        // Note: To actually send emails, you'll need to integrate with:
        // - A backend service (Node.js, Python Flask/Django, etc.)
        // - Email service (SendGrid, Mailgun, AWS SES, etc.)
        // - Or use a service like Formspree, EmailJS, etc.
    });
}


// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
        header.style.transform = 'translateX(-50%) translateY(0)';
        header.style.opacity = '1';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateX(-50%) translateY(-100%)';
        header.style.opacity = '0';
    } else {
        // Scrolling up
        header.style.transform = 'translateX(-50%) translateY(0)';
        header.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
});