import NavigationComponent from '../../dist/js/components/navigationComponent.js'//'../../dist/js/components/navigationComponent.js';
import VisualizationComponnet from '../../dist/js/components/vizualizationComponent.js';
import ThemeManager from '../../dist/js/components/darkModeComponent.js';
//import ProgressLineComponent from '../../dist/js/components/ProgressLineComponent.js';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // const progressLine = new ProgressLineComponent('.progress-line');
    // progressLine.init();
    const vizManager = new VisualizationComponnet();
    vizManager.init();
    const dropdown = new NavigationComponent();
    dropdown.init();
    const darkMode = new ThemeManager();
    darkMode.init();
});