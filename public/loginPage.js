'use strict'


const user = new UserForm();

user.loginFormCallback = function(data){
    ApiConnector.login(data, (response) => {
        console.log(response);
        if(response.success === true){
            location.reload();
        } else this.setLoginErrorMessage(response.error)
    });
}

user.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {
        if(response.success === true){
            location.reload();
        } else this.setRegisterErrorMessage(response.error)
    });
}