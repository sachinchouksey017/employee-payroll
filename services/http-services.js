
/**
 * description:-this method is example of promises
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 */
const post = (method = "POST", url, data) => {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.status === 0 || (this.status >= 200 && this.status < 400)) {
                // The request has been completed successfully
                resolve(xhttp.response);

            } else {
                // Oh no! There has been an error with the request!
                reject({
                    status: this.status,
                    statusText: xhttp.statusText
                });

            }
        };
        xhttp.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };
        xhttp.open(method, url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    })

}
/**
 * description:- this method is example of callback
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 * @param {*} callback 
 */
const ajaxCall = (method = "POST", url, data = null, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status === 0 || (this.status >= 200 && this.status < 400)) {
            // The request has been completed successfully
            callback(null, xhttp.response);

        } else {
            // Oh no! There has been an error with the request!
            callback({
                status: this.status,
                statusText: xhttp.statusText
            });

        }
    };
    xhttp.onerror = function () {
        callback({
            status: this.status,
            statusText: xhttp.statusText
        });
    };
    xhttp.open(method, url, true);
    xhttp.send();

}