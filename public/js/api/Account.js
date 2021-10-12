/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static url = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    options.url = this.url + '/' + id;
    options.method = 'GET';
    createRequest(options = {});console.log(options);
    callback(err, response); {
      if(err) {
        console.log('Ошибка= ' + err);
      } else {
        console.log('Ответ= ' + response);
      }
    }
  }
}
