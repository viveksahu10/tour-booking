// WanderLux - Main JavaScript

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Auto-hide flash messages
const flashMessages = document.querySelectorAll('.flash');
flashMessages.forEach(flash => {
    setTimeout(() => {
        flash.style.transition = 'opacity 0.5s';
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
    }, 4000);
});

// ===== Booking Page Logic =====
const tourSelect = document.getElementById('tourSelect');
const numPeople = document.getElementById('numPeople');
const priceEstimate = document.getElementById('priceEstimate');
const peAmount = document.getElementById('peAmount');

function updatePrice() {
    if (!tourSelect || !numPeople) return;
    const selectedOption = tourSelect.options[tourSelect.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute('data-price'));
    const count = parseInt(numPeople.value) || 1;
    if (price && count) {
        const total = price * count;
        peAmount.textContent = '₹' + total.toLocaleString('en-IN');
        priceEstimate.style.display = 'flex';
    } else {
        priceEstimate.style.display = 'none';
    }
}

if (tourSelect) {
    tourSelect.addEventListener('change', updatePrice);
    numPeople.addEventListener('input', updatePrice);
}

// Select tour from list card
const selectBtns = document.querySelectorAll('.btn-select-tour');
selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tourId = btn.getAttribute('data-id');
        if (tourSelect) {
            tourSelect.value = tourId;
            updatePrice();
            document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
            tourSelect.style.borderColor = 'var(--gold)';
            setTimeout(() => { tourSelect.style.borderColor = ''; }, 2000);
        }
    });
});

// Tour filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-list-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        tourCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Pre-select tour from URL param
const urlParams = new URLSearchParams(window.location.search);
const tourParam = urlParams.get('tour');
if (tourParam && tourSelect) {
    tourSelect.value = tourParam;
    updatePrice();
}

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tour-card, .value-card, .team-card, .testimonial-card, .why-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
