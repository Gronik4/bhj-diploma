/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    let elClose = this.element.closest('.modal');
    let form = this.element; 
    function writAccount(err, response) {
      if(response && response.success) {
        new Modal(elClose).close();
        App.update();
        form.reset();
      }
    }
    Account.create(data, writAccount); 
  }
}