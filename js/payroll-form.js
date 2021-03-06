let imageUrl = 'https://www.w3schools.com/howto/img_avatar.png';
let isUpdate = false;
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
const save = () => {
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
    console.log(temp);
    // taking all employee array from localstorage
    let employeeArray = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')) : []
    if (isUpdate) {
        let object = JSON.parse(localStorage.getItem('editEmp'));
        let index = employeeArray.findIndex(ele => ele.id == object.id);
        temp.id = object.id
        employeeArray[index] = temp;
    } else {
        employeeArray = [...employeeArray, temp];
    }
    localStorage.setItem('employee', JSON.stringify(employeeArray))
    localStorage.removeItem('editEmp')
    resetValue()
    window.location.replace("../pages/home.html");
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
checkForUpdate()
