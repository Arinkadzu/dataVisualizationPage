export function renderInfogram(selector, type) {

    const container = document.querySelector(`.${selector}`);

    const diagram = `<iframe src="https://e.infogram.com/2520414b-cc2a-4138-85fe-9a309b471191?src=embed" title="KursaDarbs" width="700" height="531" scrolling="no" frameborder="0" style="border:none;" allowfullscreen="allowfullscreen"></iframe><div style="padding:8px 0;font-family:Arial!important;font-size:13px!important;line-height:15px!important;text-align:center;border-top:1px solid #dadada;margin:0 30px;width: 640px"><a href="https://infogram.com/2520414b-cc2a-4138-85fe-9a309b471191" style="color:#989898!important;text-decoration:none!important;" target="_blank">KursaDarbs</a><br><a href="https://infogram.com" style="color:#989898!important;text-decoration:none!important;" target="_blank" rel="nofollow">Infogram</a></div>`;

    container.innerHTML = diagram;
}
