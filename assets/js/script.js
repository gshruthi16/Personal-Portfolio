'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link, i) => {
  link.addEventListener("click", function () {
    // Remove active class from all navigation links
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));
    // Add active class to clicked link
    this.classList.add("active");

    // Get the page name from clicked link
    const pageName = this.textContent.toLowerCase();

    // Hide all pages and show the selected one
    pages.forEach(page => {
      if (page.dataset.page === pageName) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// Add parallax effect to background
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  document.body.style.setProperty('--mouse-x', x);
  document.body.style.setProperty('--mouse-y', y);
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add typing effect to text
const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.innerHTML = '';
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Apply typing effect to titles
document.querySelectorAll('.article-title').forEach(title => {
  const text = title.textContent;
  typeWriter(title, text);
});

// Add hover effect to project items
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
    item.style.transition = 'transform 0.3s ease';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
});

// Add animation to skill bars when they come into view
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  
  skillBars.forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = bar.getAttribute('style').match(/\d+/)[0];
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 100);
          observer.unobserve(bar);
        }
      });
    });
    
    observer.observe(bar);
  });
};

// Call the function when the page loads
window.addEventListener('load', animateSkillBars);

// Add animation to contact form
const contactFormInputs = document.querySelectorAll('.form-input');
contactFormInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', () => {
    input.parentElement.style.transform = 'scale(1)';
  });
});

// Add animation to social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.2) rotate(5deg)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Add animation to navbar links
const navbarLinks = document.querySelectorAll('.navbar-link');
navbarLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-5px)';
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0)';
  });
});

// Add animation to testimonials
const testimonials = document.querySelectorAll('.testimonials-item');
testimonials.forEach(testimonial => {
  testimonial.addEventListener('mouseenter', () => {
    testimonial.style.transform = 'translateY(-10px)';
    testimonial.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
  });
  
  testimonial.addEventListener('mouseleave', () => {
    testimonial.style.transform = 'translateY(0)';
    testimonial.style.boxShadow = 'none';
  });
});

// Add animation to blog posts
const blogPosts = document.querySelectorAll('.blog-post-item');
blogPosts.forEach(post => {
  post.addEventListener('mouseenter', () => {
    post.style.transform = 'translateY(-5px)';
    post.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
  });
  
  post.addEventListener('mouseleave', () => {
    post.style.transform = 'translateY(0)';
    post.style.boxShadow = 'none';
  });
});

// Add particle effect
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = '100vh';
  
  // Random size
  const size = Math.random() * 3 + 1;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  // Random animation duration
  particle.style.animationDuration = Math.random() * 15 + 5 + 's';
  
  document.body.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
  }, 20000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Create floating particles
function createParticles() {
  const particleCount = 50;
  const container = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random() * 0.5;
    
    container.appendChild(particle);
  }
}

// Handle smooth page transitions
function initializePageTransitions() {
  const articles = document.querySelectorAll('article');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  articles.forEach(article => {
    observer.observe(article);
  });
}

// Smooth tab switching
function initializeTabTransitions() {
  const tabLinks = document.querySelectorAll('[data-tab-link]');
  const tabContents = document.querySelectorAll('[data-page]');

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-tab-link');
      
      // Update active states
      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      link.classList.add('active');
      document.querySelector(`[data-page="${targetId}"]`).classList.add('active');
    });
  });
}

// Add floating bubbles
function createBubbles() {
  const numberOfBubbles = 50;
  const container = document.body;

  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random positioning and timing
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.top = `${Math.random() * 100}vh`;
    bubble.style.animationDelay = `${Math.random() * 20}s`;
    bubble.style.opacity = Math.random() * 0.3;
    bubble.style.width = `${Math.random() * 15 + 5}px`;
    bubble.style.height = bubble.style.width;
    
    container.appendChild(bubble);
  }
}

// Create spider web animation
function createSpiderWeb() {
  const webContainer = document.createElement('div');
  webContainer.className = 'spider-web';
  document.body.appendChild(webContainer);

  const dots = [];
  const numDots = 50;
  const maxDistance = 150; // Maximum distance for connecting dots

  // Create dots
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'web-dot';
    
    // Random position within viewport
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.animationDelay = `${Math.random() * 2}s`;
    
    webContainer.appendChild(dot);
    dots.push({ element: dot, x, y });
  }

  // Create lines between nearby dots
  function connectDots() {
    // Remove existing lines
    webContainer.querySelectorAll('.web-line').forEach(line => line.remove());

    // Create new lines between dots that are close enough
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[j].x - dots[i].x;
        const dy = dots[j].y - dots[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const line = document.createElement('div');
          line.className = 'web-line';
          
          // Calculate line position and rotation
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          line.style.width = `${distance}px`;
          line.style.left = `${dots[i].x}px`;
          line.style.top = `${dots[i].y}px`;
          line.style.transform = `rotate(${angle}deg)`;
          line.style.opacity = 1 - (distance / maxDistance); // Fade out longer lines
          
          webContainer.appendChild(line);
        }
      }
    }
  }

  // Update dot positions and connections on mouse move
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate dots and update connections
  function animate() {
    dots.forEach((dot, index) => {
      // Calculate distance from mouse
      const dx = mouseX - dot.x;
      const dy = mouseY - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Move dots slightly towards/away from mouse
      if (distance < maxDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (maxDistance - distance) / maxDistance;
        
        dot.x += Math.cos(angle) * force * 0.5;
        dot.y += Math.sin(angle) * force * 0.5;
        
        // Update dot position
        dot.element.style.left = `${dot.x}px`;
        dot.element.style.top = `${dot.y}px`;
      }
    });

    connectDots();
    requestAnimationFrame(animate);
  }

  // Start animation
  animate();

  // Update on window resize
  window.addEventListener('resize', () => {
    dots.forEach(dot => {
      dot.x = Math.random() * window.innerWidth;
      dot.y = Math.random() * window.innerHeight;
      dot.element.style.left = `${dot.x}px`;
      dot.element.style.top = `${dot.y}px`;
    });
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initializePageTransitions();
  initializeTabTransitions();
  createBubbles();
  createSpiderWeb();
});

// Blog modal functionality
const blogModal = document.getElementById('blog-modal');
const blogModalOverlay = document.getElementById('blog-modal-overlay');
const blogModalClose = document.getElementById('blog-modal-close');
const blogModalTitle = document.getElementById('blog-modal-title');
const blogModalDate = document.getElementById('blog-modal-date');
const blogModalText = document.getElementById('blog-modal-text');

// Collect blog post data
const blogPostsData = [
  {
    title: 'Emerging AI Trends in 2024',
    date: 'March 15, 2024',
    content: `Artificial Intelligence is rapidly evolving in 2024. Key trends include the rise of generative AI models (like GPT-4 and beyond), increased focus on AI ethics and explainability, and the integration of AI into everyday applications such as healthcare, finance, and education. Companies are also investing in AI-powered automation and edge AI for faster, more secure data processing. Keeping up with these trends is crucial for professionals and organizations looking to stay ahead in the AI landscape.`
  },
  {
    title: 'Essential Data Science Projects for Beginners',
    date: 'March 10, 2024',
    content: `Starting with hands-on projects is the best way to learn data science. Some essential beginner projects include: <ul><li>Analyzing Titanic survival data</li><li>Building a movie recommendation system</li><li>Visualizing COVID-19 trends</li><li>Predicting house prices with regression</li></ul>These projects help you understand data cleaning, visualization, and machine learning basics, and are great additions to your portfolio.`
  },
  {
    title: 'Python Best Practices for AI Development',
    date: 'March 5, 2024',
    content: `Writing clean, efficient Python code is essential for AI projects. Best practices include: <ul><li>Using virtual environments</li><li>Following PEP8 style guidelines</li><li>Writing modular, reusable functions</li><li>Documenting code and using type hints</li><li>Testing with pytest or unittest</li></ul>Adopting these habits will make your AI code more robust and maintainable.`
  },
  {
    title: 'Understanding Neural Networks',
    date: 'Feb 28, 2024',
    content: `Neural networks are the backbone of modern AI. This post covers:<ul><li>How neurons and layers work</li><li>Activation functions (ReLU, sigmoid, etc.)</li><li>Backpropagation and training</li><li>Common architectures (CNNs, RNNs, Transformers)</li></ul>Understanding these concepts is key to building and tuning deep learning models.`
  },
  {
    title: 'Effective Technical Communication in AI Projects',
    date: 'Feb 20, 2024',
    content: `Communicating complex AI concepts to non-technical stakeholders is a vital skill. Tips include:<ul><li>Using analogies and visuals</li><li>Focusing on business value</li><li>Keeping explanations simple</li><li>Encouraging questions and feedback</li></ul>Good communication ensures your AI projects are understood and supported by all team members.`
  },
  {
    title: 'Getting Started with Azure for AI Development',
    date: 'Feb 15, 2024',
    content: `Azure offers a powerful suite of tools for AI development. Beginners should:<ul><li>Explore Azure Machine Learning Studio</li><li>Try pre-built AI services (Vision, Language, etc.)</li><li>Deploy models using Azure Functions</li><li>Monitor and manage resources with Azure Portal</li></ul>Azure makes it easy to scale and deploy AI solutions in the cloud.`
  }
];

// Add click event to blog posts
const blogPostItems = document.querySelectorAll('.blog-post-item');
blogPostItems.forEach((item, idx) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const data = blogPostsData[idx];
    blogModalTitle.textContent = data.title;
    blogModalDate.textContent = data.date;
    blogModalText.innerHTML = data.content;
    blogModal.style.display = 'flex';
    setTimeout(() => blogModal.classList.add('active'), 10);
  });
});

// Close modal on overlay or close button click
[blogModalOverlay, blogModalClose].forEach(el => {
  el.addEventListener('click', () => {
    blogModal.classList.remove('active');
    setTimeout(() => blogModal.style.display = 'none', 300);
  });
});