import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from 'react-bootstrap/Card';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import ImportantDevicesOutlinedIcon from '@material-ui/icons/ImportantDevicesOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import Moment from 'moment';
import Styles from '../../Styles/TimelineView'

export default class TimelineView extends React.Component {

    render() {
        const { data, lng, lngTranslations } = this.props;
        const Translations = lngTranslations['TimelineView'];
        const Inner = data.data.map((sTimeline, idx) => {
            var ret = (<React.Fragment key={idx} />), sContent = sTimeline.content[lng], seperatorIcon = (<React.Fragment key={idx} />);
            if ('seperator' in sTimeline && 'icon' in sTimeline.seperator) {
                seperatorIcon = <MySeperatorIcon icon={sTimeline.seperator.icon} />
            }
            if (sContent) {
                ret = (
                    <TimelineItem
                        key={idx}
                    >
                        <TimelineOppositeContent style={Styles.timelineOppositeContent}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                style={Styles.timelineOppositeContentTypo}
                            >
                                {
                                    sTimeline
                                        .date
                                        .replace(/{_UNTIL_NOW_YEAR_TRANS_}/g, Moment(new Date()).format('Y'))
                                        .replace(/{_UNTIL_NOW_TXT_TRANS_}/g, Translations.until_now_txt_trans)
                                }
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                {seperatorIcon}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} style={Styles.timelineContentPaper}>
                                <Typography>
                                    {sContent}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                );
            }
            return ret;
        });
        return (
            <Grid
                container
                justify="center"
                style={Styles.mainRow}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
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
                            <Timeline align="alternate">
                                {Inner}
                            </Timeline>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        )
    }

}

const MySeperatorIcon = props => {
    let ret = (<></>);
    if (props.icon === 'school_outlined') {
        ret = <SchoolOutlinedIcon color="primary" />;
    } else if (props.icon === 'restaurant_outlined') {
        ret = <RestaurantOutlinedIcon color="primary" />;
    } else if (props.icon === 'important_devices_outlined') {
        ret = <ImportantDevicesOutlinedIcon color="primary" />;
    } else if (props.icon === 'work_outlined') {
        ret = <WorkOutlineOutlinedIcon color="primary" />;
    } else if (props.icon === 'app_outlined') {
        ret = <AppsOutlinedIcon color="primary" />;
    } else if (props.icon === 'dashboard_outlined') {
        ret = <DashboardOutlinedIcon color="primary" />;
    } else if (props.icon === 'today_outlined') {
        ret = <TodayOutlinedIcon color="primary" />;
    }
    return ret;
}