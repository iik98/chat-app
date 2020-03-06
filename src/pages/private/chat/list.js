import React, { useState } from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddChatDialog from './add';
import Divider from '@material-ui/core/Divider';

import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles/list';

import { useData } from '../../../components/DataProvider';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useHistory } from 'react-router-dom';

export default function ChatList() {
    const classes = useStyles();
    const history = useHistory();
    const { chats } = useData();
    const { user } = useFirebase();
    const [chatDialog, setChatDialog] = useState({
        open: false
    })

    const handleOpenChatRoom = chat => e => {
        history.push(`chats/${chat.id}`);
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
                        <ListItemText primary={profile.nama} secondary={chat.last_message.text} />
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