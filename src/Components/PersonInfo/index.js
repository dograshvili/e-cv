import React from 'react';
import Grid from '@material-ui/core/Grid';
import { isMobile } from 'react-device-detect';
import Card from 'react-bootstrap/Card';
import Styles from '../../Styles/PersonInfo';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';

export default class PersonInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blAsk: false,
            toAsk: "none"
        };
    }

    updateState = state => this.setState(state)

    render() {
        const { data, lngTranslations } = this.props;
        const Translations = lngTranslations['PersonInfo'];
        const Inner = Object.entries(data).map((entry, idx) => {
            var entryContent = (<></>);
            if (typeof entry[1] === 'object') {
                let type = entry[1].type;
                if (type === 'link') {
                    entryContent = (
                        <Link
                            href={entry[1].link}
                            target="_blank"
                        >
                            <LinkOutlinedIcon
                                color="primary"
                                fontSize="default"
                            />
                        </Link>
                    );
                }
            } else {
                if (entry[1] === 'ASK_MOBILE' || entry[1] === 'ASK_ADDRESS' || entry[1] === 'ASK_EMAIL') {
                    entryContent = (
                        <Link
                            component="button"
                            onClick={() => {
                                this.updateState({
                                    blAsk: true,
                                    toAsk: `${entry[1].toLowerCase().replace('ask_','')}`
                                });
                            }}
                        >
                             <TextsmsOutlinedIcon
                                color="primary"
                                fontSize="default"
                             />
                        </Link>
                    );
                } else {
                    entryContent = entry[1];
                }
            }
            return (
                <Grid
                    container
                    justify="center"
                    key={idx}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        className={isMobile ? "text-center" : "text-right"}
                        style={Styles.cardBodyRowCol1}
                    >
                        {Translations[entry[0]]}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={8}
                        style={Styles.cardBodyRowCol2}
                    >
                        {entryContent}
                    </Grid>
                </Grid>
            )
        })
        return(
            <>
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
                                {Translations.main_title_trans}
                            </Card.Header>
                            <Card.Body style={Styles.cardBody}>
                                {Inner}
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid>
                <InfoAsk
                    updatePersonInfoState={this.updateState}
                    blAsk={this.state.blAsk}
                    toAsk={this.state.toAsk}
                />
            </>
        )
    }

}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoAsk = props => {
    const { updatePersonInfoState, blAsk, toAsk } = props;

    return (
        <Dialog
            TransitionComponent={Transition}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            fullWidth={true}
            maxWidth="lg"
            onClose={() => updatePersonInfoState({ blAsk: false })}
            open={blAsk}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle
                id="alert-dialog-slide-title"
                style={{
                    textAlign: "center"
                }}
            >
                <Typography
                    style={{
                        fontSize: "1.3em",
                        borderBottom: "1px solid #f8f9fa",
                        textTransform: "uppercase",
                        color: "brown"
                    }}
                >
                    confirmation required
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-slide-description"
                    style={{
                        textAlign: "center"
                    }}
                >
                    {`You asked for [${toAsk}]. This feature is temporary disabled. Check again later`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => updatePersonInfoState({ blAsk: false })}
                    color="primary">
                        κλεισιμο
                </Button>
            </DialogActions>
        </Dialog>
    )
}