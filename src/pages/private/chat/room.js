import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import InputAdornment from '@material-ui/core/InputAdornment';
import { useAppBar, types } from '../index';
import { useData } from '../../../components/DataProvider';
import { useParams, useHistory } from 'react-router-dom';
import { useFirebase } from '../../../components/FirebaseProvider';
import useStyles from './styles/room';

export default function ChatRoom() {
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const { dispatch } = useAppBar();
    const { chats } = useData();
    const { user } = useFirebase();

    const [activeChat, setActiveChat] = useState({});

    useEffect(() => {
        console.log('once', activeChat)
        let activeContact = {};

        if (activeChat.user_profiles) {
            const findContactId = Object.keys(activeChat.user_profiles).find(uid => uid !== user.uid);
            activeContact = findContactId && activeChat.user_profiles[findContactId];
        }


        dispatch({
            type: types.CHANGE_TOOLBAR,
            toolbar: <>
                <IconButton edge="start" onClick={() => {
                    history.goBack();
                }} color="inherit" aria-label="back to home">
                    <BackIcon />
                </IconButton>
                <Avatar alt={activeContact.nama} src={activeContact.foto} className={classes.foto} />
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {activeContact.nama}
                </Typography>
            </>
        });

        return () => {
            dispatch({
                type: types.CHANGE_TOOLBAR,
                toolbar: null
            });
        }
    }, [dispatch, activeChat, user.uid, history, classes]);

    useEffect(() => {
        console.log('how many', params.chatId)

        const findChat = chats.find(chat => chat.id === params.chatId);

        if (findChat) {
            setActiveChat(findChat);
        }
    }, [chats, setActiveChat, params.chatId])

    return <>
        <div className={classes.floatingBottom}>
            <form>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="medium"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton type="submit" >
                                        <SendIcon color="primary" />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />

                    </Grid>


                </Grid>
            </form>
        </div>
    </>
}