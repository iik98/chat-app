import React, { useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import useStyles from './styles/room';
import { firestore, FieldValue, useFirebase } from '../../../components/FirebaseProvider';
import { unixToTime } from '../../../utils/datetime';
import { useParams } from 'react-router-dom';

export default function MessageIn({ message }) {
    const classes = useStyles();
    const params = useParams();
    const { user } = useFirebase();
    useEffect(() => {

        if (!message.is_read) {
            const readChat = async () => {
                try {
                    await firestore.doc(`chats/${params.chatId}/messages/${message.id}`).set({ is_read: true }, { merge: true });
                    await firestore.doc(`chats/${params.chatId}`).set({
                        unread_count: {
                            [user.uid]: 0
                        }
                    }, { merge: true })
                } catch (e) {
                    console.log(e.message)
                }
            }
            readChat()
        }
    }, [message.id, message.is_read, params.chatId, user.uid])
    return <div className={classes.yourChatBubble}>
        <div className={classes.yourTextBody}>
            {message.text.split('\n').map((text, i) => <Typography key={i} className={classes.yourText} variant="body1" >{text}</Typography>)}
            <Typography className={classes.yourTimeStamp} variant="caption">{unixToTime(message.created_at && message.created_at.toMillis())}</Typography>
        </div>
    </div>




}