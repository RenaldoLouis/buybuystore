"use client"
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from "@/styles/loginform.module.css";
import commmonStyles from "../../styles/common.module.css"

// MUI IMPORT
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
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
        e.preventDefault();
        signIn("credentials", {
            email,
            password,
            redirect: false
        })
            .then((res: any) => {
                if (res.error) {
                    setError(JSON.parse(res.error).message);
                }
                else {
                    setOpen(true);
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
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleEmailChange} />
            <TextField className={commmonStyles.marginTop30} id="outlined-basic" label="Password" variant="outlined" onChange={handlePasswordChange} />
            <Button className={commmonStyles.marginTop30} type="submit" variant="contained">Login</Button>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
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