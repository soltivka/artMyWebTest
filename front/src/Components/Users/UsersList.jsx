import React, {useContext, useEffect, useState} from 'react';
import EnchancedTable from "../EnchancedTable/EnchancedTable";
import {Box} from "@mui/material";
import {getUsers} from "../../API/Users/users";
import {AlertContext} from "../Alert/Alert";

const columns = [
    {
        id: 'id',
        label: '№',
    },
    {
        id: "name",
        label: "Ім'я",
    },
    {
        id: "email",
        label: 'Пошта',
    },
    {
        id: "gender",
        label: 'Стать',
    },
    {
        id: "status",
        label: 'Статус',
    },
]

const UsersList = (props) => {
    const {setAlert} = useContext(AlertContext)
    const {needFetch,setNeedFetch} = props
    const [rows, setRows] = useState([])

    useEffect(() => {
        if(!needFetch){return}
        getUsers().then((data)=>{
            setRows(data)
            setNeedFetch(()=>false)
        }).catch((error)=>{
            setAlert(error)
        })
    },[needFetch])



    return (
        <Box sx={{
            width:"100%",

        }}>
            <EnchancedTable
                rows={rows}
                columns={columns}
                label={"Список користувачів"}
            >
            </EnchancedTable>
        </Box>
    );
};

export default UsersList;