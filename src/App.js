import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Routers from './router/routerMap'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login/Login';
import LoginByPhone from "./pages/login/LoginByPhone";
import PNF from './pages/404';
import AuthRouter from "./components/AuthRouter";
const Auth = AuthRouter(Route);

class App extends Component {
  render() {
    const style1 = { display: this.props.display }
    return (
      <Router>
        <div className="App">
          <div style={style1}>
            <Header />
          </div>
          <div className="main">
            <Switch>
              <Route path="/login" exact component={Login} ></Route>
              <Route path="/loginbyphone" exact component={LoginByPhone} ></Route>
              {Routers.map((item, index) => {
                return <Auth path={item.path} exact component={item.component} key={index}></Auth>
              })}
              <Route component={PNF}></Route>
            </Switch>
          </div>
          <div style={style1}>
            <Footer ></Footer>
          </div>
        </div>
      </Router>
    )

  }
}
export default connect(state => state.LoggedReducer)(App);
