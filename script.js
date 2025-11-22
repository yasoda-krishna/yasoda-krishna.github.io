// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Typing Effect
const typingText = document.getElementById('typing-text');
const roles = [
  "Principal Software Engineer",
  "System Architect",
  "Distributed Systems Expert",
  "AI Engineering Lead"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next
  }

  setTimeout(type, typeSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
  if (typingText) type();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.8)';
    nav.style.boxShadow = 'none';
  }
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');

  // Animate Links
  navLinksItems.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });

  // Burger Animation
  burger.classList.toggle('toggle');
});

// GSAP Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
  gsap.fromTo(section.children,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Curved Timeline Logic
function drawTimelineCurve() {
  const svg = document.querySelector('.timeline-svg');
  const path = document.querySelector('.timeline-path');
  const dots = document.querySelectorAll('.connector-dot');
  const container = document.querySelector('.timeline-container');

  if (!svg || !path || dots.length === 0) return;

  // Reset path
  let d = "";

  // Get container offset
  const containerRect = container.getBoundingClientRect();
  const startX = containerRect.width / 2;
  const startY = 0;

  // Start point (top center)
  d += `M ${startX} ${startY}`;

  // Loop through dots to create curve
  dots.forEach((dot, index) => {
    const dotRect = dot.getBoundingClientRect();
    const dotX = dotRect.left + dotRect.width / 2 - containerRect.left;
    const dotY = dotRect.top + dotRect.height / 2 - containerRect.top;

    // Previous point (or start)
    let prevX, prevY;
    if (index === 0) {
      prevX = startX;
      prevY = startY;
    } else {
      const prevDot = dots[index - 1].getBoundingClientRect();
      prevX = prevDot.left + prevDot.width / 2 - containerRect.left;
      prevY = prevDot.top + prevDot.height / 2 - containerRect.top;
    }

    // Control points for smooth Bezier curve
    const cp1x = prevX;
    const cp1y = prevY + (dotY - prevY) / 2;
    const cp2x = dotX;
    const cp2y = prevY + (dotY - prevY) / 2;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${dotX} ${dotY}`;
  });

  // Set path data
  path.setAttribute('d', d);

  // Animate path drawing on scroll
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline-container",
      start: "top center",
      end: "bottom bottom",
      scrub: 1
    }
  });
}

// Redraw on resize
window.addEventListener('resize', drawTimelineCurve);

// Initial draw after load
window.addEventListener('load', () => {
  // Small delay to ensure layout is settled
  setTimeout(drawTimelineCurve, 100);
});

// Timeline Item Animations (Fade In)
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  const direction = index % 2 === 0 ? -50 : 50;

  gsap.fromTo(item,
    { x: direction, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Card Hover Effects (Tilt)
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});
