import React from 'react';

import Grid from "@mui/material/Grid";
import UsersList from "./UsersList";
import {Route, Routes} from "react-router-dom";
import UserEditForm from "./UserEditForm";
import {Hidden} from "@mui/material";

const UsersScreen = () => {

    return (
        <Grid container
              name="screen Container"
              spacing={2}
              sx={{
                  width: "100%",
                  height: "100vh",
              }}>
            <Hidden mdDown={true}>
                <Grid item lg={2} md={3} >
                </Grid>
            </Hidden>

            <Grid item lg={10} md={9} sm={12} sx={{
                overflowX:"scroll"
            }}>
                <UsersList></UsersList>
            </Grid>
            <Routes>
                <Route exact path="/:id/edit" element={<UserEditForm to={"/users"}/>}></Route>
            </Routes>
        </Grid>
    );
};

export default UsersScreen;