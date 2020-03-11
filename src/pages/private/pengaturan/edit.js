import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import LinearProgress from '@material-ui/core/LinearProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useData } from '../../../components/DataProvider';
import { useFirebase, firestore, FieldValue } from '../../../components/FirebaseProvider';

import isEmail from 'validator/lib/isEmail';
import { useSnackbar } from 'notistack';


export default function EditDialog({ open, handleClose, fieldMode }) {
    const { profile } = useData();
    const { user } = useFirebase();

    const [form, setForm] = useState({
        email: user.email,
        nama: profile.nama,
        deskripsi: profile.deskripsi || '',
        password: ''

    })
    const [error, setError] = useState({

    })
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setSubmitting] = useState(false);

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


    const updateEmail = async (e) => {
        const { email } = form;

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
                handleClose()
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
        } else {
            handleClose()
        }


    }

    const updatePassword = async (e) => {

        const { password } = form;

        if (!password) {

            setError({
                password: 'Password wajib diisi'
            })
        } else {
            setSubmitting(true)
            try {

                await user.updatePassword(password);

                enqueueSnackbar('Password berhasil diperbarui', { variant: 'success' })
                handleClose()
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



    const updateProfile = async (e) => {
        const fieldName = fieldMode.toLowerCase();

        if (!form[fieldName]) {
            return setError({
                [fieldName]: `${fieldMode} wajib diisi`
            })
        }
        setSubmitting(true)
        try {

            await firestore.doc(`profiles/${user.uid}`).set({
                [fieldName]: form[fieldName],
                updated_at: FieldValue.serverTimestamp()
            }, { merge: true })
            enqueueSnackbar(`${fieldMode} berhasil diperbarui`, { variant: 'success' })
            handleClose();

        } catch (e) {

            setError({
                [fieldName]: e.message
            })

        }
        setSubmitting(false)

    }

    const handleSimpan = async () => {

        switch (fieldMode) {
            case 'Email':
                await updateEmail()
                break;
            case 'Password':
                await updatePassword()
                break;
            default:
                await updateProfile()
                break;
        }
    }
    return (

        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
            onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ubah {fieldMode}</DialogTitle>

            <DialogContent>
                {isSubmitting && <LinearProgress />}
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
          </DialogContentText> */}

                {fieldMode === 'Nama' &&
                    <TextField
                        value={form.nama}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="nama"
                        name="nama"
                        label="Nama"

                        fullWidth

                        disabled={isSubmitting}
                        helperText={error.nama}
                        error={error.nama ? true : false}
                    />}

                {fieldMode === 'Deskripsi' &&
                    <TextField
                        value={form.deskripsi}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="deskripsi"
                        name="deskripsi"
                        label="Deskripsi"

                        fullWidth

                        disabled={isSubmitting}
                        helperText={error.deskripsi}
                        error={error.deskripsi ? true : false}
                    />}
                {fieldMode === 'Email' &&
                    <TextField
                        value={form.email}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Alamat Email"
                        type="email"
                        fullWidth

                        disabled={isSubmitting}
                        helperText={error.email}
                        error={error.email ? true : false}
                    />}
                {fieldMode === 'Password' &&
                    <TextField
                        value={form.password}
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth

                        disabled={isSubmitting}
                        helperText={error.password}
                        error={error.password ? true : false}
                    />}
            </DialogContent>
            <DialogActions>
                <Button disabled={isSubmitting} onClick={handleClose} color="primary">
                    Batal
          </Button>
                <Button disabled={isSubmitting} onClick={handleSimpan} color="primary">
                    Simpan
          </Button>
            </DialogActions>
        </Dialog>
    );
}
