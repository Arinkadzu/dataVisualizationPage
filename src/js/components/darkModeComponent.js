export default class ThemeManager {
    constructor() {
      this.darkMode = false;
      this.themeToggleButton = document.querySelector('.toggle-btn');
      this.mainContainer = document.querySelector('.main-container');
      this.THEME_STORAGE_KEY = 'app_theme_preference';
      
      // Image mappings for different themes
      this.themeImages = {
        dark: {
          '.star': 'images/star-dark.svg',
          '.stars': 'images/stars-dark.svg',
          '.toggler': 'images/stars-dark.svg'
        },
        light: {
          '.star': 'images/star-light.svg',
          '.stars': 'images/stars-light.svg',
          '.toggler': 'images/stars-light.svg'
        }
      };
    }
  
    init() {
      this.loadSavedTheme();
      this.setupEventListeners();
      this.updateImageSources();
    }
  
    loadSavedTheme() {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (savedTheme) {
        this.darkMode = savedTheme === 'dark';
        this.applyTheme();
      } else {
        // Check system preference if no saved theme
        this.checkSystemThemePreference();
      }
    }
  
    checkSystemThemePreference() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkMode = true;
        this.applyTheme();
      }
  
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          this.darkMode = e.matches;
          this.applyTheme();
        });
    }
  
    setupEventListeners() {
      if (this.themeToggleButton) {
        this.themeToggleButton.addEventListener('click', () => this.toggleTheme());
      }
  
      // Custom event for other components to listen to theme changes
      this.themeChangeEvent = new CustomEvent('themeChange', {
        detail: { isDark: this.darkMode }
      });
    }
  
    toggleTheme() {
      this.darkMode = !this.darkMode;
      this.applyTheme();
      this.saveThemePreference();
    }
  
    applyTheme() {
      // Update UI elements
      if (this.themeToggleButton) {
        this.themeToggleButton.classList.toggle('toggle-btn--dark', this.darkMode);
      }
      if (this.mainContainer) {
        this.mainContainer.classList.toggle('dark-mode', this.darkMode);
      }
  
      // Update document level theme
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
      
      // Update images
      this.updateImageSources();
  
      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themeChange', {
        detail: { isDark: this.darkMode }
      }));
    }
  
    updateImageSources() {
      const theme = this.darkMode ? 'dark' : 'light';
      
      Object.entries(this.themeImages[theme]).forEach(([selector, src]) => {
        document.querySelectorAll(selector).forEach(img => {
          // Only update if the src has changed
          if (img.src !== src) {
            img.src = src;
          }
        });
      });
    }
  
    saveThemePreference() {
      localStorage.setItem(this.THEME_STORAGE_KEY, this.darkMode ? 'dark' : 'light');
    }
  
    // Public method to get current theme
    getCurrentTheme() {
      return this.darkMode ? 'dark' : 'light';
    }
  
    // Public method to check if dark mode is active
    isDarkMode() {
      return this.darkMode;
    }
  }
  
  // Example of how to use the ThemeManager with other components
  class App {
    constructor() {
      this.themeManager = new ThemeManager();
      this.initializeComponents();
    }
  
    initializeComponents() {
      // Initialize theme manager
      this.themeManager.init();
  
      // Initialize other components that might need theme awareness
      this.setupThemeAwareComponents();
    }
  
    setupThemeAwareComponents() {
      // Example of how other components can react to theme changes
      window.addEventListener('themeChange', (e) => {
        const isDark = e.detail.isDark;
        // Update other components that need to react to theme changes
        // For example, charts or visualizations
        this.updateComponentsTheme(isDark);
      });
    }
  
    updateComponentsTheme(isDark) {
      // Example of updating other components
      const charts = document.querySelectorAll('.chart');
      charts.forEach(chart => {
        chart.classList.toggle('chart--dark', isDark);
      });
    }
  }
