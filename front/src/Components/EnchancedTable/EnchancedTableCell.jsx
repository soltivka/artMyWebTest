import * as React from 'react';

import TableCell from '@mui/material/TableCell';
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import CircularProgress from '@mui/material/CircularProgress';
import {registerLocale} from 'react-datepicker';

registerLocale('uk', uk)


function EnchancedTableCell(props) {
    const {value, callback} = props;
    const [enchancedValue, setEnchancedValue] = React.useState('')
    const [isLoading, setLoading] = React.useState(true)


    React.useEffect(() => {
        if (!callback) {

            return

        }
        callback(value).then((data) => {
            setEnchancedValue(data)
        })
        setLoading(false)
    }, [value])
    return (
        <TableCell align="center">{isLoading ? <CircularProgress/> : enchancedValue}</TableCell>
    )
}


export default EnchancedTableCell