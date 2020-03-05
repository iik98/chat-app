import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import AddChatDialog from './add';

import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles/list';

export default function ChatList() {
    const classes = useStyles();
    const [chatDialog, setChatDialog] = useState({
        open: false
    })

    return <>
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