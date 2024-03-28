import Image from "next/image";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Login() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <LandingPage /> */}
      </Suspense>
    </main>
  );
}
