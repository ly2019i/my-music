import React, { Component } from 'react';
import MusicPlayer from "../pages/songList/musicPlayer";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <MusicPlayer></MusicPlayer>
            </div>
        )
    }
}

export default Footer;
