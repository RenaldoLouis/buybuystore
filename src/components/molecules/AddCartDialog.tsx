import React, { useEffect, useRef, useState } from "react";
import commonStyles from "@/styles/common.module.css";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import NumberInputCounter from "./NumberInputCounter";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddCartDialog = (props: { handleClose: any; open: any; productsData: any; }) => {
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const { handleClose, open, productsData } = props
    const [startDate, setStartDate] = useState(new Date());

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        console.log("event.target.value ", event.target.value)
        setAge(event.target.value as string);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        // <React.Fragment>
        //     <Dialog
        //         open={open}
        //         onClose={handleClose}
        //         PaperProps={{
        //             component: 'form',
        //             onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //                 event.preventDefault();
        //                 console.log("event.currentTarget", event)
        //                 const formData = new FormData(event.currentTarget);
        //                 const formJson = Object.fromEntries((formData as any).entries());
        //                 // const email = formJson.email;
        //                 console.log("formJson", formJson);
        //                 // handleClose();
        //             },
        //         }}
        //     >
        //         <DialogTitle>Add New Cart</DialogTitle>
        //         <DialogContent>
        //             <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                 <DatePicker />
        //             </LocalizationProvider>
        //             <Box sx={{ minWidth: 120 }} className={commonStyles.marginY16}>
        //                 <FormControl fullWidth>
        //                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
        //                     <Select
        //                         labelId="demo-simple-select-label"
        //                         id="demo-simple-select"
        //                         value={age}
        //                         label="Age"
        //                         onChange={handleChange}
        //                     >
        //                         <MenuItem value={10}>Ten</MenuItem>
        //                         <MenuItem value={20}>Twenty</MenuItem>
        //                         <MenuItem value={30}>Thirty</MenuItem>
        //                     </Select>
        //                 </FormControl>
        //                 <NumberInputCounter />
        //             </Box>
        //             <Button variant="contained" startIcon={<AddIcon />}>
        //                 Add Product
        //             </Button>
        //         </DialogContent>
        //         <DialogActions>
        //             <Button onClick={handleClose}>Cancel</Button>
        //             <Button
        //                 type="submit"
        //             >Subscribe</Button>
        //         </DialogActions>
        //     </Dialog>
        // </React.Fragment>

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add New Cart
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                    </LocalizationProvider>
                    <Box sx={{ minWidth: 120 }} className={commonStyles.marginY16}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <NumberInputCounter />
                    </Box>
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Add Product
                    </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Add Cart
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

export default AddCartDialog;