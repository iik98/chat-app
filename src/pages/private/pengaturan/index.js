import React, { useEffect } from 'react';

//material-ui
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BackIcon from '@material-ui/icons/ArrowBack';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';



// page components
import UploadAvatar from './avatar';
// styles
import useStyles from './styles';

import { useAppBar, types } from '../index';
import { useHistory } from 'react-router-dom';

function Pengaturan(props) {
    const history = useHistory();
    const { dispatch } = useAppBar();
    const classes = useStyles();

    useEffect(() => {

        dispatch({
            type: types.CHANGE_TOOLBAR,
            toolbar: <>
                <IconButton edge="start" onClick={() => {

                    history.push("/chat");
                }} color="inherit" aria-label="back to home">
                    <BackIcon />
                </IconButton>

                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Pengaturan
                </Typography>
            </>
        }, [classes])
        return () => {
            dispatch({
                type: types.CHANGE_TOOLBAR,
                toolbar: null
            })
        }
    }, [classes, dispatch, history])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} className={classes.avatar} justify="center">
                <UploadAvatar />
            </Grid>
            <Grid item xs={12} justify="center">
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <PersonIcon className={classes.iconList} />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Nama"
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="p"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Muhammad Al Fatih
                            </Typography>
                            {" Nama ini akan muncul di kontak teman anda"}
                            </React.Fragment>
                        }
                        />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.editBtn} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <EmailIcon className={classes.iconList} />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Email"
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="p"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                muhammadalfatih@mail.com
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.editBtn} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <InfoIcon className={classes.iconList} />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Deskripsi"
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="p"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Available
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.editBtn} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <VpnKeyIcon className={classes.iconList} />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Password"
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="p"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                ********
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.editBtn} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

export default Pengaturan;