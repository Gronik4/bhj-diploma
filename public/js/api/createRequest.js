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
    if(options.data && options.data.addUrl) options.url += options.data.addUrl;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if(options.method == 'GET') {                          
        try{
            let string = `${options.url}?`;
            for(let item in options.data) {
                string += `${item}=${options.data[item]}&`;
            }
            xhr.open(options.method, string);
            xhr.send();
        } catch(e) {
            options.callback(new Error(e.messange), null);
        }
    } else {
        const formData = new FormData();                    console.log(options);
       /* for(let item in options.data) {
            let name = `${item}`;
            formData.append(name + `, ` + options.data[item]);
        }*/
        formData.append('email', `${options.data.email}`);
        formData.append('password', `${options.data.password}`);
        formData.append('name', `${options.data.name}`);
        formData.append('user_id', `${options.data.user_id}`);
        formData.append('id', `${options.data.id}`);

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