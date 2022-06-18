export const descendingComparator = function (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = function (order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const stableSort = function (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const formatDate = function (ms) {
    const today = new Date(ms);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const result = dd + '.' + mm + '.' + yyyy;
    if(dd&&mm&&yyyy){return result}
    else {return '-'}
}


export const createId = function (length = 20) {
    let result = "";
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


export const applyFilters = function(array, filters){
    const filteredRows = filters.reduce((acc, filter) => {

        if (!filter.column) { return acc }
        if (!filter.column.date && !filter.value) { return acc }
        const id = filter.column.id
        if (filter.column.date) {
            if (!filter.start || !filter.finish) { return acc }
            return acc.filter((el) => {
                const start = filter.start.getTime()
                const finish = filter.finish.getTime()
                const elementDate = new Date(el[id])
                if (start <= elementDate.getTime() &&
                    elementDate.getTime() <= finish) {
                    return true
                } else return false
            })
        }
        if (!filter.column.date) {
            //по умолчанию сравнивает строки
            return acc.filter((el) => {
                const currValue = el[id]
                if(!currValue){return false}
                if (filter.strict && currValue === filter.value) { return true }
                if (filter.strict && currValue !== filter.value) { return false }
                if (!filter.strict && currValue.indexOf(filter.value) !== -1) { return true }
                return false
            })
        }

    }, [...array])
    return filteredRows
}