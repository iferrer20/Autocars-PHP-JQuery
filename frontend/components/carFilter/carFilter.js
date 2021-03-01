
class CarFilter {

    async searchCar() {
        let carList = this.parent.components.carList.instance;
        await carList.searchCar({
            "text": this.search_input.val(),
            "min_price": this.min_price,
            "max_price": this.max_price
        });
        carList.createPagination();
    }
    onSearchInput() {
        this.searchCar();
    }
    onClickFilterButton(el) {
        el.find(".gg-chevron-down").toggleClass("gg-chevron-down-rotated");
        el.next().toggleClass("car-filter-modal-opened");
        el.toggleClass("car-filter-button-modal");
        $(".shadow-white").toggleClass("shadow-white-enabled");
    }

    modalPriceEvents() {
        let self = this;
        let input_range = this.obj.find(".car-filter-range");

        input_range.each(function() { // Set second radio to right
            let elements = $(this).find(".car-filter-range-radio");
            if (elements.length == 2) {
                let pos = $(this).width()-20;
                elements.eq(0).css("transform",`translateX(0px)`);
                elements.eq(1).css("transform",`translateX(${pos}px)`);
                let inputs = $(this).parent().find("input");
                
                $(this).attr("min-value", $(this).attr("min"));
                $(this).attr("max-value", $(this).attr("max"));
            }
        });

        let inputs = this.obj.find(".car-filter-modal-from-to").find("input");
        let input_min = inputs.eq(0);
        let input_max = inputs.eq(1);
        input_min.val(input_range.attr("min"));
        input_max.val(input_range.attr("max"));
        
        let radio_min = this.obj.find(".car-filter-range-radio-min");
        let radio_max = this.obj.find(".car-filter-range-radio-max");
        let modal_el = input_range.parent();
        let input_range_pos = input_range.offset().left;
        let input_range_width = input_range.width()-20;
        let color_line = input_range.find(".car-filter-range-line");
        
        inputs.on('input', function() {
            let pos = parseInt($(this).val());
            if (input_min.is($(this))) {
                moveRadio(radio_min, pos, false);
            } else if (input_max.is($(this))) {
                moveRadio(radio_max, pos, false);
            }
        });

        function moveRadio(el, pos, pxpos=true) {
            let min = input_range.attr("min");
            let max = input_range.attr("max");

            if (!pxpos) {
                let d = pos/max;
                pos = d*input_range_width;
            }

            pos = Math.max(pos, 0);
            pos = Math.min(pos, input_range_width);
            let attr;
            
            if (el.hasClass("car-filter-range-radio-min")) {
                let maxPos = parseInt(radio_max.css("transform").split(/[()]/)[1].split(", ")[4]);
                pos = Math.min(pos, maxPos);
                let diff = maxPos - pos;
                color_line.css("transform",`translateX(${pos}px)`);
                color_line.css("width",`${diff+10}px`);
                attr = "min-value";
                
            } else if (el.hasClass("car-filter-range-radio-max")) {
                let minPos = parseInt(radio_min.css("transform").split(/[()]/)[1].split(", ")[4]);
                pos = Math.max(pos, minPos);
                let diff = pos - minPos;
                color_line.css("width",`${diff+10}px`);
                attr = "max-value";
            } 

            let value = parseInt((pos/input_range_width)*max);
            
            input_range.attr(attr, value);
            input_min.val(input_range.attr("min-value"));
            input_max.val(input_range.attr("max-value"));
            self.min_price = parseInt(input_min.val());
            self.max_price = parseInt(input_max.val());
            el.css("transform",`translateX(${pos}px)`);
            
        }

        this.obj.find(".car-filter-range-radio").mousedown(function(event) {
            let el = $(this);
            App.components.body.obj.on("mousemove.filter", function(event) {
                let pos = event.pageX-input_range_pos-20;
                moveRadio(el, pos);
            });
            App.components.body.obj.on("mouseup.filter", function() {
                App.components.body.obj.off("mousemove.filter");
                App.components.body.obj.off("mouseup.filter");
                App.components.body.obj.off("click.filter");
            });
        });
    }

    constructor() {
        let self = this;
        this.search_input = this.obj.find(".car-filter-search");
        this.search_input.on('input', function() {
            self.onSearchInput();
        });
        this.obj.find(".car-filter-button").click(function() {
            self.onClickFilterButton($(this));
        });

        this.modalPriceEvents();
        $(".car-filter-modal-apply-button").click(function() {
            self.searchCar();
            self.onClickFilterButton($(".car-filter-modal-opened").prev());
        });
        $(".car-filter-modal-cancel-button").click(function() {
            self.onClickFilterButton($(".car-filter-modal-opened").prev());
        });

        
    }
}