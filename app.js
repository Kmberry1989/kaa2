// Application data
const appData = {
    "home": {
        "hero_heading": "Kokomo Art Association",
        "hero_subheading": "Bringing art to the community by bringing the community to art.",
        "gallery_summary": "Artworks Gallery\n210 N Main Street\nKokomo, Indiana 46901\nHours: Monday-Friday 12:00-4:00pm, Saturday 11:00-3:00pm",
        "center_summary": "Kokomo Art Center\n525 W Ricketts St\nKokomo, Indiana 46902\nHours: Tuesday-Saturday 1:00-4:00pm",
        "current_exhibit": "Splash of Watercolor — Past meets present in these delicately beautiful watercolor artworks on exhibit July 1-30. Be inspired by the watercolors of Jennie Moore, Judy Arthur, Cissie Seidman, and Dixie Ben-nett."
    },
    "artists": ["Marilyn Aleman", "Shelley Wilder", "Sara McCubbin", "Don Wilka", "Dixie Ben-net", "Steve Creighton", "Lisa Ananich Freeland", "Lesley Wysong", "Mark Hobson", "Peggy Hobson", "Corinne McAuley", "Angela Walthour", "Ramona Daniels", "Michael Hickey", "Cheryl Sullivan", "Marita Barber", "Tammy Roe", "Patrick Redmon", "Alovea Chadwell", "Jan Stieglitz", "Vivian Bennett", "Kat Cloward", "Lana Kirtley", "Bertie David", "Karen Gardner", "Ken Gardner", "Avon Waters"],
    "classes": ["Watercolor Techniques with Dixie Ben-net", "Sip & Paint Parties with Ramona", "Zentangle with Don Wilka", "Painting with Ramona", "Drawing with Marilyn Aleman", "Pastels with Avon Waters", "Photography with Bob Dawson", "Pottery with Marilyn Aleman", "Junk Journaling with Vivian Bennett"],
    "events": [
        {"title": "Paper Cutting Workshop", "date": "June 14, 2025", "time": "12:00-2:30 PM", "location": "Artworks Gallery", "description": "Hands-on cut-paper design with black-light-reactive materials led by Christina Hollering."},
        {"title": "Trash to Treasure Junk Journaling", "date": "April 12, 2025", "time": "12:00-4:00 PM", "location": "Artworks Gallery", "description": "Create a junk journal from start to finish with Vivian Bennett. Supplies included."},
        {"title": "Halloween Junk Journal Class", "date": "Sept 21, 2024", "time": "1:00-3:00 PM", "location": "Artworks Gallery", "description": "Make a spooky holiday junk journal."},
        {"title": "Fall Junk Journal Class", "date": "Oct 5-26, 2024", "time": "Saturdays 1:00-3:00 PM", "location": "Artworks Gallery", "description": "Four-week series crafting autumn-themed journals."}
    ]
};

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('artist-modal');
const modalClose = document.querySelector('.close');
const modalArtistName = document.getElementById('modal-artist-name');
const modalArtistBio = document.getElementById('modal-artist-bio');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHamburgerMenu();
    populateArtists();
    populateClasses();
    populateEvents();
    initializeModal();
    initializeContactForm();
    initializeAccordion();
});

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Show home section by default
    showSection('home');
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Smooth scroll to top of section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Hamburger menu functionality
function initializeHamburgerMenu() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Populate artists grid
function populateArtists() {
    const artistsGrid = document.getElementById('artists-grid');
    
    appData.artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'artist-card';
        artistCard.innerHTML = `
            <h3>${artist}</h3>
            <p>Click to learn more</p>
        `;
        
        artistCard.addEventListener('click', function() {
            openArtistModal(artist);
        });
        
        artistsGrid.appendChild(artistCard);
    });
}

// Populate classes list
function populateClasses() {
    const classesList = document.getElementById('classes-list');
    
    appData.classes.forEach((className, index) => {
        const classItem = document.createElement('div');
        classItem.className = 'class-item';
        classItem.innerHTML = `
            <div class="class-header" data-class="${index}">
                <h3>${className}</h3>
                <span class="toggle-icon">+</span>
            </div>
            <div class="class-content">
                <p>Join us for an exciting ${className.toLowerCase()} class. Perfect for beginners and experienced artists alike. Learn new techniques and express your creativity in a supportive environment.</p>
                <div class="class-actions">
                    <a href="mailto:kokoartassociation2014@gmail.com?subject=Class Registration - ${className}" class="btn btn-primary">Register</a>
                </div>
            </div>
        `;
        
        classesList.appendChild(classItem);
    });
}

// Populate events grid
function populateEvents() {
    const eventsGrid = document.getElementById('events-grid');
    
    appData.events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <div class="event-date">${event.date} at ${event.time}</div>
            <div class="event-location">${event.location}</div>
            <p>${event.description}</p>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Modal functionality
function initializeModal() {
    modalClose.addEventListener('click', closeArtistModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArtistModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeArtistModal();
        }
    });
}

function openArtistModal(artistName) {
    modalArtistName.textContent = artistName;
    modalArtistBio.textContent = `${artistName} is a talented artist and valued member of the Kokomo Art Association. Their work showcases unique creativity and skill. For more information about their artwork, exhibitions, or to commission a piece, please contact us at kokoartassociation2014@gmail.com.`;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeArtistModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Accordion functionality for classes
function initializeAccordion() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.class-header')) {
            const header = e.target.closest('.class-header');
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-icon');
            
            // Toggle current accordion
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.textContent = '+';
            } else {
                // Close all other accordions
                document.querySelectorAll('.class-content.active').forEach(activeContent => {
                    activeContent.classList.remove('active');
                    activeContent.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                });
                
                // Open current accordion
                content.classList.add('active');
                icon.textContent = '-';
            }
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent('Contact Form Submission');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:kokoartassociation2014@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        alert('Thank you for your message! Your email client should open now.');
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add intersection observer for fade-in animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and other elements for animation
    const animatedElements = document.querySelectorAll('.card, .artist-card, .event-card, .pricing-card, .class-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeScrollAnimations, 100);
});

// Handle hero button clicks
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle escape key for closing modal
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeArtistModal();
    }
    
    // Handle tab navigation in modal
    if (e.key === 'Tab' && modal.style.display === 'block') {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (firstElement) {
        firstElement.focus();
    }
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Enhanced modal opening with focus management
function openArtistModal(artistName) {
    modalArtistName.textContent = artistName;
    modalArtistBio.textContent = `${artistName} is a talented artist and valued member of the Kokomo Art Association. Their work showcases unique creativity and skill. For more information about their artwork, exhibitions, or to commission a piece, please contact us at kokoartassociation2014@gmail.com.`;
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Focus management
    trapFocus(modal);
    
    // Set focus to close button
    modalClose.focus();
}