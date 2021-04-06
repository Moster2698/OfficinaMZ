import React from 'react';
import { FaList, FaSyncAlt, FaUser, FaTools, FaPowerOff,FaBars } from "react-icons/fa";

export const SidebarData = [
  {
    icon: <FaBars />,
    cName: 'nav-text'
  },
  {
    icon: <FaSyncAlt/>,
    path:"/admin/orders",
    cName: 'nav-text'
  },
  {

    icon: <FaTools />,
    cName: 'nav-text'
  },
  {
  
    icon: <FaUser />,
    cName: 'nav-text'
  },
  {

    icon: <FaPowerOff/>,
    cName: 'nav-text'
  }
];