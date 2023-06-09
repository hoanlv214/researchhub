import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/actions/authAction"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import Avatar from "../Avatar"
import NotifyModal from "../NotifyModal"

const Menu = () => {
    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Message", icon: "comment", path: "/message" },
        { label: "Discover", icon: "travel_explore", path: "/discover" }
    ]

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return "active"
    }

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row align-items-center justify-content-between">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-3 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }

                <li className="nav-item dropdown" style={{ opacity: 1 }} >
                    <span className="nav-link position-relative" id="navbarDropdown"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons"
                            style={{ color: notify.data.length > 0 ? "black" : "" }}>
                            notifications
                        </span>

                        <span className="notify_length">{notify.data.length}</span>

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                        style={{ transform: "translateX(5%)" }}>
                        <NotifyModal />
                    </div>

                </li>


                <li className="nav-item dropdown d-flex align-items-center justify-content-center" style={{ opacity: 1 }}>
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ transform: "translateX(0px)" }}>
                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                            <span className="material-icons" style={{ fontSize: "15px" }}>manage_accounts</span> Profile
                        </Link>
                        {auth.user.role === "admin" && (
                            <Link className="dropdown-item" to="/admin">
                                <span className="material-icons" style={{ fontSize: "15px" }}>admin_panel_settings</span> Admin
                            </Link>
                        )}
                        <label htmlFor="theme" className="dropdown-item align-items-center justify-content-start"
                            onClick={() => dispatch({
                                type: GLOBALTYPES.THEME, payload: !theme
                            })}>
                            <span className="material-icons" style={{ fontSize: "15px" }}>{theme ? "light_mode" : "mode_night"}</span>
                            {theme ? " Light mode" : " Dark mode"}
                        </label>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>
                            <span className="material-icons" style={{ fontSize: "15px" }}>logout</span> Logout
                        </Link>
                    </div>
                </li>

            </ul>
        </div>

    )
}

export default Menu