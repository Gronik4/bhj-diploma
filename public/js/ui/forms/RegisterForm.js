/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) { console.log(data);
    let elClose = this.element.closest('.modal');
    let form = this.element;
    function callbackReg(err,response) {
      if(response.success) {
        App.setState('user-logged');
        form.reset();
        new Modal(elClose).close();
      }
    }
    User.register(data, callbackReg);
  }
}