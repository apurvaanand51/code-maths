const navBtn = document.querySelector(".title h2");

navBtn.addEventListener("click", () => {
    window.location.reload();
});

const mandelbrot_01 = document.querySelector("#mandelbrot");
const maritngale_02 = document.querySelector("#martingale");
const montecarlo_03 = document.querySelector("#monte-carlo");

mandelbrot_01.addEventListener("click", () => {
    window.location.assign("../components/01_mandelbrot/index.html");
});

maritngale_02.addEventListener("click", () => {
    window.location.assign("https://apurvaanand51.github.io/martingale-strategy/");
});


montecarlo_03.addEventListener("click", () => {
    window.location.assign("https://apurvaanand51.github.io/monte-carlo-simulation/");
});