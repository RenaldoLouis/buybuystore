"use client"

import "@/app/globals.css";
import { Suspense, useEffect, useState } from "react";
import styles from "@/styles/cart.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import LayoutHome from "@/components/atom/layout";
import CartTable from "@/components/molecules/CartTable";
import { cart, product } from "@/apis";
import Button from '@mui/material/Button';
import commonStyles from "@/styles/common.module.css";
import { TuiDateRangePicker } from "nextjs-tui-date-range-picker";


const Carts = () => {
    const [productsData, setProductsData] = useState([])
    const [cartsData, setCartsData] = useState([])

    const options = {
        language: 'en',
        format: 'MM-dd YYYY',
    };

    const getAllProducts = () => {
        product.getAllProducts().then((res: any) => {
            setProductsData(res.data)
        })
    }

    useEffect(() => {
        getAllProducts();
        cart.getAllCarts().then((res) => {
            setCartsData(res.data)
        })
    }, [])

    const handleChangeDate = () => {

    }

    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <div className={commonStyles.flex} >
                        <Button className={commonStyles.marginY16} variant="contained">
                            Add Cart
                        </Button>
                        <TuiDateRangePicker
                            handleChange={handleChangeDate}
                            options={options}
                            inputWidth={80}
                            containerWidth={200}
                            startpickerDate={new Date('2023-01-02')}
                            endpickerDate={new Date('2023-01-30')}
                        />
                    </div>
                    <CartTable data={cartsData} productsData={productsData} />
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const CartsWithAuth = withAuthCustom(Carts);
export default CartsWithAuth; 