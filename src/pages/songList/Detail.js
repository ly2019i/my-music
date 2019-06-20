import React, { Component } from 'react'
import store from "../../Store";
import { getSongListDetail, getMusicUrl } from "../../serveices/getTuijian";
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
        }
    }
    async componentDidMount() {
        await store.dispatch({
            type: 'Logged',
            payload: {
                display: 'none'
            }
        })
        const result = await getSongListDetail(this.props.match.params.id);
        await this.setState({
            songListDetail: result.data.playlist,
            tracks: result.data.playlist.tracks,
        })
        console.log(this.props, "详情页")
        console.log(this.state.songListDetail)
        console.log(this.state.tracks)
    }
    async playAll() {
        var mp3id = '';
        this.state.tracks.forEach(item => mp3id += item.id + ",");
        mp3id = mp3id.substr(0, mp3id.length - 1);
        const result = await getMusicUrl(mp3id);
        var urlArr = [];
        for (var i in result.data.data) {
            urlArr.push(result.data.data[i].url)
        }
        this.setState({
            allUrl: urlArr
        })
        console.log(this.state.allUrl)
    }
    async playSong(id) {
        const result = await getMusicUrl(id)
        await this.setState({
            mp3url: result.data.data,
            id: id
        })
        await store.dispatch({
            type: 'getMusicId',
            payload: {
                id: id
            }
        })
    }
    render() {
        const { songListDetail, tracks, mp3url, allUrl, id } = this.state;
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push({ pathname: '/tuijian' })}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
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
                                    return <Item onClick={() => this.playSong(item.id)} extra={<span>
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
                            <MusicPlayer></MusicPlayer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default songListDetail;
