import React, { useState, useContext, useReducer } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MoreIcon from '@material-ui/icons/MoreVert';
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

// create app bar context
const AppBarContext = React.createContext();

export function useAppBar() {

    return useContext(AppBarContext)
}

const initialState = {
    toolbar: null
}

export const types = {
    CHANGE_TOOLBAR: 'CHANGE_TOOLBAR'
}

function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case types.CHANGE_TOOLBAR:
            return { ...state, toolbar: action.toolbar }
        default:
            return state;
    }

}

export default function Private() {
    const classes = useStyles();

    const { auth } = useFirebase();

    const [state, dispatch] = useReducer(reducer, initialState);
    // menu
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);

    const handleClickMenu = event => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleSignOut = (e) => {

        if (window.confirm('Apakah anda yakin ingin keluar dari aplikasi?'))
            auth.signOut();

    }

    return (
        <AppBarContext.Provider value={{
            dispatch
        }}>
            <div className={classes.root}>

                <AppBar position="absolute">
                    <Toolbar className={classes.toolbar}>

                        {state.toolbar ?
                            state.toolbar
                            :
                            <>
                                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                    <Switch>
                                        <Route path="/pengaturan" children="Pengaturan" />
                                        <Route children="Chat App" />
                                    </Switch>
                                </Typography>
                                <IconButton aria-label="search" color="inherit">
                                    <SearchIcon />
                                </IconButton>

                            </>}
                        <IconButton
                            onClick={handleClickMenu}
                            color="inherit"
                            aria-label="display more actions"
                            edge="end"
                        >

                            <MoreIcon />

                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElMenu}
                            keepMounted
                            open={Boolean(anchorElMenu)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>

                            <MenuItem onClick={() => {
                                handleSignOut()
                                handleCloseMenu()
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
        </AppBarContext.Provider>
    );
}

