import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }} pb={2}>
            <AppBar position="static">

                <Toolbar>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{
                        flexGrow: 1 ,
                        overflow:"hidden",
                        maxHeight:"64px"
                    }}>
                        <img
                            src="https://s.dou.ua/CACHE/images/img/static/companies/black-logo/95d2e0da03ba657985d13bebe50d4de1.png"
                            alt=""
                            style={{
                                height:"92px",
                                position:"relative",
                                top:"-14px",
                            }}
                        />
                    </Box>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}