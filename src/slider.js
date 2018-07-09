function SpSlider(context, { TIME = 1000, transition = 'fadeIn', color = "black" }) {
    this.context = document.querySelector(context);
    this.slide_index = 1;
    this.step_timer = null;
    this.showSlides(1);

    this.config = {
        TIME,
        transition,
        color
    }

    this.setTransition(this.config.transition);
    this.setColorBackground()
    this.play();

    return this;
}

SpSlider.prototype.plusSlides = function (n = 1) {
    this.showSlides(this.slide_index += n);
}

SpSlider.prototype.currentSlide = function (n) {
    this.showSlides(this.slide_index = n);
}

SpSlider.prototype.showSlides = function (n) {
    let i;
    let slides = this.getSlides();
    if (n > slides.length) { this.slide_index = 1 }
    if (n < 1) { this.slide_index = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[this.slide_index - 1].style.display = "block";
}

SpSlider.prototype.getSlides = function () {
    return this.context.querySelectorAll("[slide]");
}

SpSlider.prototype.pause = function () {
    if (this.step_timer)
        clearInterval(this.step_timer)
}

SpSlider.prototype.play = function () {
    this.step_timer = setInterval(() => {
        this.plusSlides(1);
    }, this.config.TIME);
}

SpSlider.prototype.setColorBackground = function () {
    this.context.background = this.config.color;
}

SpSlider.prototype.setTransition = function (transition) {
    let slides = this.getSlides();


    slides.forEach(slide => {
        slide.classList.remove('animated');
        slide.classList.add('animated');

        slide.classList.remove(this.config.transition);
        slide.classList.add(transition);
    });

    this.config.transition = transition;
}


