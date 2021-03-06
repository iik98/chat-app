import React, { useRef, useState } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useFirebase } from '../../../components/FirebaseProvider';

// styles
import useStyles from './styles/avatar';

import { useSnackbar } from 'notistack';

import isEmail from 'validator/lib/isEmail';

function Pengguna() {
    const classes = useStyles();
    const { user } = useFirebase();
    const [error, setError] = useState({
        displayName: '',
        email: '',
        password: ''
    })
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setSubmitting] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();



    const updateEmail = async (e) => {
        const email = emailRef.current.value;

        if (!email) {
            setError({
                email: 'Email wajib diisi'
            })
        }
        else if (!isEmail(email)) {
            setError({
                email: 'Email tidak valid'
            })
        }
        else if (email !== user.email) {
            setError({
                email: ''
            })
            setSubmitting(true)
            try {
                await user.updateEmail(email);

                enqueueSnackbar('Email berhasil diperbarui', { variant: 'success' });
            }
            catch (e) {
                let emailError = '';
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        emailError = 'Email sudah digunakan oleh pengguna lain';
                        break;
                    case 'auth/invalid-email':
                        emailError = 'Email tidak valid';
                        break;
                    case 'auth/requires-recent-login':
                        emailError = "Silahkan logout, kemudian login kembali untuk memperbarui email";
                        break;
                    default:
                        emailError = 'Terjadi kesalahan silahkan coba lagi';
                        break;
                }

                setError({
                    email: emailError
                })

            }

            setSubmitting(false)
        }

    }
    const sendEmailVerification = async (e) => {

        const actionCodeSettings = {
            url: `${window.location.origin}/login`
        };

        setSubmitting(true);
        await user.sendEmailVerification(actionCodeSettings);
        enqueueSnackbar(`Email verifikasi telah dikirim ke ${emailRef.current.value}`, { variant: 'success' });
        setSubmitting(false);
    }

    const updatePassword = async (e) => {

        const password = passwordRef.current.value;

        if (!password) {

            setError({
                password: 'Password wajib diisi'
            })
        } else {
            setSubmitting(true)
            try {

                await user.updatePassword(password);

                enqueueSnackbar('Password berhasil diperbarui', { variant: 'success' })
            }
            catch (e) {

                let errorPassword = '';

                switch (e.code) {

                    case 'auth/weak-password':
                        errorPassword = 'Password terlalu lemah';
                        break;
                    case 'auth/requires-recent-login':
                        errorPassword = 'Silahkan logout, kemudian login kembali untuk memperbarui password';
                        break;
                    default:
                        errorPassword = 'Terjasi kesalahan silahkan coba lagi';
                        break;

                }

                setError({
                    password: errorPassword
                })

            }
            setSubmitting(false);
        }

    }
    return <div className={classes.pengaturanPengguna}>


        <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            defaultValue={user.email}
            inputProps={{
                ref: emailRef,
                onBlur: updateEmail
            }}
            disabled={isSubmitting}
            helperText={error.email}
            error={error.email ? true : false}

        />

        {
            user.emailVerified ?
                <Typography color="primary" variant="subtitle1">Email sudah terverifikasi</Typography>
                :
                <Button
                    variant="outlined"
                    onClick={sendEmailVerification}
                    disabled={isSubmitting}
                >
                    Kirim email verifikasi
                </Button>

        }

        <TextField
            id="password"
            name="password"
            label="Password Baru"
            type="password"
            margin="normal"
            inputProps={{
                ref: passwordRef,
                onBlur: updatePassword
            }}
            autoComplete="new-password"
            disabled={isSubmitting}
            helperText={error.password}
            error={error.password ? true : false}

        />

    </div>
}

export default Pengguna;