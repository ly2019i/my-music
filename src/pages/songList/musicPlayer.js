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
            fen: 0,
            miao: 0,
            minute: 0,
            second: 0,
        }
    }
    componentDidMount() {
        console.log(this.refs)
    }
    async playSong(id) {
        const result = await getMusicUrl(id)
        await this.setState({
            mp3url: result.data.data[0].url,
        })
        console.log(result)
    }
    async componentDidUpdate(prevState) {
        if (this.props.id !== prevState.id) {
            this.playSong(this.props.id)
            this.showVoiceLength(this.state.mp3url)
            this.clearTimer();
            this.TimeSpan()
        }
    }
    showVoiceLength(voiceurl) {
        var voice = this.refs.test;          //获取到audio标签对象
        voice.src = voiceurl;                //将音频和audio进行关联
        voice.load();                            //加载音频
        voice.onloadedmetadata = async () => {        //音频元数据加载完成之后的回调 音频/视频的元数据包括：时长、尺寸（仅视频）以及文本轨道。
            var time = voice.duration;
            var minute = parseInt(time / 60);
            var second = parseInt(time % 60);
            await this.setState({
                fen: minute,
                miao: second,
            })
        }
    }
    TimeSpan = async () => {
        this.TimeSpan = setInterval(async () => {
            var audio = this.refs.test;
            var ProcessNow = (audio.currentTime / audio.duration) * 260;
            this.refs.ProcessNow.style.width = ProcessNow + 'px';
            await this.setState({
                second: this.state.second + 1
            })
            if (this.state.second === 60) {
                await this.setState({
                    minute: this.state.minute + 1,
                    second: 0
                })
            }
            var { minute, second, fen, miao } = this.state;
            if (minute !== 0) {
                console.log(minute, second, fen, miao)
                if (this.state.minute === this.state.fen && this.state.second === this.state.miao) {
                    console.log('aa')
                    await this.setState({
                        minute: 0,
                        second: 0
                    })
                    this.clearTimer();
                }
            }
        }, 1000);
    }
    clearTimer = async () => {
        clearInterval(this.TimeSpan);
    }
    pause() {
        this.refs.test.pause()
        this.clearTimer()
    }
    play() {
        this.refs.test.play();
        this.TimeSpan()
    }
    render() {
        var { minute, second, fen, miao } = this.state;
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
        fen = fen >= 10 ? fen : "0" + fen;
        miao = miao >= 10 ? miao : "0" + miao;
        return (
            <div className="musicPlayer" >
                <p>音乐播放器</p>
                <i onClick={() => this.play()}>播放</i>
                <i onClick={() => this.pause()}> 暂停</i>
                <audio ref="test" autoPlay="autoplay" loop src={this.state.mp3url}></audio>
                <div className="Process" ref="Process">

                    <div className="ProcessAll" ref="ProcessAll"></div>
                    <div className="ProcessNow" ref="ProcessNow"></div>
                    <div className="SongTime" ref="SongTime" dangerouslySetInnerHTML={{ __html: `${minute}:${second}` }}></div>
                    <div className="SongTime" ref="SongTime" dangerouslySetInnerHTML={{ __html: `${fen}:${miao}` }}></div>
                </div>
            </div >
        )
    }
}

export default connect(state => state.getMusicIdReducer)(musicPlayer)
