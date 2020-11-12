employeeArray = [
]
employeeArray = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')) : [...employeeArray];
localStorage.removeItem('editEmp')

const getDepartMentHtml = (array) => {
    let depart = ''
    for (const iterator of array) {
        depart = `${depart} <div class='dept-label'>${iterator}</div>`
    }
    return depart;
}
const createInnerHtml = () => {
    var newhtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    // for...of loop of es6 
    for (const element of employeeArray) {
        // template literal es6 feature
        newhtml = `${newhtml}<tr>
        <td><img class="profile" src="${element.profileUrl}" alt=""></td>
        <td>${element.name}</td>
        <td>${element.gender}</td>
        <td>${getDepartMentHtml(element.departMent)}</td>
        <td> ₹ ${element.salary}</td>

        <td>${element.startDate}</td>
        <td><img name=${element.id} onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img name=${element.id} onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>`
    }
    document.getElementById('display').innerHTML = newhtml
}

const remove = (node) => {
    ajaxCall("DELETE", "http://localhost:3000/employee/" + node.name, {}, (err, data) => {
        if (err) {
            console.log("there is err", err);
        } else {
            // get the data after any update
            getAllEmployee()
        }
    })
}

const update = (node) => {
    employee = employeeArray.find(ele => ele.id == node.name)
    localStorage.setItem('employee', JSON.stringify(employeeArray))
    localStorage.setItem('editEmp', JSON.stringify(employee))
    window.location.replace("../pages/payroll-form.html");
}
const getAllEmployee = () => {
    ajaxCall("GET", "http://localhost:3000/employee", null, (err, data) => {
        if (err) {
            console.log("there is err", err);
        } else {
            // assign the data to array
            employeeArray = JSON.parse(data);
            createInnerHtml()
        }
    })
}
/**
 * getData from json server
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
// get all employee when page is load
getAllEmployee()
