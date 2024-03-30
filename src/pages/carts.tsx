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

const Carts = () => {
    const [productsData, setProductsData] = useState([])

    const getAllProducts = () => {
        product.getAllProducts().then((res: any) => {
            setProductsData(res.data)
        })
    }
    const [cartsData, setCartsData] = useState([])

    useEffect(() => {
        getAllProducts();
        cart.getAllCarts().then((res) => {
            setCartsData(res.data)
        })
    }, [])


    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>

                    <Button className={commonStyles.marginY16} variant="contained">
                        Add Cart
                    </Button>
                    <CartTable data={cartsData} productsData={productsData} />
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const CartsWithAuth = withAuthCustom(Carts);
export default CartsWithAuth; 