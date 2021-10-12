//const { response } = require("express");

/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static url = ' ';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      method: 'GET',
      url: this.url,
      data: data,
      callback: (err, response) => {
        if(err) {
          console.log('Ошибка= ' + err);
        } else {
          console.log('Ответ= ' + response);
        }
        callback(err, response);
      }
    });
    
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      method: 'PUT',
      url: this.url,
      data: data,
      callback: (err, response) => {
        if(err) {
          console.log('Ошибка= ' + err);
        } else {
          console.log('Ответ= ' + response);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    options.method = 'DELET';
    options.url = this.url;
    options.data = data;
    createRequest(options = {});
    callback(err, response); {
      if(err) {
        console.log('Ошибка= ' + err);
      } else {
        console.log('Ответ= ' + response);
      }
    }
  }
}
