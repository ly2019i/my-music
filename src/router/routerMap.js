import Home from '../pages/Home';
import Find from '../pages/Find';
import Friend from '../pages/Friend';
import Video from '../pages/Video';
import Tuijian from "../pages/songList/Tuijian";
import songListDetail from "../pages/songList/Detail";
import CatList from "../pages/songList/CatList";
import Search from "../pages/Search";
// import Login from '../pages/login/Login';
// import LoginByPhone from "../pages/login/LoginByPhone";

export default [
    // { path: "/login", component: Login, name: '/Login' },
    // { path: "/loginbyphone", component: LoginByPhone, name: '/LoginByPhone' },
    { path: "/", component: Home, name: '/' },
    { path: "/find", component: Find, name: 'Find' },
    { path: "/friend", component: Friend, name: 'Friend' },
    { path: "/video", component: Video, name: 'Video' },
    { path: "/tuijian", component: Tuijian, name: 'Tuijian' },
    { path: "/songlistdetail/:id", component: songListDetail, name: 'songListDetail' },
    { path: "/catlist", component: CatList, name: 'CatList' },
    { path: "/search", component: Search, name: 'Search' },
]