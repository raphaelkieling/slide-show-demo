function SpSlider(context, { TIME = 1000, transition = 'fadeIn', color = "black", gesture = true }) {
    this.context = document.querySelector(context);
    this.slide_index = 1;
    this.step_timer = null;
    this.inGesture = false;
    this.showSlides(1);

    this.config = this.configHTML() || {
        TIME,
        transition,
        color,
        gesture
    }

    this.setTransition(this.config.transition);
    this.setColorBackground()
    this.play();
    this.gesture();

    return this;
}

SpSlider.prototype.configHTML = function () {
    let TIME = this.context.getAttribute('slider-time');
    let transition = this.context.getAttribute('slider-transition');
    let color = this.context.getAttribute('slider-color');
    let gesture = this.context.getAttribute('slider-gesture');

    if (TIME || transition || color || gesture) {
        return {
            TIME,
            transition,
            color,
            gesture
        }
    } else {
        return false;
    }

}

SpSlider.prototype.gesture = function (n = 1) {
    if (this.config.gesture == false) return;

    const mc = new Hammer(this.context);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc.on("panleft panright", (ev) => {
        if (this.inGesture == true) return;

        this.inGesture = true;
        switch (ev.type) {
            case "panleft":
                this.prevSlides();
                break;

            case "panright":
                this.plusSlides();
                break;
        }
    });

    mc.on("panend pancancel", (ev) => {
        this.inGesture = false;
    })
}

SpSlider.prototype.plusSlides = function (n = 1) {
    this.showSlides(this.slide_index += n);
}

SpSlider.prototype.prevSlides = function (n = 1) {
    this.showSlides(this.slide_index -= n);
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
        slides[i].classList.remove('active')
    }
    slides[this.slide_index - 1].classList.add('active')
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


