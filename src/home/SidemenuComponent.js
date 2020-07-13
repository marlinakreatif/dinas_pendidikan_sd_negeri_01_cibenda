import React from 'react';
import { NavLink } from 'react-router-dom';



export const SubMenuItem = ({ icon, size, text, to }) => {
    return (
        <NavLink exact replace={true} activeClassName="sub-menu-active" to={to}>
            <span>
                <i className={`fa ${icon} ${size}`} aria-hidden="true"></i> <b>{text}</b>
            </span>
        </NavLink>
    )
}
