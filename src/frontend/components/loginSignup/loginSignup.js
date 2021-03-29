
class LoginSignup {

    async onLogin() {
        let login = this.login;
        let { content } = await req("POST", "/api/user/login", {
            email: login.email,
            password: login.password
        });

        console.log(content);
    }

    async onSignup() {
        let signup = this.signup;
        let { content } = await req("POST", "/api/user/signup", {
            
        });
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
            email: '',
            password: ''
        };
        this.signup = {
            email: '',
            password: '',
            retypePassword: ''
        }
        let self = this;
        $(".login-email").change(() => this.login.email = $(".login-email").val());
        $(".login-password").change(() => this.login.password = $(".login-password").val());
        $(".login-button").click(() => this.onLogin());
        $(".signup-email").change(() => this.signup.email = $(".signup-email").val());
        $(".signup-password").change(() => this.signup.password = $(".signup-password").val());
        $(".signup-retype-password").change(() => this.signup.retypePassword = $(".signup-retype-password").val());
        $(".buttons").children().click(function() { self.onChangeTab($(this)); });
        $(".login-button").click(() => this.onLogin());
        $(".signup-button").click(() => this.onSignup());
        
    }

}
