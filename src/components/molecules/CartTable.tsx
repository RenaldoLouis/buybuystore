import React, { useEffect, useState } from "react";

import "@/app/globals.css";
import Image from "next/image";
import { Suspense } from "react";
import styles from "@/styles/cart.module.css";
import commonStyles from "@/styles/common.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import Navbar from "@/components/molecules/Navbar";
import LayoutHome from "@/components/atom/layout";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import PopupDialog from "@/components/molecules/PopupDialog";
import moment from "moment";

const CartTable = (props: { data: any, productsData: any }) => {
    const { data, productsData } = props

    const [rowsTable, setRowsTable] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [cardData, setCardData] = useState([]);
    // const [selectedTableData, setSelectedTableData] = useState(null);

    // console.log("data", data)

    useEffect(() => {
        if (data) {
            setRowsTable(data)
        }
    }, [data])

    const handleOpenDialogWithData = (selectedData: any) => {
        let newTempProductData: any[] | ((prevState: never[]) => never[]) = []
        selectedData.products.forEach((eachData: { productId: any; }) => {
            let tempData = productsData.filter((product: { id: any; }) => product.id === eachData.productId)
            newTempProductData.push(tempData[0]);
        })
        setCardData(newTempProductData)
    }

    useEffect(() => {
        if (cardData.length > 0) {
            setOpenModal(true);
        }
    }, [cardData])

    const handleClose = () => {
        setOpenModal(false);
        setCardData([]);
    };

    const columnsTable: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'date', headerName: 'Date', width: 230,
            valueGetter: (value, row) => moment(row.date).format("HH-MM-YYYY hh:mm"),

        },
        { field: 'userId', headerName: 'userId', width: 250, },
        {
            field: 'action', headerName: 'Action', width: 330,
            renderCell: (params) => {
                const handleClickOpen = () => {
                    handleOpenDialogWithData(params.row)
                };

                return (
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open Detail Product
                    </Button>
                );
            },
        },
    ];


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowsTable}
                columns={columnsTable}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />

            <PopupDialog handleClose={handleClose} open={openModal} data={cardData} />
        </div>
    )
}

export default CartTable;