class AppHeaderCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;
    this._User = User;

    this.logout = User.logout.bind(User);
    
    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    });
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
