import React from 'react'
import './RightBar.css'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

export default function RightBar() {
    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };
    return (
        <div class="container">
            <div class="navigation">
                <ul>
                    <li>
                        <a href="/">
                            <span class="icon">
                                <ion-icon name="logo-apple"></ion-icon>
                            </span>
                            <h4 class="header">PORTAL JAVNIH NABAVKI</h4>
                        </a>
                    </li>
                    {isLoggedIn() && (
                        <li>
                            <Link to="/companyProfile" >
                                <span class="title">Pregled sopstvenih nabavki</span>
                            </Link>
                        </li>
                    )}
                    {isLoggedIn() && (
                        <li>
                            <Link to="/createProcurement" >
                                <span class="title">Kreiraj nabavku</span>
                            </Link>
                        </li>
                    )}

                    {isLoggedIn() && (
                        <li>
                            <Link to="/createProcPlan">
                                <span className="icon">
                                    <ion-icon name="settings-outline"></ion-icon>
                                </span>
                                <span className="title">Kreiranje plana javne nabavke</span>
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link to="/results" >
                            <span class="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span class="title">Rezultati javnih nabavki</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/" >
                            <span class="icon">
                                <ion-icon name="settings-outline"></ion-icon>
                            </span>
                            <span class="title">Javne Nabavke</span>
                        </Link>
                    </li>
                    {!isLoggedIn() && (
                        <li>
                            <a href="http://localhost:4200/login?service=javne_nabavke&redirect_url=http://localhost:3000/tokenReciever">
                                <span class="icon">
                                    <ion-icon name="lock-closed-outline"></ion-icon>
                                </span>
                                <span class="title">Prijava</span>
                            </a>
                        </li>
                    )}
                    {isLoggedIn() && (
                        <li>
                            <Link className='a' to={'/'} onClick={() => { localStorage.clear(); window.location.reload(); }}>
                                <span className="title">Odjava</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname

    return (
        <li>
            <Link to={to} {...props}>{children}</Link>
        </li>

    )
}
