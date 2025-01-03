import { renderChart } from '../dataVisualization/chartJS.js';
import { renderD3 } from '../dataVisualization/d3.js';
//import { renderPlot } from '../dataVisualization/plot.js';
import { renderInfogram } from '../dataVisualization/infogram.js';
import { renderEasel } from '../dataVisualization/easel.js';
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
        question: QUESTIONS.nmp[1],
        notVisible: true
      },
      chartJSdoughnut: {
        selector: 'chartJS--doughnut',
        title: 'Izglītojamo skaits profesionālās izglītības programmās uz 01.01.2024',
        renderFunction: renderChart,
        type: 'doughnut',
        data: getData('students'),
        question: QUESTIONS.students[2]
      },
      d3doughnut: {
        selector: 'd3--doughnut',
        title: 'Izglītojamo skaits uz 01.01.2024',
        renderFunction: renderD3,
        type: 'doughnut',
        data: getData('students-d3'),
        question: QUESTIONS.students[1]
      },
      // plot: {
      //   selector: 'plot',
      //   title: 'NMP',
      //   renderFunction: renderPlot,
      //   type: '',
      //   data: getData('NMP'),
      //   question: QUESTIONS.nmp[1]
      // },
      infogram: {
        selector: 'inforgam',
        title: 'Test',
        renderFunction: renderInfogram,
        type: '',
        data: getData('NMP'),
        question: QUESTIONS.nmp[1]
      },
      easel: {
        selector: 'easel',
        title: 'Test',
        renderFunction: renderEasel,
        type: '',
        data: getData('NMP'),
        question: QUESTIONS.nmp[1]
      }
    };
  }

  // Initialize all components
  init() {
    this.createVisualizations();
    this.renderBasicQuestions();
    this.addInputListeners();
    this.renderSendButton(false);
  }

  addInputListeners() {
    const inputs = document.querySelectorAll('input');

    const checkInputs = () => {
      const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

      this.renderSendButton(allFilled);
      console.log('Filled', allFilled)
    };

    console.log('inputs', inputs)
    inputs.forEach(input => {
      input.addEventListener('input', checkInputs);
    });
  }

  // Create visualization elements
  createVisualizations() {
    const mainContainer = document.getElementById('main');

    Object.values(this.visualizations).forEach(viz => {
      const section = this.createVisualizationSection(viz);
      if (section) {
        mainContainer.appendChild(section);

        if (typeof viz.renderFunction === 'function') {
          viz.renderFunction(`js-visualization-${viz.selector}`, viz.type, viz.data);
        }
      }
    });
  }

  // Helper function to create elements
  createElement(tag, className = '', children = [], text = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    children.forEach(child => element.appendChild(child));
    return element;
  }

  // Create a single visualization section
  createVisualizationSection(vizConfig) {
    if (vizConfig.notVisible) return null;
    const section = document.createElement('div');
    section.className = `main__section__wrapper navigation-section`;
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

    section.appendChild(vizWrapper);
    section.appendChild(formWrapper);
    return section;
  }

  renderBasicQuestions() {
    const mainContainer = document.getElementById('main');

    // Заголовок перед основными вопросами
    const title = document.createElement('h2');
    title.classList.add('questions-title');
    title.textContent = 'Atbildiet uz papildus jautājumiem:';

    const separator = document.createElement('hr');
    separator.classList.add('questions-separator');

    mainContainer.appendChild(separator);
    mainContainer.appendChild(title);

    const questions = QUESTIONS.basic;
    Object.entries(questions).forEach(([key, value]) => {
      const section = this.renderBasicQuestion(key, value);
      mainContainer.appendChild(section);
    });
  }

  renderBasicQuestion(key, value) {
    const section = document.createElement('div');
    const formWrapper = this.createElement('div', 'form__wrapper--tight', [
      this.createElement('label', '', [], value),
      this.createElement('input', `js-form-input-question-${key}`)
    ]);
    section.append(formWrapper);
    return section;
  }

  renderSendButton(state) {
    const mainContainer = document.getElementById('main');

    // Find or create submission section
    let submissionSection = mainContainer.querySelector('.submition-section');
    if (!submissionSection) {
      submissionSection = document.createElement('div');
      submissionSection.className = 'submition-section';
    }

    // Remove old button or message
    let existingButton = submissionSection.querySelector('.js-send-button');
    let existingMessage = submissionSection.querySelector('.js-warning-message, .js-thank-you-message');
    if (existingButton) existingButton.remove();
    if (existingMessage) existingMessage.remove();

    // Handle button click
    function handleButtonClick() {
      let button = submissionSection.querySelector('.js-send-button');
      if (button) button.remove();
      let thankYouMessage = document.createElement('div');
      thankYouMessage.className = 'js-thank-you-message alert alert-success';
      thankYouMessage.innerHTML = '<i class="fa-solid fa-fire"></i> Paldies par dalību! Forma nosūtīta :)';
      submissionSection.appendChild(thankYouMessage);
      // Lock all inputs (disable them)
      let inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.disabled = true;
      });
    }

    if (state) {
      let button = document.createElement('button');
      button.className = 'js-send-button button--regular';
      button.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Nosūtīt atbildes';
      button.addEventListener('click', handleButtonClick);
      submissionSection.appendChild(button);
    } else {
      let message = document.createElement('div');
      message.className = 'js-warning-message alert alert-warning';
      message.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Lai nosūtītu formu, jāaizpilda visi lauki.';
      submissionSection.appendChild(message);
    }

    if (!mainContainer.contains(submissionSection)) {
      mainContainer.appendChild(submissionSection);
    }
  }
}