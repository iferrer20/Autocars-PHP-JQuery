
var auth;
var googleProvider;
async function loadFirebase() { 
    
    
    await App.loadScript("https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js");
    await App.loadScript("https://www.gstatic.com/firebasejs/8.4.2/firebase-auth.js");

    var firebaseConfig = {
        apiKey: "AIzaSyDEYutj0oIxaws-91a3oEfcTLUziXDghQc",
        authDomain: "yolanda-web.firebaseapp.com",
        projectId: "yolanda-web",
        storageBucket: "yolanda-web.appspot.com",
        messagingSenderId: "839668249132",
        appId: "1:839668249132:web:7041b4e1f9f30bec20d789",
        measurementId: "G-3DY8QDS5YJ"
    };
    
    // InItialize Firebase
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    googleProvider = new firebase.auth.GoogleAuthProvider();

};


loadFirebase();



class LoginSignup {

    async onLogin() {
        let login = this.login;
        try {
            let { content } = await req("POST", "/api/user/signin", this.login);
        } catch(e) {
            console.log(e);
        }

    }
    async socialLogin() {
        let { content } = await req("POST", "/api/user/socialLogin", this.sl);
        
    }
    async onLoginGoogle() {
        //const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await firebase.auth().signInWithPopup(googleProvider);
        this.sl.uid = user.uid;
        
        
    }
    async onSignup() {
        let signup = this.signup;
        if (signup.password != signup.retypePassword) {
            return;
        }
        let { content } = await req("POST", "/api/user/signup", {
            email: signup.email,
            username: signup.username,
            password: signup.password
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
            username: '',
            password: '',
            retypePassword: ''
        };
        this.sl = {
            email: '',
            uid: ''
        };
        let self = this;
        $(".login-email").change(() => this.login.email = $(".login-email").val());
        $(".login-password").change(() => this.login.password = $(".login-password").val());
        $(".signup-email").change(() => this.signup.email = $(".signup-email").val());
        $(".signup-password").change(() => this.signup.password = $(".signup-password").val());
        $(".signup-retype-password").change(() => this.signup.retypePassword = $(".signup-retype-password").val());
        $(".signup-username").change(() => this.signup.username = $(".signup-username").val())
        $(".buttons").children().click(function() { self.onChangeTab($(this)); });
        $(".login-button").click(() => this.onLogin());
        $(".signup-button").click(() => this.onSignup());
        $(".login-google").click(() => this.onLoginGoogle());
        
    }
}
