
class CarFilter {

    async searchCar() {
        let carList = this.parent.components.carList.instance;
        carList.page = 1;
        App.setArg("page", carList.page);
        App.setArg("filters", b64encodeJson(this.filters));
        await carList.searchCar();
        //carList.createPagination();
    }
    updateUrl() {
        App.setArg();
    }
    onSearchInput() {
        this.filters.text = this.search_input.val();
        this.searchCar();
    }
    onClickFilterButton(el) {
        el.find(".gg-chevron-down").toggleClass("gg-chevron-down-rotated");
        el.next().toggleClass("car-filter-modal-opened");
        el.toggleClass("car-filter-button-modal");
        $(".shadow-white").toggleClass("shadow-white-enabled");
    }
    onClickCategory(el) {
        el.toggleClass("modal-el-selected");
        let category = el.attr("value");
        if (el.hasClass("modal-el-selected")) {
            this.filters.categories.push(category);
        } else {
            this.filters.categories.splice(this.filters.categories.indexOf(category), 1);
        }
        this.searchCar();
    }
    onClickPublished(el) {
        el.toggleClass("modal-el-selected");
        $(".modal-published .modal-el-selected").each(function() {
            if (!$(this).is(el)) {
                $(this).removeClass("modal-el-selected");
            }
        });
        let published = el.attr("value");
        if (el.hasClass("modal-el-selected")) {
            this.filters.published = published;
        } else {
            delete this.filters.published;
        }
        this.searchCar();
    }
    onClickOrder(el) {
        el.toggleClass("modal-el-selected");
        $(".modal-order .modal-el-selected").each(function() {
            if (!$(this).is(el)) {
                $(this).removeClass("modal-el-selected");
            }
        });
        let order = el.attr("value"); 
        if (el.hasClass("modal-el-selected")) {
            this.filters.order = order;
        } else {
            delete this.filters.order;
        }
        this.searchCar();
    }

    modalPriceEvents() {
        let self = this;
        let input_range = $(".car-filter-range");

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

        let inputs = $(".car-filter-modal-from-to").find("input");
        let input_min = inputs.eq(0);
        let input_max = inputs.eq(1);
        input_min.val(input_range.attr("min"));
        input_max.val(input_range.attr("max"));
        
        let radio_min = $(".car-filter-range-radio-min");
        let radio_max = $(".car-filter-range-radio-max");
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
            self.filters.min_price = parseInt(input_min.val());
            self.filters.max_price = parseInt(input_max.val());
            el.css("transform",`translateX(${pos}px)`);
            
        }

        $(".car-filter-range-radio").mousedown(function(event) {
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

        this.search_input = $(".car-filter-search");
        this.search_input.on('input', function() {
            self.onSearchInput();
        });
        $(".car-filter-button").click(function() {
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
        $(".modal-category-el").click(function() {
            self.onClickCategory($(this));
        });
        this.filters =  {};
        this.filters.categories = [];
        if (App.args.filters) {
            this.filters = b64decodeJson(App.args.filters);

            if (this.filters.categories.length > 0) {
                this.filters.categories.map(category => {
                    $(`.modal-category-el[value=${category}]`).addClass("modal-el-selected");
                });
            }
            if (this.filters.text) {
                this.search_input.val(this.filters.text);
            }
            if (this.filters.published) {
                $(`.modal-published-el[value=${this.filters.published}]`).addClass("modal-el-selected");
            }
            if (this.filters.order) {
                $(`.modal-order-el[value=${this.filters.order}]`).addClass("modal-el-selected");
            }
        }
        
        $(".modal-published-el").click(function() {
            self.onClickPublished($(this));
        });
        $(".modal-order-el").click(function() {
            self.onClickOrder($(this));
        });
        
    }
}