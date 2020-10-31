employeeArray = [
    {
        name: 'Amarpa Shashanka Keerthi Kumar',
        gender: 'female',
        departMent: [
            'Sales',
            'HR',
            'Finance'
        ],
        salary: '10000',
        startDate: '29 Oct 2019',
        notes: '',
        id: new Date().getTime(),
        profileUrl: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
        name: 'Amarpa Shashanka Keerthi Kumar',
        gender: 'female',
        departMent: [
            'Sales',
            'HR',
            'Finance'
        ],
        salary: '10000',
        startDate: '29 Oct 2019',
        notes: '',
        id: new Date().getTime() + 1,
        profileUrl: 'https://www.w3schools.com/howto/img_avatar.png'
    },
    {
        name: 'Amarpa Shashanka Keerthi Kumar',
        gender: 'female',
        departMent: [
            'Sales',
            'HR',
            'Finance'
        ],
        salary: '10000',
        startDate: '29 Oct 2019',
        notes: '',
        id: new Date().getTime() + 2,
        profileUrl: 'https://www.w3schools.com/howto/img_avatar.png'
    }
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
const createInnerHtml =  () => {
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
createInnerHtml();

const remove = (node) => {
    // console.log(node.name);
    employeeArray = employeeArray.filter(item => item.id != node.name)
    console.log(employeeArray);
    localStorage.setItem('employee', JSON.stringify(employeeArray))
    createInnerHtml();
}

const update = (node) => {
    employee = employeeArray.find(ele => ele.id == node.name)
    localStorage.setItem('employee', JSON.stringify(employeeArray))
    localStorage.setItem('editEmp', JSON.stringify(employee))
    window.location.replace("../pages/payroll-form.html");
}