let imageUrl = 'https://www.w3schools.com/howto/img_avatar.png';
let isUpdate = false;
const getRadioValue = () => {
    let ele = document.getElementsByName('gender');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value
        }
    }
    return ''
}
const setRadioValue = (value) => {
    let ele = document.getElementsByName('gender');
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
const resetValue = () => {
    document.getElementById('name').value = '';
    uncheckArray()
    document.getElementById('salary').value = '';
    document.getElementById('notes').value = ''
    document.getElementById('day').selectedIndex = 0;
    document.getElementById('month').selectedIndex = 0;
    document.getElementById('year').selectedIndex = 0;
}
const submit = () => {
    // window.open('http://www.w3schools.com',)
    console.log('call');
    let name = document.getElementById('name').value;
    let gender = getRadioValue();
    let checkedArray = getCheckedArray();
    let salary = document.getElementById('salary').value;
    let startDate = getStartDate();
    let notes = document.getElementById('notes').value
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
const onSelectFile = (e) => {
    if (e.target.files && e.target.files[0]) {
        let image = document.getElementById('image');
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
            image.src = event.target.result;
            imageUrl = event.target.result;
        }
    }
}
const checkForUpdate = () => {
    isUpdate = localStorage.getItem('editEmp') ? true : false;
    if (isUpdate) {
        document.getElementById('submitButton').innerHTML = 'Update'
        console.log(document.getElementsByClassName('submitButton'));
        let object = JSON.parse(localStorage.getItem('editEmp'));
        let date = object.startDate.split(" ");
        console.log(date);
        console.log(object);
        document.getElementById('name').value = object.name;
        check(object.departMent)
        setRadioValue(object.gender)
        document.getElementById('salary').value = object.salary;
        document.getElementById('notes').value = object.notes;
        document.getElementById('day').value = date[0];
        document.getElementById('month').value = date[1];
        document.getElementById('year').value = date[2];
        document.getElementById('image').src = object.profileUrl;
        imageUrl = object.profileUrl
    }
}
checkForUpdate()
