//https://ibrahimovic.tistory.com/35
import React, { Component } from 'react';
import Header from "../component/Header";
import Gnb from "../component/Gnb";
import Footer from "../component/Footer";
import axios from "axios/index";
import WebtoonInfo from "../component/WebtoonInfo";
import EpisodeList from "../component/EpisodeList";

class WebtoonHome extends Component{
    constructor(props){
        super(props);

        this.state = {
            webtoonId : parseInt(props.match.params.webtoonId, 10), // 웹툰Id를 얻어서 숫자로 변환
            webtoon : {}, //웹툰 상세 객체
            episodeList : [] //에피소드 리스트
        };
    }

    componenetDidMount(){
        this.getWebtoon();
        this._getEpisdoeList();
    }

    _getWebtoon(){
        const apiUrl = '/daummy/webtoon_detail.json';

        axios.get(apiUrl)
        .then(data => {
            //웹툰들 중 ID가 일치하는 웹툰을 state/webtoon에 저장
            this.setState({
                webtoon : data.data.webtoons.find(w => (
                    w.id === this.state.webtoonId
                ))
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    _getEpisodeList(){
        const apiUrl = '/dummy/episode_list.json';

        axios.get(apiUrl)
            .then(data=> {
                //웹툰 ID가 일치하는 에피소드들만 state.episodeList에 저장
                this.setState({
                    episodeList : data.data.webtoonEpisodes.filter(episode => (episode.webtoonId ===this.state.webtoonId
                        ))
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <Header />
                <Gnb />

                { this.state.webtoon.id ? (
                    <WebtoonInfo webtoon = {this.state.webtoon} />
                ) : (
                    <span>LOADING...</span>
                )}

                { this.state.episodeList.length > 0 ? (
                    <EpisodeList epsiodes = {this.state.episodeList} />
                ) : (
                    <span>LOADING...</span>
                )}
                <Footer />
            </div>
        )
    }
}

export default WebtoonHome;