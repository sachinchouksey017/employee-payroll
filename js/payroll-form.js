let imageUrl = 'https://www.w3schools.com/howto/img_avatar.png';
let isUpdate = false;
let baseUrl = "http://localhost:3000/employee/";
const getRadioValue = (name) => {
    let ele = document.getElementsByName(name);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value
        }
    }
    return ''
}
const setRadioValue = (value, name) => {
    let ele = document.getElementsByName(name);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].value == value) {
            ele[i].checked = true;
        }
    }
}
const getCheckedArray = () => {
    let elementArray = document.getElementsByClassName('checkbox');
    let checkedValue = [];
    for (const element of elementArray) {
        if (element.checked) {
            checkedValue.push(element.value)
        }
    }
    return checkedValue;
}
const uncheckArray = () => {
    let elementArray = document.getElementsByClassName('checkbox');
    for (const element of elementArray) {
        element.checked = false
    }
}
const check = (array) => {
    let elementArray = document.getElementsByClassName('checkbox');
    for (const element of elementArray) {
        if (array.includes(element.value)) {
            element.checked = true;
        }
    }
}
const getStartDate = () => {
    let date = document.getElementById('day').value + ' ' + document.getElementById('month').value + ' ' + document.getElementById('year').value
    return date;
}
// instead of reset method we can call form button reset
const resetValue = () => {
    document.getElementById('name').value = '';
    uncheckArray()
    document.getElementById('salary').value = '';
    document.getElementById('notes').value = ''
    document.getElementById('day').selectedIndex = 0;
    document.getElementById('month').selectedIndex = 0;
    document.getElementById('year').selectedIndex = 0;
}
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("called");
    let name = document.getElementById('name').value;
    let gender = getRadioValue('gender');
    let checkedArray = getCheckedArray();
    let salary = document.getElementById('salary').value;
    let startDate = getStartDate();
    let notes = document.getElementById('notes').value;
    imageUrl = getRadioValue('profile');
    if (name.trim().length == 0 || gender.trim().length == 0 || salary.trim().length == 0 || checkedArray.length == 0)
        return;
    const temp = {
        name: name,
        gender: gender,
        departMent: checkedArray,
        salary: salary,
        startDate: startDate,
        notes: notes,
        id: new Date().getTime(),
        profileUrl: imageUrl
    }
    if (isUpdate) {
        let object = JSON.parse(localStorage.getItem('editEmp'));
        temp.id = object.id
        postData("PUT", baseUrl + object.id, temp)
            .then(response => {
                console.log("after employee update", response);
                localStorage.removeItem('editEmp')
                resetValue()
                window.location.replace("../pages/home.html");
            }).catch(err => {
                console.log("err in ", err);
            })

    } else {
        postData("POST", baseUrl, temp)
            .then(response => {
                console.log("after employee add", response);
                resetValue()
                window.location.replace("../pages/home.html");
            }).catch(err => {
                console.log("err in ", err);
            })
    }

}
const checkForUpdate = () => {
    isUpdate = localStorage.getItem('editEmp') ? true : false;
    if (isUpdate) {
        document.getElementById('submitButton').innerHTML = 'Update'
        let object = JSON.parse(localStorage.getItem('editEmp'));
        let date = object.startDate.split(" ");
        document.getElementById('name').value = object.name;
        check(object.departMent)
        setRadioValue(object.gender, 'gender')
        setRadioValue(object.profileUrl, 'profile')
        document.getElementById('salary').value = object.salary;
        document.getElementById('notes').value = object.notes;
        document.getElementById('day').value = date[0];
        document.getElementById('month').value = date[1];
        document.getElementById('year').value = date[2];
        imageUrl = object.profileUrl
    }
}
checkForUpdate();
const postData = (method = "POST", url, data) => {
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

