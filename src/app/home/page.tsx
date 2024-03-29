"use client"

import Image from "next/image";
import { Suspense } from "react";
import styles from "@/styles/home.module.css";
import commonStyles from "@/styles/common.module.css"
import withAuthCustom from "@/utils/withAuthCustom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {
    return (
        <main
            className={styles.main}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <Box sx={{ flexGrow: 1 }}>
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
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Suspense>
        </main>
    )
}

export default withAuthCustom(Home);
