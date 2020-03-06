import { makeStyles } from '@material-ui/styles';
import bg from '../../images/bg.png';

const useStyles = makeStyles(theme => ({
    landingBox:{
        background: 'url(../../images/bg.png) no-repeat 100% 100%',
    },
    buttons:{
        marginTop: theme.spacing(6)
    },
}))


export default useStyles;