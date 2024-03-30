'use client'

import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DrawerList = (props: { handleClickSidebar: any; }) => {
    const { handleClickSidebar } = props

    const listItem = [{
        text: "Products",
        icon: <ListIcon />
    },
    {
        text: "Carts",
        icon: <ShoppingCartIcon />
    }
    ]

    return (
        <Box sx={{ width: 250 }} role="presentation" >
            <List>
                {listItem.map((item, index) => (
                    <ListItem key={item.text} disablePadding onClick={() => handleClickSidebar(item.text)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default DrawerList;