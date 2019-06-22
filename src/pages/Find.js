import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import imgUrl from "../static/music.png";
import { connect } from 'react-redux';
class Find extends Component {
    render() {
        console.log(this.props)
        var { open } = this.props;
        const imgStyle = { width: '1rem', height: '1rem', display: 'block', borderRadius: '50%' }
        const zIndexNum = open ? 0 : 1;
        var style1 = { zIndex: zIndexNum }
        return (
            <div>
                <ul className="tuijian">
                    <li style={style1}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        每日推荐
                    </li>
                    <li style={style1} onClick={() => { this.props.history.push({ pathname: '/tuijian' }) }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        歌单
                    </li>
                    <li style={style1}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        排行榜
                    </li>
                    <li style={style1}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        电台
                    </li>
                    <li style={style1}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        直播
                    </li>
                </ul>
            </div >
        )
    }
}

export default connect(state => state.sideBarReducer)(withRouter(Find));
