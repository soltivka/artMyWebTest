import React from 'react';

import Grid from "@mui/material/Grid";
import UsersList from "./UsersList";
import {Route, Routes} from "react-router-dom";
import UserEditForm from "./UserEditForm";

const UsersScreen = () => {

    return (
        <Grid container
              name="screen Container"
              spacing={2}
              sx={{
                  width: "100%",
                  height: "100vh",
              }}>
            <Grid item lg={2} md={3} sm={0}>
            </Grid>
            <Grid item lg={10} md={9} sm={12}>
                <UsersList></UsersList>
            </Grid>
            <Routes>
                <Route exact path="/:id/edit" element={<UserEditForm to={"/users"}/>}></Route>
            </Routes>
        </Grid>
    );
};

export default UsersScreen;