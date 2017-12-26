class AuthCtrl {
    constructor(User, $state) {
        'ngInject';
        
        this._User = User;
        this.title = $state.current.title;
        this._$state = $state;
        this.authType = $state.current.name.replace('app.', '');
    }

    submitForm() {
        this.isSubmitting = true;

        this._User.attemptAuth(this.authType, this.formData)
            .then(
                (res) => {
                    // console.log(res);
                    this._$state.go('app.home');
                },
                (err) => {
                    this.isSubmitting = false;
                    
                    this.errors = err.data.errors;
                }
            );
    }
}

export default AuthCtrl;