import { renderChart } from '../dataVisualization/chartJS.js';
import { renderD3 } from '../dataVisualization/d3.js';
import { getData } from '../utils/requestData.js';
import { QUESTIONS } from '../dataVisualization/questionsBase.js';

export default class VisualizationComponnet {
    constructor() {
      
      this.visualizations = {
        chartJSbar: {
          selector: 'chartJS-bar',
          title: 'NMP',
          renderFunction: renderChart,
          type: 'line',
          data: getData('NMP'),
          question: QUESTIONS.nmp[1]
        },
        chartJSdoughnut: {
          selector: 'chartJS--doughnut',
          title: 'Izglītojamo skaits uz 01.01.2024',
          renderFunction: renderChart,
          type: 'doughnut',
          data: getData('students'),
          question: QUESTIONS.students[1]
        },
        d3doughnut: {
          selector: 'd3--doughnut',
          title: 'Izglītojamo skaits uz 01.01.2024',
          renderFunction: renderD3,
          type: 'doughnut',
          data: getData('students-d3'),
          question: QUESTIONS.students[1]
        }
      };
    }
  
    // Initialize all components
    init() {
      this.createVisualizations();
    }
  
    // Create visualization elements
    createVisualizations() {
      const mainContainer = document.getElementById('main');
  
      Object.values(this.visualizations).forEach(viz => {
        const section = this.createVisualizationSection(viz);
        mainContainer.appendChild(section);
        
        if (typeof viz.renderFunction === 'function') {
          viz.renderFunction(`js-visualization-${viz.selector}`, viz.type, viz.data);
        }
      });
    }
  
    // Create a single visualization section
    createVisualizationSection(vizConfig) {
      const section = document.createElement('div');
      section.className = 'main__section__wrapper navigation-section';
      section.id = `section-${vizConfig.selector}`;
      section.setAttribute('data-title', vizConfig.title); // Add data-attribute
  
      const vizWrapper = this.createElement('div', 'data-visualization__wrapper', [
        this.createElement('div', 'visualization-title', [], vizConfig.title),
        this.createElement('div', `js-visualization-${vizConfig.selector}`)
      ]);
  
      const formWrapper = this.createElement('div', 'form__wrapper', [
        this.createElement('label', '', [], vizConfig.question),
        this.createElement('input', `js-form-input-${vizConfig.selector}`)
      ]);
  
      section.append(vizWrapper, formWrapper);
      return section;
    }
  
    // Helper function to create elements
    createElement(tag, className = '', children = [], text = '') {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text) element.textContent = text;
      children.forEach(child => element.appendChild(child));
      return element;
    }
  }