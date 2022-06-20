import React, {useEffect, useState, useContext} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getUser, putUser} from "../../API/Users/users";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Box from "@mui/material/Box";
import isEmail from 'validator/lib/isEmail';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Switch from "@mui/material/Switch";
import {AlertContext} from "../Alert/Alert";

export default function UserEditForm() {
    const {setAlert} = useContext(AlertContext)
    const nav = useLocation()
    const navTo = useNavigate();
    const params = useParams()
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [invalidEmail, setInvalidEmail] = useState(false)

    const handleClose = (event) => {
        event.stopPropagation()
        setOpen(false);
        navTo('/users')
    };
    const handleGenderChange = (event, choosen) => {
        if (choosen === null) {
            return
        }
        setUser((prev) => {
            prev.gender = choosen
            return {...prev}
        })
    }

    const handlePutUserClicked = ()=>{
        putUser(user).then((data)=>{
            setAlert({
                type:"success",
                message:"Збережено успішно"
            })
            navTo('/users')
        }).catch((e)=>{
            setAlert(e)
        })
    }

    const changeName = (e) => {
        setUser((prev) => {
            prev.name = e.target.value
            return {...prev}
        })
    }

    const changeEmail = (e) => {
        const value = e.target.value
        setUser((prev) => {
            prev.email = value
            return {...prev}
        })
        setInvalidEmail(!isEmail(value))
    }

    const handleStatusChange = (e) => {
        if (user.status === "active") {
            setUser((prev) => {
                prev.status = "inactive"
                return {...prev}
            })
        } else {
            setUser((prev) => {
                prev.status = "active"
                return {...prev}
            })
        }
    }

    useEffect(() => {
        if (params.id) {
            setOpen(true)
        }
        getUser(params.id).then((data) => {
            if(data.message==="Resource not found"){
                navTo('/users')
                setAlert(data.message)
            }
            setUser(data)
        })

    }, [nav.pathname])



    const Form = () => {
        return (
            <Grid container
                  sx={{
                      width: "100%",
                      height: "100%",
                      alignItems:"center",
                      justifyContent:"center"
                  }}
                  onClick={(e) => e.stopPropagation()}
            >
                <Grid item
                      xl={3}
                      md={4}
                      sm={8}
                      xs={11}
                      p={4}
                      sx={{
                          backgroundColor:"white",
                          display:"flex",
                          flexDirection:"column"
                }}


                >
                    <Typography variant={"h6"} color={"primary"} pb={2}>Користувач № {user.id}</Typography>

                    <TextField
                        label="Ім'я"
                        variant="outlined"
                        value={user.name}
                        onChange={changeName}
                        sx={{input: {textAlign: "center"},
                            margin:"15px",
                        }}

                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        error={invalidEmail}
                        value={user.email}
                        onChange={changeEmail}
                        maxWidth={"400px"}
                        sx={{input: {textAlign: "center"},
                            margin:"15px",
                        }}
                    />
                    <Box sx={{
                        display:"flex",
                        justifyContent:"space-around"
                    }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={user.gender}
                            exclusive
                            onChange={handleGenderChange}
                            sx={{display:"flex", justifyContent:"center"}}
                        >
                            <ToggleButton value="female"><FemaleIcon/></ToggleButton>
                            <ToggleButton value="male"><MaleIcon/></ToggleButton>
                        </ToggleButtonGroup>
                        <Box display={"flex"}>
                            <Typography color={"black"}>Off</Typography>
                            <Switch
                                inputProps={{ 'aria-label': 'ant design' }}
                                checked={user.status === "active"}
                                onChange={handleStatusChange}
                            />
                            <Typography color={"black"}>On</Typography>
                        </Box>

                    </Box>
                    <Button
                        variant="contained"
                        onClick={handlePutUserClicked}
                        sx={{  margin:"15px",}}
                    >
                        Зберегти
                    </Button>

                </Grid>



            </Grid>
        )
    }

    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
                onClick={handleClose}
            >
                {!user ? <CircularProgress color="inherit"/> : ''}
                {user ? Form() : ''}
            </Backdrop>
        </div>
    );
}