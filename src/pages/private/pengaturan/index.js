import React, { useEffect } from 'react';

//material-ui
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

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
    })

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} className={classes.avatar}>
                <UploadAvatar />
            </Grid>
        </Grid>
    )
}

export default Pengaturan;