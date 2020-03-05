import React from 'react';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

    const { auth } = useFirebase();

    // menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = (e) => {

        if (window.confirm('Apakah anda yakin ingin keluar dari aplikasi?'))
            auth.signOut();

    }

    return (
        <div className={classes.root}>

            <AppBar position="absolute">
                <Toolbar className={classes.toolbar}>

                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Switch>

                            <Route path="/pengaturan" children="Pengaturan" />
                            <Route children="Chat App" />

                        </Switch>
                    </Typography>
                    <IconButton aria-label="search" color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleClick}
                        color="inherit"
                        aria-label="display more actions"
                        edge="end"
                    >

                        <MoreIcon />

                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>

                        <MenuItem onClick={() => {
                            handleSignOut()
                            handleClose()
                        }}>Logout</MenuItem>
                    </Menu>
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

