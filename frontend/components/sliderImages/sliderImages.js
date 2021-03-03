
class SliderImages {
    async run() {
        for (;;) {
            await sleep(5000);
            this.slider.css('transform', `translateX(-${this.transform}%)`);
            this.transform += 100/this.nelements;
            this.pos += 1;

            if (this.pos == this.nelements) {
                this.pos = 0;
                this.transform = 0;
            }
        }
    }
    constructor() {
        this.nelements = this.obj.find(".slider-images-el").length;
        this.transform = 0;
        this.pos = 0;
        this.slider = this.obj.find(".slider-images");
        this.slider.css('width', `${this.nelements*100}%`);
        this.run();
    }
}