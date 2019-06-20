import React, { Component } from 'react';
import { getToken } from '../utils/auth';
import { withRouter } from 'react-router-dom'

export default function AuthRouter(Page) {
    return withRouter(class AuthRouter extends Component {
        componentWillMount() {
            if (!getToken('token')) {
                this.props.history.replace('/Login')
            }
        }
        render() {
            return <Page {...this.props} />
        }
    })
}
