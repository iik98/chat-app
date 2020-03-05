import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';

//styles
import useStyles from './styles';

//react router 
import { Switch, Route } from 'react-router-dom';

// komponen halaman private
import Pengaturan from './pengaturan';
import Chat from './chat';

//firebase hook
import { useFirebase } from '../../components/FirebaseProvider';


export default function Private() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { auth } = useFirebase();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSignOut = (e) => {

        if (window.confirm('Apakah anda yakin ingin keluar dari aplikasi?'))
            auth.signOut();

    }

    return (
        <div className={classes.root}>

            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Switch>

                            <Route path="/pengaturan" children="Pengaturan" />
                            <Route children="Chat App" />

                        </Switch>
                    </Typography>
                    <IconButton
                        // onClick={handleSignOut}
                        color="inherit"
                        aria-label="display more actions"
                        edge="end"
                    >

                        <MoreIcon />

                    </IconButton>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Switch>
                        <Route path="/pengaturan" component={Pengaturan} />

                        <Route path="/chat" component={Chat} />
                    </Switch>

                </Container>

            </main>
        </div>
    );
}

