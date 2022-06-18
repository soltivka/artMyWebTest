import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import EnchancedFilter from "./EnchancedTableFilter";
import {createId} from "./EnchancedTableFunction";



const EnchancedTableToolbar = (props) => {
    const { filters, setFilters, columns, rows} = props
    const addFilter = function () {
        setFilters((filters) => {
            return ([...filters, { key: "filter_" + createId(5) }])
        })
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                alignItems: "flex-start"
            }}
        ><Grid container  name="table toolbar container" >
            <Grid item xs={12}>
                <Box sx={{ flex: '1 1 90%',
                    textAlign: "left"
                }}>
                    <Typography
                        display="inline-block"
                        variant="h6"
                        id="tableTitle"
                        component="div"
                        maxWidth="fit-content"
                    >
                        {props.label}
                    </Typography>
                    <Tooltip title="Додати фільтр">
                            <span>
                                <IconButton onClick={addFilter} >
                                    <FilterAltIcon></FilterAltIcon>
                                </IconButton>
                            </span>
                    </Tooltip>
                </Box>
            </Grid>
            <Grid item name="filters" xs={12}>
                {filters.map((filter) => {
                    return (
                        <EnchancedFilter
                            key={filter.key}
                            filter={filter}
                            setFilters={setFilters}
                            columns={columns}>
                        </EnchancedFilter>
                    )
                })}

            </Grid>

        </Grid>
            <Tooltip title="Зберегти таблицю">
                <span>
                    <IconButton disabled>
                        <FileDownloadIcon></FileDownloadIcon>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Друкувати">
                <span>
                    <IconButton disabled>
                        <PrintIcon></PrintIcon>
                    </IconButton>
                </span>
            </Tooltip>
        </Toolbar >
    );
};

export default EnchancedTableToolbar