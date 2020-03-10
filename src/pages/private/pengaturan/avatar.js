import React from 'react';

import Avatar from "@material-ui/core/Avatar";

import useStyles from './styles/avatar';
import IconButton from '@material-ui/core/IconButton';

import CameraAltIcon from '@material-ui/icons/CameraAlt';



export default function UploadAvatar() {

    const classes = useStyles();

    return <div className={classes.avatarBlock}>
                <Avatar className={classes.avatarLarge} />
                <IconButton color="primary" className={classes.toggleUpload}><CameraAltIcon /></IconButton>
            </div>
}