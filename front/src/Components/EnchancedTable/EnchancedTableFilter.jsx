import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import uk from 'date-fns/locale/uk';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from 'react-datepicker';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

registerLocale('uk', uk)


function EnchancedFilter(props) {
    const {columns, filter, setFilters} = props;


    const handleColumnChange = function (event) {
        const inputValue = event.target.value
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters[index] = {...filter, column: columns.find((el) => el.label === inputValue)}
            return [...filters]
        })
    }

    const handleStartChange = function (date) {
        if (!date) {
            return
        }
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters[index] = {...filter, start: date}
            return [...filters]
        })
    }

    const handleFinishChange = function (date) {
        if (!date) {
            return
        }
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters[index] = {...filter, finish: date}
            return [...filters]
        })
    }
    const setStrictComparison = function (event) {
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters[index] = {...filter, strict: !filter.strict}
            return [...filters]
        })
    }

    const handleChangeValue = function (event) {
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters[index] = {...filter, value: event.target.value}
            return [...filters]
        })

    }

    const deleteFilter = function (event) {
        setFilters((filters) => {
            const index = filters.findIndex((thisFilter) => {
                return thisFilter.key === filter.key
            })
            filters.splice(index, 1)
            return [...filters]
        })

    }

    React.useEffect(() => {
        if (!filter.column) {
            return
        }
        if (filter.column.date) {
            setFilters((filters) => {
                const index = filters.findIndex((thisFilter) => {
                    return thisFilter.key === filter.key
                })
                const startDate = new Date()
                startDate.setHours(0, 0, 0)
                startDate.setMonth(startDate.getMonth() - 1)
                const finishDate = new Date()
                finishDate.setHours(23, 59, 59)
                filters[index] = {
                    ...filter,
                    start: new Date(startDate),
                    finish: new Date(finishDate)
                }
                return [...filters]
            })
        }
    }, [filter.column])


    const fields = function () {
        if (!filter.column) {
            return
        }
        if (filter.column.date) {
            return (
                <>
                    <Box display="flex" flexDirection="column">
                        <InputLabel
                            shrink={true}>З:</InputLabel>
                        <DatePicker
                            selected={filter.start ?? Date.now()}
                            locale="uk"
                            dateFormat="Pp"
                            timeFormat="p"
                            showTimeSelect
                            timeIntervals={30}
                            onSelect={handleStartChange}
                            onChange={handleStartChange}/>
                    </Box>

                    <Box display="flex" flexDirection="column" >
                        <InputLabel
                            shrink={true}>По:</InputLabel>
                        <DatePicker
                            selected={filter.finish ?? Date.now()}
                            locale="uk"
                            dateFormat="Pp"
                            timeFormat="p"
                            showTimeSelect
                            timeIntervals={30}
                            onSelect={handleFinishChange}
                            onChange={handleFinishChange}
                        />
                    </Box>

                </>

            )
        } else {
            return (
                <>

                    <TextField
                        id="standard-helperText"
                        label={filter.column.label}
                        value={filter.value ?? ''}
                        variant="standard"
                        onChange={handleChangeValue}
                    />
                    <FormControl sx={{
                        width: "fit-content",
                        minWidth: "150px",
                    }}>
                        <InputLabel
                            shrink={true}>Суворе порівняння</InputLabel>
                        <Switch checked={filter.strict ?? false}
                                sx={{position: "relative", top: "15px"}}
                                onChange={setStrictComparison}
                        />
                    </FormControl>
                </>
            )
        }
    }

    return (
        <Box display="flex"
             alignItems="center"
             sx={{
                 border: "solid",
                 borderWidth: "0 0 1px 0",
                 borderColor: "primary.main",
                 padding: "1%"
             }}
             justifyContent={"space-between"}>
            {/* select column */}
            <FormControl variant="standard" sx={{
                width: "fit-content",
                minWidth: "150px",
            }}>
                <InputLabel id="Обрати колонку для фільтрації">Фільтр</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="selectFilterColumn"
                    value={filter.column ? filter.column.label : ''}
                    onChange={handleColumnChange}
                >
                    {columns.map((column) => {
                        return (
                            <MenuItem key={`${filter.key}_${column.id}`} value={column.label}>{column.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {fields()}
            <IconButton
                onClick={deleteFilter}
                sx={{
                    position: "relative",
                    top: "10px"
                }}>
                <ClearIcon></ClearIcon>
            </IconButton>


        </Box>
    );
}


export default EnchancedFilter