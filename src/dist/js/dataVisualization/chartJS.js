function renderChart(e){var e=document.querySelector("."+e),a=document.createElement("canvas");e.appendChild(a),new Chart(a,{type:"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],borderWidth:1}]},options:{scales:{y:{beginAtZero:!0}}}})}export{renderChart};