
import React from "react";


import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import http from "@/services/http";
import DrawerList from "./DrawerList";

const Navbar = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleClickSidebar = (path: any) => {
        setOpen(false);
        setTimeout(() => {
            router.push(`/${path.toLowerCase()}`)
        }, 150);
    }

    const handleLogout = () => {
        http.clearAuthToken()
        router.push('/')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BuyBuyStore
                    </Typography>
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <DrawerList handleClickSidebar={handleClickSidebar} />
            </Drawer>
        </Box>
    )
}

export default Navbar;