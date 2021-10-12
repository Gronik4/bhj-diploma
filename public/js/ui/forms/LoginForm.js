/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    let elClose = this.element.closest('.modal');
    let form = this.element;
    function callbackLog(err, response) {
      if(response.success) {
        form.reset();
        App.setState('user-logged');
        new Modal(elClose).close();
      }
    }
    User.login(data, callbackLog)
  }
}