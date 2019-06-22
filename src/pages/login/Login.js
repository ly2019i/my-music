import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import imgUrl from "../../static/music.png";
import { setToken } from "../../utils/auth";
import { changeToBlock, changeToNone, changeFooterToNone, changeFooterToBlock } from "../../actions/changeDisplay";

export class Login extends Component {
    async componentDidMount() {
        await changeToNone();
        await changeFooterToNone();
    }
    async tiyan() {
        setToken('neverlogin');
        this.props.history.push({ pathname: '/' })
        await changeToBlock();
        await changeFooterToBlock();
    }
    render() {
        return (
            <div className="login">
                <img src={imgUrl} alt="网易云" className="loginimg" />
                <ul>
                    <li className="choseLogin">
                        <Link to={{ pathname: '/loginbyphone' }}>使用手机号登录</Link>
                    </li>
                    <li className="choseLogin">
                        <Link to={{ pathname: '/' }} onClick={() => this.tiyan()}>立即体验</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state.LoggedReducer;
}

export default connect(mapStateToProps)(Login)
