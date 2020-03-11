import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    avatarBlock: {
        width: 90,
        height: 90,
        position: 'relative',
        margin: '25px auto 0',
    },
    toggleUpload: {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        right: 0,
        bottom: 0,
        '& span ': {
            color: '#fff',
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:active': {
            backgroundColor: theme.palette.primary.dark,
        }
    },
    avatarLarge: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    progress: {
        position: 'absolute',
        top: -3,
        left: -3,
        zIndex: 1,
    },
    buttonWrapper: {
        position: 'realative'
    }
}))


export default useStyles;