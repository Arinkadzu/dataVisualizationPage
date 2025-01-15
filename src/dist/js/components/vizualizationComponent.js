import{renderChart}from"../dataVisualization/chartJS.js";import{renderD3}from"../dataVisualization/d3.js";import{renderPlot}from"../dataVisualization/plot.js";import{renderApexChart}from"../dataVisualization/apexChart.js";import{renderPlotly}from"../dataVisualization/plotly.js";import{renderGoogleChart}from"../dataVisualization/googleChart.js";import{renderInfogram}from"../dataVisualization/infogram.js";import{renderEasel}from"../dataVisualization/easel.js";import{getData}from"../utils/requestData.js";import{QUESTIONS}from"../dataVisualization/questionsBase.js";export default class VisualizationComponnet{constructor(){this.visualizations={chartJSdoughnut:{selector:"chartJS",title:"Izglītojamo skaits profesionālās izglītības programmās.",renderFunction:renderChart,type:"doughnut",data:getData("chartJS"),question:QUESTIONS.diagramm[2]},d3doughnut:{selector:"d3",title:"Medicīniskās palīdzības pieprasījumi pēc vecuma grupām.",renderFunction:renderD3,type:"doughnut",data:getData("d3"),question:QUESTIONS.diagramm[1]},plot:{selector:"plot",title:"Laulību skaits uz 1 000 iedzīvotājiem pa gadiem",renderFunction:renderPlot,type:"",data:getData("plot"),question:QUESTIONS.diagramm[3]},apexChart:{selector:"apexChart",title:"Novadi pēc veiksmīgajiem palīdzības sniegšanas gadījumiem",renderFunction:renderApexChart,type:"",data:getData("apexChart"),question:QUESTIONS.diagramm[4]},plotly:{selector:"plotly",title:"Studentu skaits Rīgā pa kursiem",renderFunction:renderPlotly,type:"",data:getData("plotly"),question:QUESTIONS.diagramm[5]},googleChart:{selector:"googleChart",title:"Izglītojamo skaits profesionālās izglītības programmās.",renderFunction:renderGoogleChart,type:"",data:getData("googleChart"),question:QUESTIONS.diagramm[7]},infogram:{selector:"inforgam",title:"Palīdzības sniegšanas gadījumi pa novadiem 2022. un 2023. gadā.",renderFunction:renderInfogram,type:"",question:QUESTIONS.diagramm[6]},easel:{selector:"easel",title:"Laulību skaits uz 1 000 iedzīvotājiem pa gadiem",renderFunction:renderEasel,type:"",question:QUESTIONS.diagramm[3]}}}init(){this.createVisualizations(),this.addInputListeners()}addInputListeners(){let t=document.getElementById("form"),a=document.querySelectorAll("input"),i=()=>{var e=Array.from(a).every(e=>""!==e.value.trim());this.renderSendButton(e,t)};a.forEach(e=>{e.addEventListener("input",i)})}createVisualizations(){let a=document.getElementById("form");Object.values(this.visualizations).forEach((e,t)=>{t=this.createVisualizationSection(e,t);t&&(a.appendChild(t),"function"==typeof e.renderFunction)&&(e.data?e.renderFunction("js-visualization-"+e.selector,e.type,e.data):e.renderFunction("js-visualization-"+e.selector,e.type))}),this.renderBasicQuestions(a),this.renderSendButton(!1,a)}createElement(e,t="",a=[],i=""){let r=document.createElement(e);return t&&(r.className=t),i&&(r.textContent=i),a.forEach(e=>r.appendChild(e)),r}generateTitle(e,t){var e=this.createElement("div","title-number",[],e+1+". diagramma:"),t=this.createElement("div","title-text",[],t),a=this.createElement("div","visualization-title",[]);return a.appendChild(e),a.appendChild(t),a}createVisualizationSection(e,t){var a,i,r,n;return e.notVisible?null:((a=document.createElement("div")).className="main__section__wrapper navigation-section",a.id="section-"+e.selector,a.setAttribute("data-title",e.title),t=this.generateTitle(t,e.title),t=this.createElement("div","data-visualization__wrapper",[t,this.createElement("div","js-visualization-"+e.selector)]),(i=document.createElement("div")).className="form__wrapper",(r=document.createElement("label")).setAttribute("for","input-"+e.selector),r.textContent=e.question,(n=document.createElement("input")).id="input-"+e.selector,n.name="input-"+e.selector,n.type="text",n.required=!0,i.appendChild(r),i.appendChild(n),a.appendChild(t),a.appendChild(i),a)}renderBasicQuestions(a){var e=document.createElement("h2"),t=(e.classList.add("questions-title"),e.textContent="Atbildiet uz papildus jautājumiem:",document.createElement("hr")),t=(t.classList.add("questions-separator"),a.appendChild(t),a.appendChild(e),QUESTIONS.basic);Object.entries(t).forEach(([e,t])=>{e=this.renderBasicQuestion(e,t);a.appendChild(e)})}renderBasicQuestion(e,t){var a=document.createElement("div"),i=(a.className="form__section",document.createElement("div")),r=(i.className="form__wrapper--tight",document.createElement("label")),t=(r.setAttribute("for","input-question-"+e),r.textContent=t,document.createElement("input"));return t.id="input-question-"+e,t.name="question-"+e,t.type="text",t.required=!0,i.appendChild(r),i.appendChild(t),a.appendChild(i),a}renderSendButton(e,t){let a=t.querySelector(".submition-section");a||((a=document.createElement("div")).className="submition-section");var i=a.querySelector(".js-send-button"),r=a.querySelector(".js-warning-message, .js-thank-you-message"),i=(i&&i.remove(),r&&r.remove(),document.createElement("div"));i.className="js-warning-message alert alert-warning",i.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i> Formu nosūtīšana ir pabeigta, paldies par dalību!',a.appendChild(i),t.contains(a)||t.appendChild(a)}}