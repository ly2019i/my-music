import React, { Component } from 'react';
import { getMusicUrl } from "../../serveices/getTuijian";
import { connect } from 'react-redux';

export class musicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mp3url: '',
            id: '',
            fen: 0,
            miao: 0,
            minute: 0,
            second: 0,
            index: 0,
            data: {},
        }
    }
    async playSong(id) {
        // 获取歌曲url
        const result = await getMusicUrl(id)
        await this.setState({
            mp3url: result.data.data[0].url,
        })
        console.log(result)
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.datas.length !== 0) {
            console.log(nextProps)
            this.startPlay(nextProps.datas[this.state.index].id)
            await this.setState({
                data: nextProps.datas[this.state.index].al,
                index: this.state.index += 1,
            })
            //  监听上一首歌播放完毕
            this.refs.playOne.onended = async () => {
                console.log(this.state.index)
                this.startPlay(nextProps.datas[this.state.index].id)
                await this.setState({
                    data: nextProps.datas[this.state.index].al,
                    index: this.state.index += 1,
                })
            };
        }
    }
    async componentDidUpdate(prevState) {
        if (this.props.data !== prevState.data) {
            //  切歌的时候如果当前的秒数不为0就重置为0
            if (this.state.second !== 0) {
                await this.setState({
                    minute: 0,
                    second: 0,
                    index: 0,
                })
            }
            await this.setState({
                data: this.props.data
            })
            this.startPlay(this.props.data.id)
        }
    }
    startPlay(id) {
        this.clearTimer();
        this.playSong(id)
        this.showVoiceLength(this.state.mp3url, this.refs.playOne)
        this.TimeSpanFun(this.refs.playOne)
    }
    componentWillUnmount() {
        this.clearTimer()
    }
    showVoiceLength(voiceurl, refs) {
        var voice = refs;          //获取到audio标签对象
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
    TimeSpanFun = async (refs) => {
        var ProcessNow = 0;
        this.TimeSpan = setInterval(async () => {
            var audio = refs;
            //  进度条
            var ProcessNow = (audio.currentTime / audio.duration) * 260;
            this.refs.ProcessNow.style.width = ProcessNow + 'px';
            //  设置秒数加1
            await this.setState({
                second: this.state.second + 1
            })
            //  如果够一分钟就设置分加1
            if (this.state.second === 60) {
                await this.setState({
                    minute: this.state.minute + 1,
                    second: 0
                })
            }
            //  判断分和秒等于歌曲的时间的时候清除定时器 同时把分和秒重置为0
            if (this.state.minute === this.state.fen && this.state.second === this.state.miao) {
                await this.setState({
                    minute: 0,
                    second: 0
                })
                this.clearTimer();
            }
        }, 1000);
    }
    //  清除定时器
    clearTimer = async () => {
        clearInterval(this.TimeSpan);
    }
    pause() {
        //  音频暂停
        this.refs.playOne.pause()
        this.clearTimer()
    }
    play() {
        //  播放音频
        this.refs.playOne.play();
        //  执行定时器
        this.TimeSpanFun(this.refs.playOne)
    }
    render() {
        const { data } = this.state;
        var { minute, second, fen, miao } = this.state;
        minute = minute >= 10 ? minute : "0" + minute;
        second = second >= 10 ? second : "0" + second;
        fen = fen >= 10 ? fen : "0" + fen;
        miao = miao >= 10 ? miao : "0" + miao;
        return (
            <div className="musicPlayer" >
                <p>当前正在播放：{data.name}</p>
                <img src={data.picUrl} alt={this.name} style={{ width: '0.8rem' }} />
                <i onClick={() => this.play()}>播放</i>
                <i onClick={() => this.pause()}> 暂停</i>
                <audio ref="playOne" autoPlay="autoplay" src={this.state.mp3url}></audio>
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
