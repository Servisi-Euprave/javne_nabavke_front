import React from 'react'
import './RightBar.css'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

export default function RightBar() {
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

                    <li>
                        <Link to="/createProcurement" >
                            <span class="icon">
                                <ReactSVG src="./red.svg"/>
                            </span>
                            <span class="title">Kreiraj nabavku</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/createProcPlan" >
                            <span class="icon">
                                <ion-icon name="settings-outline"></ion-icon>
                            </span>
                            <span class="title">Kreiranje plana javne nabavke</span>
                        </Link>
                    </li>

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

                    <li>
                        <a href="http://localhost:4200/login?service=javne_nabavke&redirect_url=http://localhost:3000/tokenReciever">
                            <span class="icon">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span>
                            <span class="title">Prijava</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <span class="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span class="title">Odjava</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
function CustomLink({to,children, ...props}){
    const path = window.location.pathname

    return(
      <li>
        <Link to = {to} {...props}>{children}</Link>
      </li>

    )
  }
