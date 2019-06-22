import React, { Component } from 'react';
import { SearchBar, Icon } from "antd-mobile";
import { searchSongList } from "../serveices/getTuijian";

export class search extends Component {
    async searchSong() {
        var searchstr = this.refs.searchInput.state.value;
        var result = await searchSongList(searchstr)
        console.log(result.data.result.songs)
    }
    render() {
        console.log(this.props)
        var style1 = { left: '0', position: 'absolute', top: '50%', marginTop: '-11px' }
        return (<div>
            <div className="searchHeader">
                <Icon type="left" style={style1} onClick={() => this.props.history.go(-1)} />
                <SearchBar style={{ marginLeft: '0.4rem' }} ref="searchInput" placeholder="搜索" onBlur={() => this.searchSong()} />
            </div>
        </div>)
    }
}
export default search