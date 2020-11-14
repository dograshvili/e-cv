import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import el from '../../Languages/el.json';
import en from '../../Languages/en.json';
import ka from '../../Languages/ka.json';
import Styles from '../../Styles/LanguageSelector/';

export default class LanguageSelector extends React.Component {

    render() {
        const { lng, updateAppState, lngTranslations } = this.props;
        const Translations = lngTranslations['LanguageSelector'];
        return(
            <Grid
                container
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={Styles.lngGrid}
                >
                    <Grid
                        container
                        justify="flex-end"
                    >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lng}
                            onChange={e => {
                                const lngNew = e.target.value;
                                if (lngNew !== lng) {
                                    if (lngNew === "en") {
                                        updateAppState({
                                            lng: lngNew,
                                            lngTranslations: en
                                        });
                                    } else if (lngNew === "ka") {
                                        updateAppState({
                                            lng: lngNew,
                                            lngTranslations: ka
                                        });
                                    } else {
                                        updateAppState({
                                            lng: "el",
                                            lngTranslations: el
                                        });
                                    }
                                }
                            }}
                        >
                            <MenuItem
                                value="el"
                            >
                                <img src={require('../../Resources/Flags/gr.png')} alt="img" style={Styles.imgFlag} />
                                {Translations.dropdown_choose_language_el_trans}
                            </MenuItem>
                            <MenuItem
                                value="en"
                            >
                                <img src={require('../../Resources/Flags/us.png')} alt="img" style={Styles.imgFlag} />
                                {Translations.dropdown_choose_language_en_trans}
                            </MenuItem>
                            {/* <MenuItem
                                value="ka"
                            >
                                <img src={require('../../Resources/Flags/ge.png')} alt="img" style={Styles.imgFlag} />
                                {Translations.dropdown_choose_language_ka_trans}
                            </MenuItem> */}
                        </Select>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                >
                    <Grid
                        container
                        justify="center"
                    >
                        <h2 style={Styles.mainTitle}>
                            {Translations.main_title_trans}
                        </h2>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}