"use strict";

class CarSlider {
    async run() {
        for(;;) {
            await sleep(5000);
            if (!this.usermoved) {
                this.slider.css('transform', `translateX(-${this.transform}%)`);
                this.transform += 100/this.npages;
                this.pos += 1;

                if (this.pos == this.npages) {
                    this.pos = 0;
                    this.transform = 0;
                }
            }
            this.usermoved = false;
        }
    }
    onClickCar(el) {
        App.href(`/car/${el.attr("car-id")}`);
    }

    async getCars() {
        let self = this;
        let { content } = await req("POST", "/api/cars/search/", {
            'order':'popular',
            'limit':this.npages*10
        });
        this.cars = content.cars;
        for (let i=0; i<this.cars.length;i++) {
            let page_n = parseInt(i/10);
            this.pages.eq(page_n).append(`<div car-id="${this.cars[i].id}" class="car-slider-el" style="background-image: url('/img/cars/${this.cars[i].id}.jpg')"></div>`);
        }
        $(".car-slider-el").click(function() {
            self.onClickCar($(this));
        });

    }
    constructor() {
        let self = this;
        this.slider = this.obj.find(".car-slider");
        this.pages = this.obj.find(".car-slider-page");
        this.transform = 0;
        this.pos = 0;
        this.npages = 2;
        this.usermoved = false;

        $(".car-slider-right-button").click(function() {
            this.usermoved = true;
            //this.pages.eq(this.pos-1).appendTo();
        });

        this.getCars().then(function() {
            self.run();
        });
    }
}