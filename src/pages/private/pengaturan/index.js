import React from 'react';

//material-ui

import Grid from '@material-ui/core/Grid';

// page components
import UploadAvatar from './avatar';
// styles
import useStyles from './styles';

function Pengaturan(props) {

    const { location, history } = props;
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} className={classes.avatar}>
                <UploadAvatar />
            </Grid>
        </Grid>
    )
}

export default Pengaturan;