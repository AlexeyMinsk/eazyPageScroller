class Slider {
    constructor(container) {
        this.slider = container.children[0];
        this.arrows = [container.children[1].children[0], container.children[1].children[1]];
        this.shift = this.slider.children[0].clientWidth;
        this.maxShift = (this.slider.children.length - 1) * this.shift;
        this.currentShift = 0;
    }
    sliderClick(event) {
        if (event.target.classList.contains("fa-chevron-circle-left"))
            this.currentShift -= this.shift;
        else
            this.currentShift += this.shift;
        if (this.currentShift > this.maxShift)
            this.currentShift = this.maxShift;
        else if (this.currentShift < 0)
            this.currentShift = 0;
        this.slider.style.transform = `translateX(-${this.currentShift}px)`;
    }
}
function CreateSliders() {
    let sliderConteiners = document.getElementsByClassName('slider-conteiner');
    for (let n = 0; n < sliderConteiners.length; n++) {
        let slider = new Slider(sliderConteiners[n]);
        slider.arrows[0].addEventListener('click', slider.sliderClick.bind(slider));
        slider.arrows[1].addEventListener('click', slider.sliderClick.bind(slider));
    }
}
//# sourceMappingURL=slider.js.map