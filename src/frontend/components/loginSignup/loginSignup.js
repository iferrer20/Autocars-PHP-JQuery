
class LoginSignup {

    onSignup() {
        
    }
    onLogin() {
        
    }
    onChangeTab(el) {
        $(".buttons").find('.enabled').removeClass("enabled");
        $(".tab.enabled").removeClass("enabled");
        $("." + el[0].classList[0].split("-")[1]).addClass("enabled");
        el.addClass("enabled");
        $(".tab .enabled").removeClass("enabled");
        
    }

    constructor() {
        this.login = {
            username: '',
            password: ''
        };
        this.signup = {
            username: '',
            password: '',
            retypePassword: ''
        }
        let self = this;
        $(".login-username").change(() => this.login.username = $(".login-username").val());
        $(".login-password").change(() => this.login.password = $(".login-password").val());
        $(".login-button").click(() => this.onLogin());
        $(".signup-username").change(() => this.signup.username = $(".signup-username").val());
        $(".signup-password").change(() => this.signup.password = $(".signup-password").val());
        $(".signup-retype-password").change(() => this.signup.retypePassword = $(".signup-retype-password").val());
        $(".buttons").children().click(function() { self.onChangeTab($(this)); });
    }

}
