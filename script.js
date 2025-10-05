// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('show');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        document.getElementById('navMenu').classList.remove('show');
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = document.getElementById('scrollTop');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 15, 28, 0.95)';
        header.style.padding = '10px 0';
        scrollTop.classList.add('active');
    } else {
        header.style.background = 'rgba(10, 15, 28, 0.9)';
        header.style.padding = '15px 0';
        scrollTop.classList.remove('active');
    }
});

// Scroll to top functionality
document.getElementById('scrollTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing effect
const typingText = document.getElementById('typingText');
const texts = [
    "Cybersecurity Expert",
    "Python Automation Specialist", 
    "IoT Security Researcher",
    "Security Educator",
    "Vulnerability Analyst",
    "Network Security Specialist"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Animated Network Background
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Node class
class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(16, 185, 129, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create nodes
const nodes = [];
const nodeCount = 100;

for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node());
}

// Draw connections between nodes
function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance/150)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Draw connections
    drawConnections();
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Animated counter for stats
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    let startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    
    const updateCounter = () => {
        startValue += increment;
        if (startValue < targetValue) {
            element.textContent = Math.floor(startValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    };
    
    updateCounter();
}

// Start counters when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateCounter('projectsCount', 15);
        animateCounter('experienceYears', 3);
        animateCounter('certificationsCount', 5);
        animateCounter('clientsCount', 12);
    }, 1000);
});

// Quick links smooth scrolling
document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Scroll animation for elements
function checkScroll() {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .cert-card, .service-card, .research-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);