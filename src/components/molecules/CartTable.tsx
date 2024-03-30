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

const CartTable = (props: { data: any, productsData: any }) => {
    const { data, productsData } = props

    const [rowsTable, setRowsTable] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    console.log("data", data)
    console.log("productsData", productsData)

    useEffect(() => {
        if (data) {
            setRowsTable(data)
        }
    }, [data])

    const handleOpenDetail = () => {
        console.log("handleOpenDetail", handleOpenDetail)
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const columnsTable: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: 'Date', width: 230 },
        { field: 'userId', headerName: 'userId', width: 250, },
        {
            field: 'action', headerName: 'Action', width: 330,
            renderCell: (params) => {
                const handleClickOpen = () => {
                    setOpenModal(true);
                };

                return (
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open dialog
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

            <PopupDialog handleClose={handleClose} open={openModal} data={productsData} />
        </div>
    )
}

export default CartTable;