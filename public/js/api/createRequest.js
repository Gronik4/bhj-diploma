/**
 * Основная функция для совершения запросов на сервер * 
**/
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
        const formData = new FormData();
        for(let item in options.data) {
            formData.append(item, options.data[item]);
        }

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