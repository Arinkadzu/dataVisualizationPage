export function renderEasel(selector, type, dataPromise) {
    const container = document.querySelector(`.${selector}`);

    const diagram = `<iframe width="960" height="609" frameborder="0" scrolling="no" style="overflow-y:hidden;" src="https://www.easel.ly/index/embedFrame/easel/14549697"></iframe>`;

    container.innerHTML = diagram;
}
