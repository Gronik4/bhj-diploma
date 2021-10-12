/**
 * Основная функция для совершения запросов на сервер * 
**/
let options = {
    url: '',
    data: {
        email: '',
        password: '',
        name: ''
    },
    method: '',
    callback: (err, response) =>{
        if(err) {
            console.log('Ошибка= ' + err);
        } else {
            console.log('Ответ= ' + response);
        }
    },
}
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if(options.method == 'GET') {
        try{
            let string = `${options.url}?email=${options.data.email}&password=${options.data.password}`;
            xhr.open(options.method, string);
            xhr.send();
        } catch(e) {
            options.callback(new Error(e.messange), null);
        }
    } else {
        const formData = new FormData();                    console.log(options.data);
        formData.append('email', `${options.data.email}`);
        formData.append('password', `${options.data.password}`);
        formData.append('name', `${options.data.name}`);
        formData.append('user_id', `${options.data.user_id}`);

        try{
            xhr.open(options.method, options.url);
            xhr.send(formData);
        } catch {
            options.callback(new Error(e.messange), null); 
        }
    }
    
    xhr.onload = function() {
        if(xhr.status == 200){
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.err, null);
        }
    }
}