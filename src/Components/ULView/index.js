import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from 'react-bootstrap/Card';
import Typography from '@material-ui/core/Typography';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import Styles from '../../Styles/ULView/';

export default class ULView extends React.Component {

    render() {
        const { data, lng, lngTranslations } = this.props;
        const Translations = lngTranslations['ULView'];
        const Inner = data.data.map((sUL, idx) => {
            let mainContent, remarksContent, ret = (<React.Fragment key={idx} />), { content } = sUL;
            if ("all" in content.main) {
                mainContent = content.main.all;
            }
            if ("all" in content.remarks) {
                remarksContent = content.remarks.all;
            }
            if (lng in content.main) {
                mainContent = content.main[lng];
            }
            if (lng in content.remarks) {
                remarksContent = content.remarks[lng];
            }
            if (mainContent) {
                ret = (
                    <ULTypography
                        key={idx}
                        txtMain={mainContent}
                        txtRemarks={remarksContent}
                    />
                );
            }
            return ret;
        })
        return (
            <Grid
                container
                justify="center"
                style={Styles.mainRow}
            >
                <Grid
                    item xs sm md lg
                >
                    <Card
                        bg="light"
                        key="1"
                        text="dark"
                    >
                        <Card.Header style={Styles.cardHeader}>
                            {Translations[data.title]}
                        </Card.Header>
                        <Card.Body style={Styles.cardBody}>
                            {Inner}
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        )
    }

}

const ULTypography = (props) => {
    return (
        <Grid
            container
            justify="center"
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={8}
            >
                <Typography
                    variant="h5"
                    color="primary" style={Styles.ulTypography1}
                >
                    <ArrowRightRoundedIcon />
                    {props.txtMain}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={Styles.ulTypography2}
                >
                    {props.txtRemarks}
                </Typography>
            </Grid>
        </Grid>
    )
}