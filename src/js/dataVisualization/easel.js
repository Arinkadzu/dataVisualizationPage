export function renderEasel(selector, type, dataPromise) {

    dataPromise.then(chartData => {
        const diagram = `<iframe width="596" height="321" frameborder="0" scrolling="no" style="overflow-y:hidden;" src="https://www.easel.ly/index/embedFrame/easel/14539794"></iframe>`
        const div = document.querySelector(`.${selector}`);
        div.innerHTML = diagram;
    }).catch(error => console.error("Error loading data:", error));
}
