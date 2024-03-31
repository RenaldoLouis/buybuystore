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
import { auth } from '@/apis';
import http from '@/services/http';
import LoadingButton from '@mui/lab/LoadingButton';


import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const token = http.getAuthToken();

        if (token) {
            router.push("/products");
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

        if (email.length < 8 || password.length < 8) {
            setError("Email or Password Length must be more than 8");
            return;
        }

        setIsLoading(true)
        setError("")
        e.preventDefault();
        let userData = {
            username: email,
            password: password
        }

        auth.login(userData)
            .then((res: any) => {
                if (res.error) {
                    setError(res.error);
                    setIsLoading(false)
                }
                else {
                    http.setAuthToken(res.data.token)
                    setOpenSnackbar(true);
                    clearInputs();
                    router.push("/products");
                    setIsLoading(false)
                }
            })
            .catch(e => console.error(e))

    }

    return (
        <form
            // onSubmit={handleSubmit}
            className={styles.container}>
            <TextField
                required
                id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />

            <FormControl className={commonStyles.marginTop30} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>

            <LoadingButton className={commonStyles.marginTop30}
                // type="submit"
                onClick={handleSubmit}
                variant="contained" loading={isLoading}>
                Login
            </LoadingButton>
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