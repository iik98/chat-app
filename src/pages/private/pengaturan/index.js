import React, { useEffect, useState } from 'react';

//material-ui
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
import EditDialog from './edit';
// styles
import useStyles from './styles';

import { useAppBar, types } from '../index';
import { useHistory } from 'react-router-dom';
import { useData } from '../../../components/DataProvider';
import { useFirebase } from '../../../components/FirebaseProvider';

function Pengaturan(props) {
    const history = useHistory();
    const { dispatch } = useAppBar();
    const classes = useStyles();
    const { profile } = useData();
    const { user } = useFirebase();
    const [editDialog, setEditDialog] = useState({
        open: false,
        fieldMode: "Nama"
    })

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

    return (<>
        <Grid container spacing={3}>
            <Grid item xs={12} className={classes.avatar} >
                <UploadAvatar />
            </Grid>
            <Grid item xs={12} >
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
                                        component="span"
                                        variant="body2"
                                        className={classes.block}
                                        color="textPrimary"
                                    >
                                        {profile.nama}
                                    </Typography>
                                    {" Nama ini akan muncul di kontak pengguna lain"}
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    setEditDialog({
                                        open: true,
                                        fieldMode: "Nama"
                                    })
                                }}
                                className={classes.editBtn} edge="end" aria-label="edit">
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
                                        component="span"
                                        variant="body2"
                                        className={classes.block}
                                        color="textPrimary"
                                    >
                                        {profile.deskripsi || 'Belum ada deskripsi'}
                                    </Typography>
                                    {" Deskripsi ini akan muncul di kontak pengguna lain"}
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    setEditDialog({
                                        open: true,
                                        fieldMode: "Deskripsi"
                                    })
                                }}
                                className={classes.editBtn} edge="end" aria-label="edit">
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
                                        component="span"
                                        variant="body2"
                                        className={classes.block}
                                        color="textPrimary"
                                    >
                                        {user.email}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    setEditDialog({
                                        open: true,
                                        fieldMode: "Email"
                                    })
                                }}
                                className={classes.editBtn} edge="end" aria-label="edit">
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
                                        component="span"
                                        variant="body2"
                                        className={classes.block}
                                        color="textPrimary"
                                    >
                                        ********
                            </Typography>
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    setEditDialog({
                                        open: true,
                                        fieldMode: "Password"
                                    })
                                }}
                                className={classes.editBtn} edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Grid>
        </Grid>

        <EditDialog
            {...editDialog}
            handleClose={() => {
                setEditDialog(editDialog => ({ ...editDialog, open: false }))
            }}
        />
    </>
    )
}

export default Pengaturan;