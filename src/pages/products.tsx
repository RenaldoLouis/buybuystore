"use client"

import "@/app/globals.css";
import Image from "next/image";
import { Suspense } from "react";
import styles from "@/styles/products.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import Navbar from "@/components/molecules/Navbar";
import LayoutHome from "../components/atom/layout";

const Products = () => {
    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    asd
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const ProductsWithAuth = withAuthCustom(Products);
export default ProductsWithAuth; 
