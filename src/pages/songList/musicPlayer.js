import React, { Component } from 'react';
import { getMusicUrl } from "../../serveices/getTuijian";
import store from "../../Store";
import { connect } from 'react-redux';

export class musicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mp3url: [],
            id: '',
        }
    }
    async componentDidUpdate() {
        await this.setState({
            id: this.props.id
        })
        console.log(this.state.id)
        console.log('aa')
    }
    async playSong() {
        const id = this.state.id ? this.state.id : '';
        // const result = await getMusicUrl(id)
        // await this.setState({
        //     mp3url: result.data.data
        // })
        console.log(id)
    }
    render() {
        return (
            <div className="musicPlayer" >
                <p>音乐播放器</p>
                <audio autoPlay="autoplay" loop></audio>
            </div>
        )
    }
}

export default connect(state => state.getMusicIdReducer)(musicPlayer)
