import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
const maincolor = purple[500];

const theme = createMuiTheme({

    direction: 'ltr',

    palette: {
        primary: {
            main: maincolor,
            light: '#F71CDB',
            dark: '#5600FF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#DA005F',
            light: '#F173AA',
            dark: '#A20047',
            contrastText: '#000',
        },
        textColor: {

            gray: '#777',
            gray2: '#ddd',
            gray3: '#eee',
            gray4: '#f2f4f4',
            gray5: '#0000008a',
            gray6: '#aaaaaa',
            gray7: '#bbbbbb',
            gray8: '#7d7d7d',
            green: '#19b821',
            blue: '#2757ca',
            blue2: '#32bdea',
            green2: '#1CBA34',
        },
        success:{
            main: '#00ff00',
        },
        info:{
            main: '#30bcec',
        },
        warning:{
            main: '#fdb31b'
        },
        danger:{
            main: '#ff0000',
        }
    },

    typography: {
        useNextVariants: true,
    }

})

export default theme;