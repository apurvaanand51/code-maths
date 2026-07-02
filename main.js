const navBtn = document.querySelector(".title h2");

navBtn.addEventListener("click", () => {
    window.location.reload();
});

const mandelbrot_01 = document.querySelector("#mandelbrot");

mandelbrot_01.addEventListener("click", () => {
    window.location.assign("../components/01_mandelbrot/index.html");
});