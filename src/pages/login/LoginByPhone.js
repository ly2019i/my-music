import React, { Component } from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import { setToken } from "../../utils/auth";
import { login } from '../../serveices/getTuijian';
import { regPhone } from "../../utils/reg";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    async handleClick() {
        const { data } = this.state;
        if (data) {
            if (regPhone.test(data.phone) && data.password.length >= 6) {
                try {
                    var result = await login(data)
                    console.log(result)
                    setToken('token');
                    Toast.success('登录成功')
                    // this.props.history.push({
                    //     pathname: '/'
                    // })
                    // window.location.reload();
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        Toast.fail(error.response.data.msg, 1);
                    }
                }

            } else {
                Toast.fail('请输入正确的手机号和密码', 1);
            }
        }
    }
    async getPhone() {
        await this.setState({
            data: {
                phone: this.autoFocusInst.state.value,
                password: this.inputRef.state.value
            }
        })
    }
    render() {
        return (
            <div>
                <List renderHeader={() => '登录'}>
                    <InputItem
                        clear
                        placeholder="请输入手机号"
                        ref={el => this.autoFocusInst = el}
                        onBlur={() => this.getPhone()}
                    >手机号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        type="password"
                        ref={el => this.inputRef = el}
                        onBlur={() => this.getPhone()}
                    >密码</InputItem>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => this.handleClick()}
                        >
                            登录
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default Login
