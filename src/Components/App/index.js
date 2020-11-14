import React from 'react';
import Grid from '@material-ui/core/Grid';
import Styles from '../../Styles/App';
import data from '../../Resources/CVData/data.json';
import en from '../../Languages/en.json';
import LanguageSelector from '../../Components/LanguageSelector';
import PersonInfo from '../../Components/PersonInfo';
import TimelineView from '../TimelineView';
import ULView from '../../Components/ULView';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lng: "en",
            lngTranslations: en,
            currentBackgroundImage: 1,
            backgroundImage: "url(/assets/images/b_img_2.jpg) no-repeat center center fixed",
            backgroundImageTime: 1000
        }
    }

    componentDidMount = () => {
    }

    changeBackgroundImage = () => {
    }

    updateState = state => this.setState(state);

    render() {
        const { lng, lngTranslations } = this.state;
        const Inner  = data.cv_info.map((info, idx) => {
            if (info.type === "timeline") {
                return (
                    <TimelineView
                        key={idx}
                        data={info}
                        lng={lng}
                        lngTranslations={lngTranslations}
                    />
                )
            } else if (info.type === "ul") {
                return (
                    <ULView
                        key={idx}
                        data={info}
                        lng={lng}
                        lngTranslations={lngTranslations}
                    />
                )
            } else {
                return (<></>)
            }
        });
        return(
            <Grid
                container
                justify="center"
                style={{
                    background: this.state.backgroundImage,
                    backgroundSize: "cover",
                    height: "100%",
                    overflow: "hidden"
                }}
            >
                <Grid
                    item xs={12}
                    sm={12}
                    md={6}
                    lg={8}
                    style={Styles.mainContainer}
                >
                    <LanguageSelector
                        updateAppState={this.updateState}
                        lng={lng}
                        lngTranslations={lngTranslations}
                    />
                    <PersonInfo
                        data={data.person_info}
                        lngTranslations={lngTranslations}
                    />
                    {Inner}
                </Grid>
            </Grid>
        )
    }

}
