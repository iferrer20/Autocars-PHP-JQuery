
class Categories {
    constructor() {
        let self = this;
        this.obj.find(".category").click(function() {
            self.onClickCategory($(this));
        });
    }
    onClickCategory(el) {
        App.href(`/shop?filters=${b64encodeJson({'categories': [el.attr("value")]})}`);
    }
}