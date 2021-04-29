import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {
    FaList,
    FaSyncAlt,
    FaUser,
    FaTools,
    FaPowerOff,
    FaBars,
} from "react-icons/fa";
import {Collapse} from "react-bootstrap";

function Navbar(){
  const [show,setShow] = useState(false);
    return(
        <>
            <nav
                className="navbar navbar-expand-lg   bg-navbar-Ordini static-top"
                id="sideNav"
            >
                <a className="navbar-brand  js-scroll-trigger" href="#page-top">
                    {" "}
                </a>
                        <ul className="nav d-lg-none w-100  justify-content-end ">
                            <Link to="/admin/orders">
                                <li className="nav-item nav-link ">
                                    <FaList/>
                                </li>
                            </Link>
                            <li className="nav-item nav-link">
                                <FaSyncAlt/>
                            </li>
                            <li className="nav-item nav-link">
                                <FaTools/>
                            </li>
                            <li className="nav-item nav-link">
                                <FaUser/>
                            </li>
                            <li className="nav-item nav-link">
                                <FaPowerOff/>
                            </li>
                        </ul>




                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <Link to="/admin/orders">
                        <li className="nav-item nav-link ">
                            <FaList/>
                        </li>
                        </Link>
                        <li className="nav-item nav-link">
                            <FaSyncAlt/>
                        </li>
                        <li className="nav-item nav-link">
                            <FaTools/>
                        </li>
                        <li className="nav-item nav-link">
                            <FaUser/>
                        </li>
                        <li className="nav-item nav-link">
                            <FaPowerOff/>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar;