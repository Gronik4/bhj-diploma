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
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => this.removeAccount());  
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
    if(result) {
      const data = {id: this.lastOptions.account_id};
      Account.remove(data, (err, response) => {
        if(response.success) {
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
  removeTransaction(idd) {
    let result = confirm('Вы правда хотите удалить эту транзакцию??');
    if(result) {
      const date = {id: idd};
      Transaction.remove(date, (err, response) => {
        if(response.success) {
          App.update();
        } else {console.log(response.err + err);}
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options) {return;}             
    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      if(response.success) {
        this.renderTitle(response.data.name);
      } else {console.log(response.err + err);}
    });
    const data = {account_id: options.account_id}
    Transaction.list(data, (err, response) => {
      if(response.success) {
        this.renderTransactions(response.data);
      } else {console.log(response.err + err);}
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions();
    this.renderTitle('Название счета');
    this.lastOptions = '';
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
    let dat = new Date(date);
    let day = dat.getDate()>10?dat.getDate():'0' + dat.getDate();
    let hours = dat.getHours()>10?dat.getHours():'0' + dat.getHours();
    let minutes = dat.getMinutes()>10?dat.getMinutes():'0'+dat.getMinutes();


    const manthArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',];
    let resalt = day +' ' + manthArr[dat.getMonth()] +' ' +  dat.getFullYear() + ' г. ' + ' в ' + hours + ':' + minutes;
    return resalt;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let time = this.formatDate(item.created_at);
    const html = `
    <div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${time}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `;
    return html;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const place = document.querySelector('.content');
    place.querySelectorAll('.transaction').forEach(any => any.remove());
    if(data) {
      data.forEach(item => {
      const html = this.getTransactionHTML(item);
      place.insertAdjacentHTML('beforeend', html);
      });
      document.querySelectorAll('.transaction__remove').forEach(element => {
        element.addEventListener('click', () => this.removeTransaction(element.dataset.id)); 
      });
    }
  }
}