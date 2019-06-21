import { get } from '../utils/request';
import { serveUrl } from '../utils/config';

export function getTuijian() {
    return get(serveUrl + "/personalized")
}
///playlist/catlist
//  获取歌单
export function getSongList() {
    return get(serveUrl + "/top/playlist")
}
//  搜索
export function searchSongList(keywords) {
    return get(serveUrl + `/search?keywords=${keywords}`)
}
//  获取歌单详情
export function getSongListDetail(id) {
    return get(serveUrl + `/playlist/detail?id=${id}`)
}
//  获取歌单分类
export function getCatlist() {
    return get(serveUrl + "/playlist/catlist")
}
//  获取音乐Url
export function getMusicUrl(id) {
    return get(serveUrl + `/song/url?id=${id}`)
}
export function login(data) {
    return get(`${serveUrl}/login/cellphone?phone=${data.phone}&password=${data.password}`);
}
