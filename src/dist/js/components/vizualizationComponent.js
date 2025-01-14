import{renderChart}from"../dataVisualization/chartJS.js";import{renderD3}from"../dataVisualization/d3.js";import{renderPlot}from"../dataVisualization/plot.js";import{renderApexChart}from"../dataVisualization/apexChart.js";import{renderPlotly}from"../dataVisualization/plotly.js";import{renderGoogleChart}from"../dataVisualization/googleChart.js";import{renderInfogram}from"../dataVisualization/infogram.js";import{renderEasel}from"../dataVisualization/easel.js";import{getData}from"../utils/requestData.js";import{QUESTIONS}from"../dataVisualization/questionsBase.js";export default class VisualizationComponnet{constructor(){this.visualizations={chartJSdoughnut:{selector:"chartJS",title:"Izglītojamo skaits profesionālās izglītības programmās.",renderFunction:renderChart,type:"doughnut",data:getData("chartJS"),question:QUESTIONS.diagramm[2]},d3doughnut:{selector:"d3",title:"Medicīniskās palīdzības pieprasījumi pēc vecuma grupām.",renderFunction:renderD3,type:"doughnut",data:getData("d3"),question:QUESTIONS.diagramm[1]},plot:{selector:"plot",title:"Laulību skaits uz 1 000 iedzīvotājiem pa gadiem",renderFunction:renderPlot,type:"",data:getData("plot"),question:QUESTIONS.diagramm[3]},apexChart:{selector:"apexChart",title:"Novadi pēc veiksmīgajiem palīdzības sniegšanas gadījumiem",renderFunction:renderApexChart,type:"",data:getData("apexChart"),question:QUESTIONS.diagramm[4]},plotly:{selector:"plotly",title:"Studentu skaits Rīgā pa kursiem",renderFunction:renderPlotly,type:"",data:getData("plotly"),question:QUESTIONS.diagramm[5]},googleChart:{selector:"googleChart",title:"Izglītojamo skaits profesionālās izglītības programmās.",renderFunction:renderGoogleChart,type:"",data:getData("googleChart"),question:QUESTIONS.diagramm[2]},infogram:{selector:"inforgam",title:"Palīdzības sniegšanas gadījumi pa novadiem 2022. un 2023. gadā.",renderFunction:renderInfogram,type:"",question:QUESTIONS.diagramm[6]},easel:{selector:"easel",title:"Laulību skaits uz 1 000 iedzīvotājiem pa gadiem",renderFunction:renderEasel,type:"",question:QUESTIONS.diagramm[3]}}}init(){this.createVisualizations(),this.renderBasicQuestions(),this.addInputListeners(),this.renderSendButton(!1)}addInputListeners(){let t=document.querySelectorAll("input"),a=()=>{var e=Array.from(t).every(e=>""!==e.value.trim());this.renderSendButton(e)};t.forEach(e=>{e.addEventListener("input",a)})}createVisualizations(){let a=document.getElementById("main");Object.values(this.visualizations).forEach((e,t)=>{t=this.createVisualizationSection(e,t);t&&(a.appendChild(t),"function"==typeof e.renderFunction)&&(e.data?e.renderFunction("js-visualization-"+e.selector,e.type,e.data):e.renderFunction("js-visualization-"+e.selector,e.type))})}createElement(e,t="",a=[],i=""){let r=document.createElement(e);return t&&(r.className=t),i&&(r.textContent=i),a.forEach(e=>r.appendChild(e)),r}generateTitle(e,t){var e=this.createElement("div","title-number",[],e+1+". diagramma:"),t=this.createElement("div","title-text",[],t),a=this.createElement("div","visualization-title",[]);return a.appendChild(e),a.appendChild(t),a}createVisualizationSection(e,t){var a;return e.notVisible?null:((a=document.createElement("div")).className="main__section__wrapper navigation-section",a.id="section-"+e.selector,a.setAttribute("data-title",e.title),t=this.generateTitle(t,e.title),t=this.createElement("div","data-visualization__wrapper",[t,this.createElement("div","js-visualization-"+e.selector)]),e=this.createElement("div","form__wrapper",[this.createElement("label","",[],e.question),this.createElement("input","js-form-input-"+e.selector)]),a.appendChild(t),a.appendChild(e),a)}renderBasicQuestions(){let a=document.getElementById("main");var e=document.createElement("h2"),t=(e.classList.add("questions-title"),e.textContent="Atbildiet uz papildus jautājumiem:",document.createElement("hr")),t=(t.classList.add("questions-separator"),a.appendChild(t),a.appendChild(e),QUESTIONS.basic);Object.entries(t).forEach(([e,t])=>{e=this.renderBasicQuestion(e,t);a.appendChild(e)})}renderBasicQuestion(e,t){var a=document.createElement("div"),t=this.createElement("div","form__wrapper--tight",[this.createElement("label","",[],t),this.createElement("input","js-form-input-question-"+e)]);return a.append(t),a}renderSendButton(e){var t=document.getElementById("main");let a=t.querySelector(".submition-section");a||((a=document.createElement("div")).className="submition-section");var i=a.querySelector(".js-send-button"),r=a.querySelector(".js-warning-message, .js-thank-you-message");i&&i.remove(),r&&r.remove(),e?((i=document.createElement("button")).className="js-send-button button--regular",i.innerHTML='<i class="fa-regular fa-paper-plane"></i> Nosūtīt atbildes',i.addEventListener("click",function(){var e=a.querySelector(".js-send-button");e&&e.remove(),(e=document.createElement("div")).className="js-thank-you-message alert alert-success",e.innerHTML='<i class="fa-solid fa-fire"></i> Paldies par dalību! Forma nosūtīta :)',a.appendChild(e),document.querySelectorAll("input, textarea, select").forEach(e=>{e.disabled=!0})}),a.appendChild(i)):((r=document.createElement("div")).className="js-warning-message alert alert-warning",r.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> Lai nosūtītu formu, jāaizpilda visi lauki.',a.appendChild(r)),t.contains(a)||t.appendChild(a)}}