import React, { createContext, useState } from 'react';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

export const AlertContext = createContext();

export const AlertContextProvider= ({ children }) => {
    const [alert, setAlert] = useState({
        show: false,
        severity: 'error',
        message: '',
    });
    const handleClose = () =>
        setAlert({
            show: false,
        });
    const handleAlert = function (opts) {
        if(typeof opts === "string"){
            setAlert({
                show: true,
                severity:"error",
                message: opts
            })
            return
        }
        const {message,severity, type, status} = opts
        setAlert({
            show: true,
            severity: (severity || type || status)??"error",
            message: message
        })
    }

    return (
        <AlertContext.Provider value={{ setAlert:handleAlert }}>
            {children}
            <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
                <Alert elevation={6} variant="filled" severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};