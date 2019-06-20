import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { getSongList, getCatlist } from "../../serveices/getTuijian";
import { Card, NavBar, Icon } from 'antd-mobile';
import store from "../../Store";

export class Tuijian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songList: []
        }
    }
    async componentDidMount() {
        await store.dispatch({
            type: 'Logged',
            payload: {
                display: 'none'
            }
        })
        const result = await getSongList();
        console.log(result)
        this.setState({
            songList: result.data.playlists
        })
    }
    async loadCatList() {
        const result = await getCatlist();
        console.log(result)
    }
    async onLeftClick() {
        this.props.history.push({ pathname: '/find' })
        await store.dispatch({
            type: 'Logged',
            payload: {
                display: 'block'
            }
        })
    }
    ToDetail(id) {
        this.props.history.push({ pathname: `/songlistdetail/${id}` })
    }
    render() {
        const { songList } = this.state;
        return (
            <div>
                <div className="songListHeader">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.onLeftClick()}
                    >歌单广场</NavBar>
                    <ul className="nav">
                        <li>推荐</li>
                        <li>官方</li>
                        <li>精品</li>
                        <li>话语</li>
                        <li onClick={() => this.loadCatList()}><Icon type="ellipsis" style={{ marginTop: "0.2rem" }}></Icon></li>
                    </ul>
                </div>
                <div className="songListContent">
                    {songList.map((item, index) => {
                        return (<Card key={index} className="songList" onClick={() => this.ToDetail(item.id)}>
                            <Card.Header
                                thumbStyle={{ width: '100%' }}
                                thumb={item.coverImgUrl}
                            />
                            <Card.Body style={{ padding: '0.05rem' }}>
                                <div className="songListName">{item.name}</div>
                            </Card.Body>
                        </Card>)
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(Tuijian);
