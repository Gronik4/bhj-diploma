/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let data = User.current();
    let placeOutput = this.element.querySelector('.accounts-select');
    placeOutput.querySelectorAll('option').forEach(item => {item.remove();})  
    function updateSelect(err, response) {
      if(response) {
        response.data.forEach(item => {
          let newOption = `<option value="${item.id}">${item.name}</option>`;
          placeOutput.insertAdjacentHTML('beforeend', newOption);        
        })
      } else {console.log(err);}   
    };
    if(data) {Account.list(data, updateSelect);}
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) { 
    Transaction.create(data, (error, response) =>{
      if(response.success) {
        App.update();
        this.element.reset();
        if(this.element.id == 'new-income-form') {
          App.getModal('newIncome').close()
        } else {
          App.getModal('newExpense').close();
        }
      } else {console.log(response.error + error);}
    });
  }
}