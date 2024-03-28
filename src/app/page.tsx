import LoginForm from "@/components/molecules/LoginForm";
import styles from "./page.module.css";
import Image from 'next/image'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Login = () => {
  return (
    <main
      className={styles.main}
    >
      <div className={styles.leftSection}>
        <LoginForm />
      </div>
      <div className={styles.rightSection}>
        <Image
          className={styles.image}
          src="/image1.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
    </main>
  )
}

export default Login;