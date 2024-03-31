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
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddCartDialog = (props: { handleClose: any; open: any; productsData: any; setNewProductList: any; newProductList: any, setProductDate: any, productDate: any, handleClosAddCartModalAndAddNewCart: any }) => {
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const { handleClose, open, productsData, setNewProductList, newProductList, setProductDate, productDate, handleClosAddCartModalAndAddNewCart } = props
    const [product, seProduct] = useState('');

    const handleChangeSelect = (event: SelectChangeEvent, index: number) => {
        seProduct(event.target.value as string);
        let selectedProduct = productsData.filter((item: any) => (item.title === event.target.value))
        newProductList[index].productId = selectedProduct[0].id
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

    const handleAddNewProduct = () => {
        let currentNewProductList = [...newProductList]
        let newTempNewProduct = {
            productId: 5,
            quantity: 1
        }

        currentNewProductList.push(newTempNewProduct)
        setNewProductList(currentNewProductList)
    }

    const handleChangeDate = (newDate: any) => {
        setProductDate(newDate)
    }

    return (
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
                        <DatePicker value={productDate} onChange={(newValue) => handleChangeDate(newValue)} />
                    </LocalizationProvider>
                    <Box sx={{ minWidth: 120 }} className={commonStyles.marginY16}>
                        {newProductList.map((eachNewProduct: any, index: any) => {
                            let currentData = productsData.filter((item: any) => (item.id === eachNewProduct.id))
                            return (
                                <>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={currentData.title}
                                            label="Product"
                                            onChange={(e) => handleChangeSelect(e, index)}
                                        >
                                            {productsData.map((eachProduct: any) => (
                                                <MenuItem id={eachProduct.id} key={eachProduct.id} value={eachProduct.title}>{eachProduct.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <NumberInputCounter newProductList={newProductList} index={index} />
                                </>
                            )
                        })}
                    </Box>
                    <Button onClick={handleAddNewProduct} variant="contained" startIcon={<AddIcon />}>
                        Add Product
                    </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClosAddCartModalAndAddNewCart}>
                    Add Cart
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

export default AddCartDialog;