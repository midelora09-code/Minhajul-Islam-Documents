// Sticky Header Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon from bars to X
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll to Documents Button Function
function scrollToDocs() {
    document.getElementById('documents').scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll Reveal Animations
// Initializing ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false // Animations happen only once
});

sr.reveal('.reveal');
sr.reveal('.feature-card', { interval: 200 });
sr.reveal('.doc-card', { interval: 150 });

// Active Link Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Sample Data Array
const documents = [
    { id: 1, name: "Aadhaar Card", desc: "Official Identity Document", cat: "personal", icon: "fa-address-card" },
    { id: 2, name: "PAN Card", desc: "Tax Identification Card", cat: "personal", icon: "fa-id-card" },
    { id: 3, name: "Voter ID", desc: "Election Commission Card", cat: "personal", icon: "fa-user-check" },
    { id: 4, name: "Passport", desc: "Travel Identity Document", cat: "personal", icon: "fa-passport" },
    { id: 5, name: "10th Marksheet", desc: "Secondary Education Certificate", cat: "education", icon: "fa-graduation-cap" },
    { id: 6, name: "Resume 2026", desc: "Updated Professional CV", cat: "others", icon: "fa-file-lines" },
    { id: 7, name: "Bank Statement", desc: "Last 6 Months Transactions", cat: "financial", icon: "fa-file-invoice-dollar" },
    { id: 8, name: "Electricity Bill", desc: "Utility Payment Proof", cat: "financial", icon: "fa-bolt-lightning" }
];

const docGrid = document.getElementById('docGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const docCountText = document.getElementById('docCount');
const emptyState = document.getElementById('emptyState');

// Render Function
function renderDocs(data) {
    docGrid.innerHTML = '';
    
    if (data.length === 0) {
        emptyState.classList.remove('hidden');
        docCountText.innerText = "No Documents Found";
    } else {
        emptyState.classList.add('hidden');
        docCountText.innerText = `Showing ${data.length} Documents`;

        data.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'doc-card reveal';
            card.innerHTML = `
                <div class="favorite-btn" onclick="toggleFav(this)">
                    <i class="fas fa-star"></i>
                </div>
                <div class="doc-icon"><i class="fas ${doc.icon}"></i></div>
                <span class="category-tag">${doc.cat}</span>
                <h3>${doc.name}</h3>
                <p>${doc.desc}</p>
                <div class="card-actions">
                    <button class="btn-view" onclick="window.open('#', '_blank')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-download" onclick="alert('Downloading ${doc.name}...')">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            `;
            docGrid.appendChild(card);
        });
    }
}

// Live Search & Filter Logic
function filterDocs() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCat = categoryFilter.value;

    const filtered = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm) || 
                              doc.cat.toLowerCase().includes(searchTerm);
        const matchesCat = selectedCat === 'all' || doc.cat === selectedCat;
        return matchesSearch && matchesCat;
    });

    renderDocs(filtered);
}

// Favorite Toggle
function toggleFav(btn) {
    btn.classList.toggle('active');
}

// Event Listeners
searchInput.addEventListener('input', filterDocs);
categoryFilter.addEventListener('change', filterDocs);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderDocs(documents);

    // Scroll Reveal Animation
    ScrollReveal().reveal('.reveal', {
        distance: '40px',
        duration: 800,
        delay: 100,
        interval: 100,
        origin: 'bottom'
    });
});

