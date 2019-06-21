import React, { Component } from 'react';
import { getSongList, getCatlist } from "../../serveices/getTuijian";

export class CatList extends Component {
    async componentDidMount() {
        const result = await getCatlist();
        console.log(result)
    }
    render() {
        return (
            <div>
                歌单列表
            </div>
        )
    }
}

export default CatList
