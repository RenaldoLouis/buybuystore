"use client"

import "@/app/globals.css";
import Image from "next/image";
import { Suspense } from "react";
import styles from "@/styles/products.module.css";
import withAuthCustom from "@/utils/withAuthCustom";
import Navbar from "@/components/molecules/Navbar";
import LayoutHome from "@/components/atom/layout";

const Carts = () => {
    return (
        <LayoutHome>
            <main
                className={styles.homeContainer}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    Carts
                </Suspense>
            </main>
        </LayoutHome>
    )
}

const CartsWithAuth = withAuthCustom(Carts);
export default CartsWithAuth; 