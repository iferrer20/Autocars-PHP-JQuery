
class CarDetails {
    renderDetails() {
        for (let key in this.car) {
            $(`.car-details-info-${key}`).text(this.car[key]);
        }
        $(".car-details-image").css("background-image", `url(/img/cars/${this.car.id}.jpg)`)
        
    }
    async getCar() {
        let { content } = await req("GET", `/api/cars/read/${this.car_id}/`);
        this.car = content;
        this.renderDetails();
    }
    constructor() {
        this.car_id = App.uri[1];
        if (this.car_id) {
            this.getCar();
        }
        
    }
}