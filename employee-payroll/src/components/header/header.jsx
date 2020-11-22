import React from 'react';
import './header.scss'
import logo from '../../assets/images/logo.png'
const Toolbar = () => {
    return (
        <header className='header row center'>
            <div className="logo">
                <img src={logo} alt="" />
                <div>
                    <span className="emp-text">EMPLOYEE</span> <br />
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
            </div>
        </header>
    )
}
export default Toolbar;