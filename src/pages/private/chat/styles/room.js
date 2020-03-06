import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    title: {
        flexGrow: 1,
    },
    foto: {
        marginRight: theme.spacing(2)
    },
    floatingBottom: {
        borderTop: "1px solid #ddd",
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: "100%",
        padding: theme.spacing(1)
    },

    messagesBox: {
        paddingBottom: theme.spacing(4)
    }
}))


export default useStyles;