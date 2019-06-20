import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import imgUrl from "../static/music.png";
class Find extends Component {
    render() {
        const imgStyle = { width: '1rem', height: '1rem', display: 'block', borderRadius: '50%' }
        return (
            <div>
                <ul className="tuijian">
                    <li style={{ zIndex: 1 }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        每日推荐
                    </li>
                    <li style={{ zIndex: 1 }} onClick={() => { this.props.history.push({ pathname: '/tuijian' }) }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        歌单
                    </li>
                    <li style={{ zIndex: 1 }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        排行榜
                    </li>
                    <li style={{ zIndex: 1 }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        电台
                    </li>
                    <li style={{ zIndex: 1 }}>
                        <label><img src={imgUrl} alt="网易" style={imgStyle} /></label>
                        直播
                    </li>
                </ul>
            </div >
        )
    }
}

export default withRouter(Find);
