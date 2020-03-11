import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    iconList: {
        color: theme.palette.textColor.gray8,
    },
    editBtn: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.main,
        },
        '&:active': {
            color: theme.palette.primary.dark,
        }
    },
    block: {
        display: "block"
    }

}))


export default useStyles;