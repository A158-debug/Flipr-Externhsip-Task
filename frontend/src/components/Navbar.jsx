import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const classes = {
    appBar: {
        // borderRadius: 15,
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        width:'100%'
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}


const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/auth');
        setUser(null);
    };
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar position="fixed" color="inherit" style={classes.appBar}>
            <Typography  component={Link} to="/" variant="h2" align="center" style={{cursor:"pointer",  textDecoration:'none'}}>Connectify</Typography>
            <Toolbar style={classes.toolbar}>
                {user?.result ? (
                    <div style={classes.profile}>
                        <Avatar style={classes.purple} alt={user?.result.name} src={user?.result?.picture}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography style={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar