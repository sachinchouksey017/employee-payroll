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
    ajaxCall("DELETE", "http://localhost:3000/employee/" + node.name)

}

const update = (node) => {
    employee = employeeArray.find(ele => ele.id == node.name)
    localStorage.setItem('employee', JSON.stringify(employeeArray))
    localStorage.setItem('editEmp', JSON.stringify(employee))
    window.location.replace("../pages/payroll-form.html");
}
/**
 * getData from json server
 */
const ajaxCall = (method = "POST", url, data = null) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            if (method == "GET") {
                employeeArray = JSON.parse(xhttp.response);
            } else {
                // 
                ajaxCall("GET", "http://localhost:3000/employee")
            }
            console.log(employeeArray);
            createInnerHtml();
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();

}
ajaxCall("GET", "http://localhost:3000/employee")