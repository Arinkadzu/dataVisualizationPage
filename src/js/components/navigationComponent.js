export default class NavigationComponent {
    constructor() {
      this.dropdownMenu = document.querySelector('.dropdown-menu');
      this.navigationSections = document.querySelectorAll('.navigation-section');
    }
  
    init() {
      this.clearExistingNavigation();
      this.renderNavigationItems();
      this.setupEventListeners();
    }
  
    clearExistingNavigation() {
      // Clear any existing navigation items
      this.dropdownMenu.innerHTML = '';
    }
  
    renderNavigationItems() {
      this.navigationSections.forEach(section => {
        const navItem = this.createNavigationItem({
          href: section.id,
          title: section.getAttribute('data-title') || section.id,
          iconLight: 'images/star-dark.svg'
        });
        this.dropdownMenu.appendChild(navItem);
      });
    }
  
    createNavigationItem({ href, title, iconLight }) {
      const link = document.createElement('a');
      link.className = 'dropdown-item';
      link.href = `#${href}`;
      
      link.innerHTML = `
        <img class="star star--small star--dark" 
             src="${iconLight}" 
             alt="Navigation icon"
             title="Navigation icon">
        ${title}
      `;
  
      return link;
    }
  
    setupEventListeners() {
      // Handle dropdown item clicks
      this.dropdownMenu.addEventListener('click', (e) => {
        //TODO: render select title in navbar
        if (e.target.closest('.dropdown-item')) {
          const targetId = e.target.closest('.dropdown-item').getAttribute('href').slice(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
  
      // Update active state based on scroll position
      window.addEventListener('scroll', this.debounce(() => {
        this.updateActiveNavigationItem();
      }, 100));
    }
  
    updateActiveNavigationItem() {
      const scrollPosition = window.scrollY + 100; // Offset for better accuracy
  
      // Find the current section
      let currentSection = null;
      this.navigationSections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
          currentSection = section;
        }
      });
  
      // Update active state in navigation
      if (currentSection) {
        const activeItem = this.dropdownMenu.querySelector('.active');
        if (activeItem) {
          activeItem.classList.remove('active');
        }
  
        const newActiveItem = this.dropdownMenu.querySelector(`[href="#${currentSection.id}"]`);
        if (newActiveItem) {
          newActiveItem.classList.add('active');
        }
      }
    }
  
    // Utility function to debounce scroll events
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }