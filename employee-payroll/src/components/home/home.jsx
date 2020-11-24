import React from 'react';
import searchIcon from '../../assets/icons/search-black-18dp.svg'
import addIcon from '../../assets/icons/add-24px.svg'
import './home.scss'
import EmployeeService from '../../services/employee-service'
import Display from '../display/display';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchExpand: false,
            employeeArray: []
        }
        this.employeeService = new EmployeeService()

    }
    openSearch = () => {
        this.setState({ searchExpand: true })
    }
    componentDidMount() {
        this.getAllEmployee();
    }

    getAllEmployee = () => {
        this.employeeService.getAllEmployee().then(data => {
            console.log("data after get ", data.data);
            this.setState({ employeeArray: data.data })
        }).catch(err => {
            console.log("err after ", err);
        })
    }
    search =()=>{
        console.log("auu");
    }

    render() {
        return (
            <div>
                <div className="column content">
                    <div className="emp-detail">
                        <div className="detail-text">
                            Employee Details <div className="count"></div>
                        </div>
                        <div className="row center button-box">
                            <div className='search-box' onClick={this.openSearch}>
                                <input className={"input " + (this.state.searchExpand && 'input-expand')} onChange={this.search} type="text" placeholder="" />
                                <img className="search-icon" src={searchIcon} alt="" />
                            </div>
                            <a  className="add-button flex-row-center">
                                <img src={addIcon} alt="" />
          Add User</a>

                        </div>
                    </div>
                    <div className="table-main">
                        <Display employeeArray={this.state.employeeArray} />
                    </div>
                </div>
            </div>
        )
    }
}