import Image from "next/image";
import styles from "../styles/home.module.css";
import { Suspense } from "react";
import withAuthCustom from "@/utils/withAuthCustom";

const Home = () => {
    return (
        <main
            className={styles.main}
        >
            <Suspense fallback={<div>Loading...</div>}>
                Home
            </Suspense>
        </main>
    )
}

export default withAuthCustom(Home);
