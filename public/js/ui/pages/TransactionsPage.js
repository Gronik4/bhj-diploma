/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    if(!this.element) {
      throw new Error('Ошибка. element не имеет значения! TransactionsPage');
    }
    this.lastOptions;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => this.removeAccount());
    let elRemove = this.element.querySelector('.transaction__remove');
    if(elRemove) {
      elRemove.addEventListener('click', () => this.removeTransaction(elRemove.dataset.id));
    }
    
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions) {return;}
    let result = confirm('Вы точно хотите удалить этот счет??')
    if(result) { console.log(this.lastOptions.account_id);
      const data = {id: this.lastOptions.account_id};
      Account.remove(data, (err, response) => {
        if(response.success) {    console.log(response.success);
          App.updateWidgets();
        } else {console.log(response.err + err);}
      });
      this.clear();
    } else {return;}
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options) {return;}             
    this.lastOptions = options;  console.log(this.lastOptions);
    Account.get(options.account_id, (err, response) => {
      if(response.success) {
        this.renderTitle(response.data.name);
      } else {console.log(response.err + err);}
    });
    const data = {account_id: options.account_id}
    Transaction.list(data, (err, response) => {
      if(response.success) {           console.log(response);
        this.renderTransactions();
      } else {console.log(response.err + err);}
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    document.querySelector('.content-title').textContent = 'Название счета';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){

  }
}