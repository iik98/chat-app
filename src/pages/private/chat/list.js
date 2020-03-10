import React, { useState, useEffect } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddChatDialog from './add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ChatIcon from '@material-ui/icons/Chat';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import useStyles from './styles/list';

import { useData } from '../../../components/DataProvider';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useHistory } from 'react-router-dom';
import { useAppBar, types } from '..';

export default function ChatList() {
    const classes = useStyles();
    const history = useHistory();
    const { chats } = useData();
    const { user } = useFirebase();
    const { dispatch } = useAppBar();
    const [chatDialog, setChatDialog] = useState({
        open: false
    })


    useEffect(() => {


        return () => {
            dispatch({
                type: types.CHANGE_TOOLBAR,
                toolbar: null
            })
        }
    }, [dispatch])

    const handleOpenChatRoom = chat => e => {
        history.push(`chat/${chat.id}`);
    }

    return <>
        <List>
            {chats.map((chat) => {
                const profileId = Object.keys(chat.user_profiles).find(uid => uid !== user.uid);
                const profile = profileId ? chat.user_profiles[profileId] : {};
                return <React.Fragment key={chat.id}>
                    <ListItem button onClick={handleOpenChatRoom(chat)}>
                        <ListItemAvatar>
                            <Avatar alt={profile.nama} src={profile.foto} className={classes.orange} />
                        </ListItemAvatar>
                        <ListItemText primary={profile.nama} secondary={chat.is_typing && chat.is_typing[profile.id] ? 'mengetik...' : (chat.last_message.text || 'Belum ada pesan, kirim sekarang!')} />
                        {chat.unread_count[user.uid] > 0 &&
                            <ListItemSecondaryAction>
                                <Badge color="primary" badgeContent={chat.unread_count[user.uid]}>
                                    <ChatBubbleOutlineIcon />
                                </Badge>
                            </ListItemSecondaryAction>}


                    </ListItem>
                    <Divider />
                </React.Fragment>
            })}


        </List>
        <Fab
            color="primary"
            className={classes.fab}
            onClick={() => {
                setChatDialog({ open: true })
            }}>
            <ChatIcon />
        </Fab>
        <AddChatDialog
            {...chatDialog}
            handleClose={() => {
                setChatDialog({ open: false })
            }}
        />
    </>
}