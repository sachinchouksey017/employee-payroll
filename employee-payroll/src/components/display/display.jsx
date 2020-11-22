import React from 'react';
import './display.scss'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'

const Display = (props) => {
    return (
        <table id="display" className="display">
            <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>
            {
                props.employeeArray && props.employeeArray.map(element => (
                    <tr>
                        <td><img className="profile" src={element.profileUrl} alt="" /></td>
                        <td>{element.name}</td>
                        <td>{element.gender}</td>
                        <td>
                            {
                                element.departMent.map(dept => (
                                    <div className='dept-label'>{dept}</div>
                                ))
                            }

                        </td>
                        <td> ₹ {element.salary}</td>
                        <td>{element.startDate}</td>
                        <td><img onClick="remove(element.id)" src={deleteIcon} alt="delete" />
                            <img onClick="update(element.id)" src={editIcon} alt="edit" />
                        </td>
                    </tr>
                ))
            }

        </table >
    )
}
export default Display;