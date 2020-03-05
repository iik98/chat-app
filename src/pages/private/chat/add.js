import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles/add';
import { useData } from '../../../components/DataProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddChatDialog({ open, handleClose }) {
    const classes = useStyles();

    const { profiles } = useData();
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {/* <Button autoFocus color="inherit" onClick={handleClose}>
                        save
            </Button> */}
                </Toolbar>
            </AppBar>
            <List>
                {profiles.map((profile) => {

                    return <React.Fragment key={profile.id}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt={profile.nama} src={profile.foto} className={classes.orange} />
                            </ListItemAvatar>
                            <ListItemText primary={profile.nama} secondary={profile.deskripsi || ''} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                })}


            </List>
        </Dialog>
    );
}
