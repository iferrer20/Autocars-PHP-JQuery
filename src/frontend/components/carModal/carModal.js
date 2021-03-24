"use strict";

class CarModal { // 
    constructor() {
        this.toggled_car_modal = false;
        this.submitting = false;
        this.current_car = {};
        let self = this;
        
        $("#car-modal-close").click(function() { 
            self.close();
        });
    }
    async close() {
        console.log(this.toggled_car_modal);
        if (this.toggled_car_modal) {
            
            $("#car-modal-submit").off(); // Clear callbacks submit button
            
            this.toggled_car_modal = false;
    
            $("#car-modal-shadow").addClass("car-modal-shadow-hidden");
            $("#car-modal").addClass("car-modal-hidden");
            await sleep(500);
            $("#car-modal-shadow").css('display', 'none');
            $("#car-modal").css('display', 'none');
        }
    }
    parseCar() {
        $.each(this.current_car, (key, val) => { 
            let el = $(`#car-modal-${key}`);
            switch (el.attr("type")) {
                case "text":
                    this.current_car[key] = el.val();
                    break;
                case "number":
                    this.current_car[key] = parseInt(el.val());
                    break;
                case "radio":
                    this.current_car[key] = $(`#car-modal-${key}:checked`).val();
                    break;
            }
        });
    }
    async open(car) {
        let self = this;
        if (!this.toggled_car_modal) {
            this.current_car = car;
            $.each(car, (key, val) => $(`#car-modal-${key}`).val(val));
            
            $("#car-modal-img").css("background-image", `url(img/cars/${car.id}.jpg)`);
            $("#car-modal-submit").click(function() {
                self.submitCar();
            });
    
            $("#car-modal-shadow").css('display', 'block'); // Display Shadow
            $("#car-modal").css('display', 'flex');
            await sleep(50);
            $("#car-modal-shadow").removeClass("car-modal-shadow-hidden");
            $("#car-modal").removeClass("car-modal-hidden"); // Show modal
    
            this.toggled_car_modal = true;
            console.log("opened");
        }
        
    }
    async submitCar() {
        // Change button style
        if (!this.submitting) {
            this.submitting = true;
            this.parseCar();
            var submitButton = $("#car-modal-submit");
            submitButton.addClass("car-modal-submit-loading");
            submitButton.html('Loading..');
            try {
                await req("POST", "/api/cars/update/", this.current_car);
                submitButton.removeClass("car-modal-submit-loading");
                submitButton.addClass("car-modal-submit-saved");
                submitButton.html('Saved');
                this.parent.components.carList.instance.updateCar(this.current_car); // Update car from list
                await sleep(1000);
                submitButton.removeClass("car-modal-submit-saved");
            } catch(e) {
                console.log(e);
                submitButton.html('Error');
                submitButton.removeClass("car-modal-submit-loading");
                submitButton.addClass("car-modal-submit-error");
                await sleep(1000);
                submitButton.removeClass("car-modal-submit-error");
            }
            submitButton.html('Submit');
            this.submitting = false;
        }
    }
}
