import React, { Component } from 'react'
import store from "../../Store";
import { getSongListDetail, searchSongList } from "../../serveices/getTuijian";
import { NavBar, Icon, List } from 'antd-mobile';
import MusicPlayer from "./musicPlayer";

const Item = List.Item;
export class songListDetail extends Component {
    constructor() {
        super();
        this.state = {
            songListDetail: {},
            tracks: [],
            mp3url: [],
            allUrl: [],
            id: '',
            datas: [],
        }
    }
    async componentDidMount() {
        // 派发事件改变头部和底部的状态
        await store.dispatch({
            type: 'Logged',
            payload: {
                display: 'none'
            }
        })
        //  根据传过来的id获取歌单详细信息并赋值到state
        const result = await getSongListDetail(this.props.match.params.id);
        await this.setState({
            songListDetail: result.data.playlist,
            tracks: result.data.playlist.tracks,
        })
        console.log(this.props, "详情页")
        console.log(this.state.songListDetail)
    }
    async playAll() {
        //  获取所有的歌曲id
        var datas = [];
        this.state.tracks.forEach((item, index) => {
            datas[index] = {};
            datas[index].al = item.al;
            datas[index].id = item.id;
            datas[index].name = item.name
        });
        await this.setState({
            datas: datas
        })
        await store.dispatch({
            type: 'getMusicId',
            payload: {
                datas: this.state.datas
            }
        })
        console.log('派发了')
    }
    async playSong(data) {
        //  向musicPlayer组件派发歌曲信息
        var datas = [];
        this.state.tracks.forEach((item, index) => {
            datas[index] = {};
            datas[index].al = item.al;
            datas[index].id = item.id;
            datas[index].name = item.name
        });
        await store.dispatch({
            type: 'getMusicId',
            payload: {
                data,
                datas: datas
            }
        })
    }
    async search() {
        const result = await searchSongList();
    }
    render() {
        const { songListDetail, tracks } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push({ pathname: '/tuijian' })}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={() => this.search()} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >歌单</NavBar>
                <div>
                    <div className="SLDHeader">
                        <div className="SLDHimg">
                            <img src={songListDetail.coverImgUrl} alt={songListDetail.name} />
                            <span className="playcount">{songListDetail.playCount}</span>
                        </div>
                        <div className="SLDdescription">
                            <h4>{songListDetail.name}</h4>
                            <div>
                                <p>{songListDetail.description}</p>
                                <span style={{ float: 'right' }}><Icon type="right" /></span>
                            </div>
                        </div>
                        <div className="handle">
                            <ul>
                                <li><p>评论</p>{songListDetail.commentCount}</li>
                                <li><p>分享</p>{songListDetail.shareCount}</li>
                                <li>下载</li>
                                <li>多选</li>
                            </ul>
                        </div>
                        <div className="palyAll">
                            <List className="my-list">
                                <Item onClick={() => this.playAll()} extra={`+ 收藏(${songListDetail.subscribedCount})`}>播放全部</Item>
                                {tracks.map(item => {
                                    var data = { id: item.id, name: item.name, picUrl: item.al.picUrl }
                                    return <Item onClick={() => this.playSong(data)} extra={<span>
                                        {/* <i style={{ display: 'block', border: '1px solid #cecece', float: 'left', width: '0.5rem', height: '0.5rem', borderRadius: '50%', position: 'relative', overflow: 'auto' }}>
                                            <Icon type="right" style={{ position: 'absolute', top: '0.02rem', left: 0 }} />
                                        </i> */}
                                        <Icon type="ellipsis" />
                                    </span>} key={item.id}>
                                        {item.name}
                                    </Item>
                                })}
                            </List>
                        </div>
                        <div className="musicPlay">
                            {/* {mp3url.map(item => {
                                return <audio key={item.id} controls="controls" autoPlay="autoplay" loop src={item.url}></audio>
                            })} */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default songListDetail;
