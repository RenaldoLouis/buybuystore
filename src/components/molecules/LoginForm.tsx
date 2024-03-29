"use client"
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from "@/styles/loginform.module.css";
import commonStyles from "@/styles/common.module.css"

// MUI IMPORT
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import auth from '@/apis';
import http from '@/services/http';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const token = http.getAuthToken();

        if (token) {
            router.push("/home");
        }
    }, [router])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePasswordChange = (e: any) => setPassword(e.target.value);
    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setError("");
    }
    const handleSubmit = async (e: any) => {
        setError("")
        e.preventDefault();
        let userData = {
            username: email,
            password: password
        }

        auth.login(userData)
            .then((res: any) => {
                console.log("res", res)
                if (res.error) {
                    setError(res.error);
                }
                else {
                    http.setAuthToken(res.data.token)
                    setOpenSnackbar(true);
                    clearInputs();
                    router.push("/home");
                }
            })
            .catch(e => console.error(e))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.container}>
            <TextField
                required
                id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
            <TextField
                required
                className={commonStyles.marginTop30} id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange} />
            <Button className={commonStyles.marginTop30} type="submit" variant="contained">Login</Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Login Success"
                action={action}
            />
            {error &&
                <p className={styles.errorMessage}>
                    {error}
                </p>
            }
        </form>
    )
}

export default LoginForm;