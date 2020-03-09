import React from 'react';

import Avatar from "@material-ui/core/Avatar";

import useStyles from './styles/avatar';


export default function UploadAvatar() {

    const classes = useStyles();

    return <Avatar className={classes.avatarLarge} />
}