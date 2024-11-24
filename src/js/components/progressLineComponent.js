export default class ProgressLineComponent {
    constructor(selector) {
        this.scrollBar = document.querySelector(selector);
        if (!this.scrollBar) {
            console.error(`Element with selector "${selector}" not found.`);
        }
    }

    updateProgress() {
        if (!this.scrollBar) return;

        // Calculate the total scrollable height
        const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // Get the current scroll position
        const scrollTop = document.documentElement.scrollTop;

        // Calculate the scroll percentage
        const scrollPercentage = (scrollTop / scrollableHeight) * 100;

        // Update the width of the progress bar
        this.scrollBar.style.width = scrollPercentage + '%';
    }

    init() {
        if (!this.scrollBar) return;

        // Add scroll event listener
        window.addEventListener('scroll', this.updateProgress.bind(this));

        // Initialize the progress bar (in case the user is already scrolled)
        this.updateProgress();
    }
}
