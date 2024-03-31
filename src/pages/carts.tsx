"use client"

import "@/app/globals.css";
import { SetStateAction, Suspense, useEffect, useState } from "react";
import styles from "@/styles/cart.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import LayoutHome from "@/components/atom/layout";
import CartTable from "@/components/molecules/CartTable";
import { cart, product } from "@/apis";
import Button from '@mui/material/Button';
import commonStyles from "@/styles/common.module.css";
import { TuiDateRangePicker } from "nextjs-tui-date-range-picker";
import moment from "moment";
import AddCartDialog from "@/components/molecules/AddCartDialog";
import dayjs, { Dayjs } from 'dayjs';

const Carts = () => {
    const [productsData, setProductsData] = useState([])
    const [cartsData, setCartsData] = useState([])
    const [startDate, setStartDate] = useState(new Date('2020-01-01'))
    const [endDate, setEndDate] = useState(new Date('2020-05-01'))
    const [openAddCartModal, setOpenAddCartModal] = useState(false);
    const [productDate, setProductDate] = useState<Dayjs | null>(dayjs('2022-04-17'));
    const [newProductList, setNewProductList] = useState([
        {
            productId: 5,
            quantity: 1
        }
    ])

    const options = {
        language: 'en',
        format: 'd-MM-YYYY',
    };

    const getAllProducts = () => {
        product.getAllProducts().then((res: any) => {
            setProductsData(res.data)
        })
    }

    useEffect(() => {
        getAllProducts();
        cart.getAllCarts().then((res: { data: SetStateAction<never[]>; }) => {
            console.log("cartsData", res.data)
            setCartsData(res.data)
        })
    }, [])

    const handleChangeDate = (date: any) => {
        setStartDate(date[0])
        setEndDate(date[1])

        const selectedStartDate = moment(date[0]).format("YYYY-MM-DD")
        const selectedEndDate = moment(date[1]).format("YYYY-MM-DD")

        cart.getCartByDateRange(selectedStartDate, selectedEndDate).then((res) => {
            setCartsData(res.data)
        })
    }



    const handleCloseAddCartModal = () => {
        setOpenAddCartModal(false);
        setNewProductList([
            {
                productId: 5,
                quantity: 1
            }
        ])
    };

    const handleClosAddCartModalAndAddNewCart = () => {
        let dataObject = {
            id: Math.floor(Math.random() * 100),
            userId: Math.floor(Math.random() * 100),
            date: moment(productDate).format("YYY-MM-DD"),
            products: newProductList
        }

        let tempCartsData = [...cartsData]
        tempCartsData.splice(0, 0, dataObject)
        setCartsData(tempCartsData)

        handleCloseAddCartModal();
    };

    const handleClickOpenAddCartModal = () => {
        setOpenAddCartModal(true);
    };

    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <div className={commonStyles.flex} >
                        <Button className={commonStyles.marginY16} variant="contained" onClick={handleClickOpenAddCartModal}>
                            Add Cart
                        </Button>
                        <div >
                            <TuiDateRangePicker
                                handleChange={(e) => handleChangeDate(e)}
                                options={options}
                                inputWidth={80}
                                containerWidth={200}
                                startpickerDate={startDate}
                                endpickerDate={endDate}
                            />
                        </div>
                    </div>
                    <CartTable data={cartsData} productsData={productsData} />
                    <AddCartDialog handleClosAddCartModalAndAddNewCart={handleClosAddCartModalAndAddNewCart} productDate={productDate} setProductDate={setProductDate} newProductList={newProductList} setNewProductList={setNewProductList} handleClose={handleCloseAddCartModal} open={openAddCartModal} productsData={productsData} />
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const CartsWithAuth = withAuthCustom(Carts);
export default CartsWithAuth; 