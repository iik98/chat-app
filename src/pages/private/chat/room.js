import React, { useEffect, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
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
                    history.push("/chat");
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
                <Grid container direction="column" spacing={3} alignItems="start">
                    <Grid item xs={12}>
                        <Typography className={classes.chatDay} variant="caption">Today</Typography>
                    </Grid>
                    <div className={classes.chatWindow}>
                        <div className={classes.yourChatBubble}>
                            <div className={classes.yourTextBody}>
                                <Typography className={classes.yourText} variant="body1" >bob</Typography>
                                <Typography className={classes.yourTimeStamp} variant="caption">11:12</Typography>
                            </div>
                        </div>
                        <div className={classes.myChatBubble}>
                            <div className={classes.myTextBody}>
                                <Typography className={classes.myText} variant="body1">Heyy</Typography>
                                <div className={classes.deliveryDetail}>
                                    <CheckIcon className={classes.sentIcon} />
                                    <DoneAllIcon className={classes.readIcon} />
                                    <Typography className={classes.myTimeStamp} variant="caption">
                                        12:00
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={classes.yourChatBubble}>
                            <div className={classes.yourTextBody}>
                                <Typography className={classes.yourText} variant="body1" >makan gak?</Typography>
                                <Typography className={classes.yourTimeStamp} variant="caption">12:01</Typography>
                            </div>
                        </div>
                        <div className={classes.myChatBubble}>
                            <div className={classes.myTextBody}>
                                <Typography className={classes.myText} variant="body1">entar</Typography>
                                <div className={classes.deliveryDetail}>
                                    <CheckIcon className={classes.sentIcon} />
                                    <DoneAllIcon className={classes.readIcon} />
                                    <Typography className={classes.myTimeStamp} variant="caption">
                                        12:02
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={classes.yourChatBubble}>
                            <div className={classes.yourTextBody}>
                                <Typography className={classes.yourText} variant="body1" >jam?</Typography>
                                <Typography className={classes.yourTimeStamp} variant="caption">12:04</Typography>
                            </div>
                        </div>
                    </div>
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