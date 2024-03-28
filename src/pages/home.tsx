import Image from "next/image";
import styles from "../styles/home.module.css";
import { Suspense } from "react";

export default function Home() {
    return (
        <main
            className={styles.main}
        >
            <Suspense fallback={<div>Loading...</div>}>
                {/* <LandingPage /> */}Home
            </Suspense>
        </main>
    );
}
