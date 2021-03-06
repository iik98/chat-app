import React, { useState } from 'react';

// import komponen material-ui
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// import styles
import useStyles from './styles';

// react router dom
import { Link, Redirect } from 'react-router-dom';

import isEmail from 'validator/lib/isEmail';

// firebase hook
import { auth, firestore, FieldValue, useFirebase } from '../../components/FirebaseProvider';

// app components
import AppLoading from '../../components/AppLoading';

// import logo
import logo from '../../images/logo.png';

function Registrasi() {
    const classes = useStyles();

    const [form, setForm] = useState({
        email: '',
        password: '',
        ulangi_password: '',
        nama: ''
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        ulangi_password: '',
        nama: ''
    })
    const [isSubmitting, setSubmitting] = useState(false);

    const { user, loading } = useFirebase();

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {

        const newError = { ...error };

        if (!form.email) {
            newError.email = 'Email wajib diisi';
        } else if (!isEmail(form.email)) {
            newError.email = 'Email tidak valid';
        }

        if (!form.password) {
            newError.password = 'Password wajib diisi';
        }

        if (!form.ulangi_password) {
            newError.ulangi_password = 'Ulangi Password wajib diisi';
        } else if (form.ulangi_password !== form.password) {
            newError.ulangi_password = 'Ulangi Password tidak sama dengan Password';
        }

        if (!form.nama) {
            newError.nama = "Nama wajib diisi";
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);

        } else {
            try {
                setSubmitting(true);
                // 1. buat user auth baru
                const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password);

                // 2. simpan data nama dan email user di doc profiles/{userId} firestore
                await firestore.doc(`profiles/${user.uid}`).set({

                    nama: form.nama,
                    createdAt: FieldValue.serverTimestamp()
                }, { merge: true })

            } catch (e) {

                const newError = {};

                switch (e.code) {

                    case 'auth/email-already-in-use':
                        newError.email = 'Email sudah terdaftar';
                        break;
                    case 'auth/invalid-email':
                        newError.email = 'Email tidak valid';
                        break;
                    case 'auth/weak-password':
                        newError.password = 'Password lemah';
                        break;
                    case 'auth/operation-not-allowed':
                        newError.email = "Metode email dan password tidak didukung"
                        break;
                    default:
                        newError.email = 'Terjadi kesalahan silahkan coba lagi';
                        break;
                }

                setError(newError);
                setSubmitting(false);

            }

        }
    }

    if (loading) {

        return <AppLoading />
    }
    if (user) {

        return <Redirect to="/" />
    }


    return <div className={classes.daftarBlock}>
        <div className={classes.daftarBox}>
            <div className={classes.logoBox}>
                <img src={logo} alt="logo" />
            </div>
            <Container maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography
                        variant="h5"
                        component="h1"
                        className={classes.title}>Buat Akun Baru</Typography>

                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            id="nama"
                            name="nama"
                            margin="normal"
                            label="Nama"
                            fullWidth
                            required
                            value={form.nama}
                            onChange={handleChange}
                            helperText={error.nama}
                            error={error.nama ? true : false}
                            disabled={isSubmitting}
                            variant="outlined"
                        />
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            margin="normal"
                            label="Alamat Email"
                            fullWidth
                            required
                            value={form.email}
                            onChange={handleChange}
                            helperText={error.email}
                            error={error.email ? true : false}
                            disabled={isSubmitting}
                            variant="outlined"
                        />
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            margin="normal"
                            label="Password"
                            autoComplete="new-password"
                            fullWidth
                            required
                            value={form.password}
                            onChange={handleChange}
                            helperText={error.password}
                            error={error.password ? true : false}
                            disabled={isSubmitting}
                            variant="outlined"
                        />
                        <TextField
                            id="ulangi_password"
                            type="password"
                            name="ulangi_password"
                            margin="normal"
                            label="Ulangi Password"
                            fullWidth
                            required
                            value={form.ulangi_password}
                            onChange={handleChange}
                            helperText={error.ulangi_password}
                            error={error.ulangi_password ? true : false}
                            disabled={isSubmitting}
                            variant="outlined"
                        />

                        <Grid container className={classes.buttons}>
                            <Grid item xs>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit" color="primary" variant="contained"
                                    size="large"
                                >Daftar</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    disabled={isSubmitting}
                                    component={Link}
                                    variant="contained"
                                    size="large"
                                    to="/login"
                                >Login</Button>
                            </Grid>
                        </Grid>


                    </form>

                </Paper>
            </Container>
        </div>
    </div>
}

export default Registrasi;