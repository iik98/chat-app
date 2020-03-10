import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles/add';
import { useData } from '../../../components/DataProvider';

import { firestore, useFirebase, FieldValue } from '../../../components/FirebaseProvider';
import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddChatDialog({ open, handleClose }) {
    const classes = useStyles();
    const history = useHistory();

    const { contacts, chats, profile } = useData();
    const { user } = useFirebase();
    const [filter, setFilter] = useState('');

    const handleOpenChatRoom = contact => async () => {

        console.log(chats)
        const findChat = chats.find((chat) => {
            return chat.user_ids.includes(contact.id);
        })

        if (findChat) {
            return history.push(`/chat/${findChat.id}`)
        }

        const newChatData = {
            user_ids: [user.uid, contact.id],
            last_message: {
            },
            unread_count: {
                [user.uid]: 0,
                [contact.id]: 0
            },
            user_profiles: {
                [user.uid]: profile,
                [contact.id]: contact
            },
            created_at: FieldValue.serverTimestamp(),
            updated_at: FieldValue.serverTimestamp(),


        }

        const newChatRef = await firestore.collection('chats').add(newChatData);

        history.push(`/chat/${newChatRef.id}`);
    }


    const filteredContacts = contacts.filter(contact => {
        return contact.nama.toLowerCase().includes(filter.toLowerCase());
    })


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar color="primary">
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {/* <Button autoFocus color="inherit" onClick={handleClose}>
                        save
            </Button> */}
                </Toolbar>
            </AppBar>

            <List>
                {filteredContacts.map((contact) => {
                    if (contact.id === user.uid)
                        return null

                    return <React.Fragment key={contact.id}>
                        <ListItem button onClick={handleOpenChatRoom(contact)}>
                            <ListItemAvatar>
                                <Avatar alt={contact.nama} src={contact.foto} className={classes.orange} />
                            </ListItemAvatar>
                            <ListItemText primary={contact.nama} secondary={contact.deskripsi || ''} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                })}


            </List>
        </Dialog>
    );
}
