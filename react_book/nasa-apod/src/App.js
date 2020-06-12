import React, {Component} from 'react';
import ViewerTemplate from "./components/ViewerTemplate";
import SpaceNavigator from "./components/SpaceNavigator";
import Viewer from "./components/Viewer";
import moment from "moment";
import * as api from "./lib/api";
import {load} from "dotenv";

class App extends Component {
    state = {
        loading: false,
        maxDate: null,
        date: null,
        urL: null,
        mediaType: null
    };

    getAPOD = async (date) => {
        if (this.state.loading) return; // 로딩 중이면 무시

        // 로딩 시작
        this.setState({
            loading: true
        });

        try {
            const reponse = await api.getAPOD(date);
            // 비구조화 할당
            const { date: retrievedDate, url, media_type: mediaType } = reponse.data;

            if (!this.state.maxDate) {
                this.setState({
                    maxDate: retrievedDate
                });
            }

            // 전달 받은 데이터
            this.setState({
               date: retrievedDate,
               mediaType,
               url
            });
        } catch (e) {
            // 오류 발생 시
            console.log(e);
        }

        // 로딩 종료
        this.setState({
            loading: false
        });
    };

    handlePrev = () => {
        const { date } = this.state;
        const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
        console.log(prevDate);
        this.getAPOD(prevDate);
    };

    handleNext = () => {
        const { date, maxDate } = this.state;
        if (date === maxDate) return;

        const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
        this.getAPOD(nextDate);
    };

    componentDidMount() {
        this.getAPOD();
    }

    render() {
        const { url, mediaType, loading } = this.state;
        const { handlePrev, handleNext } = this;

        return (
            <div>
                <ViewerTemplate
                    spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}
                    viewer={(
                        <Viewer
                            url={url}
                            mediaType={mediaType}
                            loading={loading}
                        />
                    )}
                />
            </div>
        );
    }

}

export default App;
