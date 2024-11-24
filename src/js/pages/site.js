// Import statements
import NavigationComponent from '../js/components/navigationComponent.js';
import VisualizationComponnet from '../js/components/vizualizationComponent.js';
import ThemeManager from '../js/components/darkModeComponent.js';
import ProgressLineComponent from '../js/components/ProgressLineComponent.js';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const progressLine = new ProgressLineComponent('.progress-line');
    progressLine.init();
    const vizManager = new VisualizationComponnet();
    vizManager.init();
    const dropdown = new NavigationComponent();
    dropdown.init();
    const darkMode = new ThemeManager();
    darkMode.init();
});