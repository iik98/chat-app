import React, { useEffect, useState, useRef, useMemo } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import InputAdornment from '@material-ui/core/InputAdornment';
import { useAppBar, types } from '../index';
import { useData } from '../../../components/DataProvider';
import { useParams, useHistory } from 'react-router-dom';
import { useFirebase, FieldValue, firestore } from '../../../components/FirebaseProvider';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useStyles from './styles/room';

import groupBy from 'lodash/groupBy';
import { animateScroll as scroll } from 'react-scroll';
import { unixToIsoDate, unixToTime, isoToRelative } from '../../../utils/datetime';
import MessageIn from './message-in';
export default function ChatRoom() {
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const { dispatch } = useAppBar();
    const { chats, profile } = useData();
    const { user } = useFirebase();
    const activeChatRef = firestore.doc(`chats/${params.chatId}`);
    const chatMessagesRef = activeChatRef.collection('messages');
    const [activeChat, setActiveChat] = useState({});
    const [activeContact, setActiveContact] = useState({})
    const [messages, loading, error] = useCollectionData(chatMessagesRef.orderBy("created_at", "asc"), { idField: 'id' });
    // create new ref
    const textRef = useRef(null);

    const [isSending, setSending] = useState(false);

    useEffect(() => {
        scroll.scrollToBottom({
            containerId: "chatWindow",
            offset: 0,
            isDynamic: true,
            duration: 10
        });
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
    }, [dispatch, activeChat, history, classes, activeContact]);

    useEffect(() => {


        const findChat = chats.find(chat => chat.id === params.chatId);

        if (findChat) {
            setActiveChat(findChat);

            let activeContact = {};

            if (findChat.user_profiles) {
                const findContactId = Object.keys(findChat.user_profiles).find(uid => uid !== user.uid);
                activeContact = findContactId && findChat.user_profiles[findContactId];
                setActiveContact(activeContact);
            }
        }
    }, [chats, setActiveChat, setActiveContact, params.chatId, user.uid])


    const sendChat = async (e) => {

        e.preventDefault();
        if (isSending) {
            return null
        }
        if (textRef.current.value) {
            setSending(true)
            await activeChatRef.set({
                updated_at: FieldValue.serverTimestamp(),

                last_message: {
                    from_user_id: user.uid,
                    text: textRef.current.value,
                    created_at: FieldValue.serverTimestamp(),
                },
                unread_count: {
                    [user.uid]: 0,
                    [activeContact.id]: FieldValue.increment(1)
                },
                user_profiles: {
                    [user.uid]: profile,
                    [activeContact.id]: activeContact
                }
            }, { merge: true });

            await chatMessagesRef.add({
                from_user_id: user.uid,
                to_user_id: activeContact.id,
                text: textRef.current.value,
                created_at: FieldValue.serverTimestamp(),
                is_read: false,
                is_pushed: false,
            });
            setSending(false)

            textRef.current.value = ''
            //textRef.current.focus()
        }
    }



    const messagesGroupByDate = useMemo(() => {
        if (messages) {
            return groupBy(messages, (message) => {

                return unixToIsoDate(message.created_at && message.created_at.toMillis());
            })
        }
        return {}
    }, [messages])

    console.log(messagesGroupByDate);
    return <>
        {/* <div className={classes.messagesBox}>
            {messages ? <ul>
                {messages.map(message => <li key={message.id}>{JSON.stringify(message)}</li>)}
            </ul> : <p>belum ada pesan</p>}
        </div> */}
        <div id="chatWindow" className={classes.chatWindow}>

            {Object.keys(messagesGroupByDate).map(dateStr => {

                return <React.Fragment key={dateStr}>
                    <div className={classes.chatDayWrap}>
                        <Typography className={classes.chatDay} variant="caption">{isoToRelative(dateStr)}</Typography>
                    </div>
                    {
                        messagesGroupByDate[dateStr].map(message => {
                            if (message.from_user_id !== user.uid) {
                                return <MessageIn key={message.id} message={message} />
                            }

                            return <div key={message.id} className={classes.myChatBubble}>
                                <div className={classes.myTextBody}>

                                    {message.text.split('\n').map((text, i) => {
                                        return <Typography key={i} className={classes.myText} variant="body1">{text}</Typography>

                                    })}
                                    <div className={classes.deliveryDetail}>
                                        {!message.is_read && <CheckIcon className={classes.sentIcon} />}
                                        {message.is_read && <DoneAllIcon className={classes.readIcon} />}
                                        <Typography className={classes.myTimeStamp} variant="caption">
                                            {unixToTime(message.created_at && message.created_at.toMillis())}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </React.Fragment>
            })
            }
        </div>
        <div className={classes.floatingBottom}>
            <form onSubmit={sendChat}>
                <Grid container direction="column" spacing={3}>
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    sendChat(e)
                                }
                            }}
                            inputProps={{
                                ref: textRef
                            }}
                            placeholder="Ketik pesan"
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    </>
}