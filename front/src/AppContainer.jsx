import React from 'react';
import {Box} from "@mui/material";
import Header from "./Components/Header/Header";

const AppContainer = (props) => {

    return (
        <Box sx={{
            width:"100%",
            height:"100vh",
        }}>
            <Header></Header>
            {props.children}
        </Box>

    );
};

export default AppContainer;