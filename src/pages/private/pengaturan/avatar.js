import React, { useState, useCallback } from 'react';

import Avatar from "@material-ui/core/Avatar";

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import useStyles from './styles/avatar';
import IconButton from '@material-ui/core/IconButton';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useDropzone } from 'react-dropzone';
import { storage, useFirebase, firestore } from '../../../components/FirebaseProvider';
import { useData } from '../../../components/DataProvider';
import { useSnackbar } from 'notistack';


export default function UploadAvatar() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useFirebase();
    const { profile } = useData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accept] = useState(['image/png', 'image/jpeg']);

    const [maxSize] = useState('20971520');


    const onDropAccepted = useCallback(acceptedFiles => {
        setError('');
        const file = acceptedFiles[0];
        console.log(file)
        const reader = new FileReader();

        reader.onabort = () => {
            setError('Pembacaan file dibatalkan')
        }
        reader.onerror = () => {
            setError('Pembacaan file gagal')
        }
        reader.onload = (ev) => {

            try {
                // resize foto
                const img = new Image();

                img.src = ev.target.result;

                img.onload = async () => {
                    setLoading(true);
                    try {
                        const elem = document.createElement('canvas');
                        const width = 250;
                        const ratio = img.width / img.height;

                        elem.width = width;
                        const height = width / ratio;
                        elem.height = height;

                        const ctx = elem.getContext('2d');

                        ctx.drawImage(img, 0, 0, width, height);

                        const resizedDataURLWebP = ctx.canvas.toDataURL("image/webp", .75);

                        const fotoRef = storage.ref(`profiles/${user.uid}/images/avatar.webp`);
                        const fotoSnapshot = await fotoRef.putString(resizedDataURLWebP, 'data_url');

                        const fotoUrl = await fotoSnapshot.ref.getDownloadURL();

                        await firestore.doc(`profiles/${user.uid}`).set({
                            foto: fotoUrl
                        }, { merge: true });
                        enqueueSnackbar("Avatar berhasil diperbarui!", { variant: "success" })
                    } catch (e) {

                        setError(e.message)
                    }

                    setLoading(false);

                }


            } catch (err) {
                setError(err.message);
            }

        }

        reader.readAsDataURL(file);

    }, [enqueueSnackbar, user])

    const onDropRejected = useCallback(rejected => {
        if (!accept.includes(rejected[0].type)) {
            setError(`Tipe file tidak didukung : ${rejected[0].type} `)
        } else if (rejected[0].size >= maxSize) {
            setError(`Ukuran file terlalu besar > 20Mb`)
        }
    }, [accept, maxSize])

    const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, onDropRejected, accept, maxSize, disabled: loading })



    return <div {...getRootProps()} className={classes.avatarBlock}>
        <input {...getInputProps()} />

        <div className={classes.buttonWrapper}>
            <Avatar className={classes.avatarLarge} src={profile.foto} alt={profile.nama} />
            {loading && <CircularProgress size={90} className={classes.progress} />}
        </div>
        <IconButton color="primary" className={classes.toggleUpload}><CameraAltIcon /></IconButton>
        <Typography variant="caption" color="error">{error}</Typography>
    </div>
}