import React, { Component } from 'react';
import "./login.css";

export default class Login extends Component {
    render() {
        return (
            <div className="login-body">
                <div className="bg-overlay-trs"></div>
                <div className="login-form">
                    <div className="logo">
                        <img src="/kbb.png" alt="Kabupaten Bandung Barat" />
                    </div>
                    <div className="title">
                        <span id="dinas">Dinas Pendidikan</span><br />
                        <span id="sekolah">{"SD Negeri 01 Cibenda".toLocaleUpperCase()}</span>
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}
