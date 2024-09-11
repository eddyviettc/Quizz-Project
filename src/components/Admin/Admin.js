import SideBar from "./SideBar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";


const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)} >
                        <FaBars className="left-side" />
                    </span>
                    <div className="right-side">
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                        </NavDropdown>

                        <Language />

                    </div>

                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>


            </div>

        </div>
    )
}
export default Admin;