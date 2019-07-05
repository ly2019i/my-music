import React, { Component } from 'react';
import { connect } from "react-redux"
import { SearchBar, Icon, List } from "antd-mobile";
import { searchSongList } from "../serveices/getTuijian";
import store from '../Store';

const Item = List.Item;
const Brief = Item.Brief;
export class search extends Component {
    constructor() {
        super();
        this.state = {
            searchInfo: [],
            isShow: false,
            fromDetail: false,
        }
    }
    async componentDidMount() {
        await store.dispatch({
            type: 'Logged',
            payload: {
                display: 'none'
            }
        })
        await this.setState({
            fromDetail: this.props.fromDetail
        })
    }
    async componentWillUnmount() {
        if (!this.state.fromDetail) {
            await store.dispatch({
                type: 'Logged',
                payload: {
                    display: 'block'
                }
            })
        }
    }
    async searchSong() {
        var searchstr = this.refs.searchInput.state.value;
        if (searchstr !== '') {
            var result = await searchSongList(searchstr)
            await this.setState({
                searchInfo: result.data.result.songs,
                isShow: true,
            })
            console.log(this.state.searchInfo)
        }
    }
    async searchSongFromDetail() {
        var searchstr = this.refs.searchInput.state.value;
        var songList = [];
        this.props.datas.map(item => {
            if (item.name.indexOf(searchstr) >= 0) {
                songList.push(item)
            }
        })
        await this.setState({
            searchInfo: songList,
            isShow: true,
        })
        console.log(songList)
    }
    render() {
        console.log(this.props)
        console.log(this.state.fromDetail)
        const { searchInfo, isShow, fromDetail } = this.state;
        var style1 = { left: '0', position: 'absolute', top: '50%', marginTop: '-11px' }
        return (<div>
            <div className="searchHeader">
                <Icon type="left" style={style1} onClick={() => this.props.history.go(-1)} />
                {fromDetail
                    ? <SearchBar style={{ marginLeft: '0.4rem' }} ref="searchInput" placeholder="搜索歌单内歌曲" onBlur={() => this.searchSongFromDetail()} />
                    : <SearchBar style={{ marginLeft: '0.4rem' }} ref="searchInput" placeholder="搜索" onBlur={() => this.searchSong()} />
                }
            </div>
            <div className="searchList">
                <List className="">
                    {isShow ? <Item onClick={() => this.playAll()}>播放全部</Item> : ''}
                    {fromDetail ?
                        searchInfo.map(item => {
                            var data = { id: item.id, name: item.name }
                            return <Item onClick={() => this.playSong(data)}
                                extra={<span>
                                    <Icon type="ellipsis" />
                                </span>}
                                key={item.id}>
                                {item.name}
                            </Item>
                        })
                        : searchInfo.map(item => {
                            var data = { id: item.id, name: item.name, picUrl: item.album.artist.picUrl }
                            return <Item onClick={() => this.playSong(data)}
                                extra={<span>
                                    <Icon type="ellipsis" />
                                </span>}
                                key={item.id}>
                                {item.name}
                                <Brief>
                                    {item.artists.map(artists => {
                                        return <span key={artists.id}>
                                            {artists.name}&nbsp;
                                        </span>
                                    }
                                    )}
                                    <br />
                                    material if you set the click event.
                                </Brief>
                            </Item>
                        })
                    }
                </List>
            </div>
        </div>)
    }
}
export default connect(state => state.FromDetailReducer)(search)