import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, List, Icon, Card, WingBlank, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import "../index.css";
import imgUrl from "../static/avatar.jpg";
import CardImg from "../static/music.png";
class Header extends Component {
    state = {
        open: false
    };
    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    }
    componentDidMount() {
    }
    render() {
        const sidebar = (<List style={{ width: '6rem' }}>
            {['演出', '商城', '附近的人', '口袋铃声', '定时停止播放', '扫一扫', '音乐闹钟', '音乐云盘', '在线听歌免流量', '游戏推荐', '优惠券', '加入网易音乐人', '我要直播22'].map((i, index) => {
                if (index === 0) {
                    return (<WingBlank size="lg" key={index}>
                        <WhiteSpace size="lg" />
                        <Card full className="user">
                            <Card.Header
                                thumb={imgUrl}
                            />
                            <Card.Footer content="小明" extra={<div>lv9<span>签到</span></div>} />
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>)
                }
                return (<List.Item key={index}
                    thumb={CardImg}
                >{i}</List.Item>);
            })}
        </List>);
        return (
            <div className="header">
                <div style={{ zIndex: 1 }} onClick={(e) => this.onOpenChange()} >
                    <Icon key="1" type="ellipsis" style={{ margin: '0.2rem' }} />
                </div>
                <ul className="nav">
                    <li onClick={() => this.props.history.push({ pathname: '/' })}>我的</li>
                    <li onClick={() => this.props.history.push({ pathname: '/find' })}>发现</li>
                    <li onClick={() => this.props.history.push({ pathname: '/friend' })}>朋友</li>
                    <li onClick={() => this.props.history.push({ pathname: '/video' })}>视频</li>
                </ul>
                <Icon key="2" type="search" style={{ margin: '0.2rem' }} />
                <Drawer
                    className="my-drawer"
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                ><p></p>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(Header);
