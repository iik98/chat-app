import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { useFirebase } from '../../components/FirebaseProvider';

export default function Landing() {

    const { user } = useFirebase();

    if (user) {
        return <Redirect to="/chat" />
    }

    return <Container maxWidth="xs">
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Typography variant="h3">Chat App</Typography>
            </Grid>

            <Grid item xs={6}>
                <Button variant="outlined" color="primary" component={Link} to="/login">
                    Login
                </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" component={Link} to="/registrasi">
                    Daftar
                </Button>
            </Grid>

        </Grid>

    </Container>
}