import { makeStyles } from '@material-ui/styles';
import bg from '../../images/bg.png';

const useStyles = makeStyles(theme => ({
    loginBlock:{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '100%',
        height: '100vh',
    },
    loginOverlay:{
        backgroundImage: 'radial-gradient(50% 42%, '+ theme.palette.primary.light +' 50%, ' + theme.palette.primary.main + ' 99%)',
        opacity: '.9',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    loginBox:{
        position: 'relative',
        height: '100%',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column nowrap',
    },
    logoBox:{
        width: 282,
        height: 69,
        margin: '30px auto 20px',
    },
    title: {
        //color: theme.palette.primary.main
        textAlign:'center',
        marginBottom:theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2)
    },
    buttons:{
        marginTop: theme.spacing(6)
    },
    forgotPassword:{
        marginTop: theme.spacing(3)
    }
}))


export default useStyles;