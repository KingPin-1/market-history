import React from 'react';

const DataTable = ({ data, page }) => {
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB').toString().replaceAll('/', '-');
    };

    const processPrice = (data, ci, ri) => {
        if (ri === 2) {
            if (data[ci][ri] === data[ci][ri - 1]) return '';
            return data[ci][ri] < data[ci][ri - 1] ? 'red' : 'green';
        } else {
            if (ci === 0 || data[ci][ri] === data[ci - 1][ri + 1]) return '';
            return data[ci][ri] < data[ci - 1][ri + 1] ? 'red' : 'green';
        }
    };

    const filterData = data
        .map((x) => [convertDate(x.date), x.open, x.close])
        .reverse();
    const headers = ['Date', 'Open', 'Close'];
    const rows = new Array(3).fill(0);
    const cols = new Array(8).fill(0).map((x, i) => page + i - 1);
    return (
        <table className="w-full dark:text-white">
            {rows.map((rv, ri) => (
                <tr key={'r' + ri}>
                    {cols.map((cv, ci) => {
                        const needDay = cv - 1;
                        if (needDay >= filterData.length) {
                            return (
                                <td
                                    className="bg-white dark:bg-slate-800"
                                    key={'c' + needDay}></td>
                            );
                        } else if (cv >= page) {
                            if (ri === 1 || ri === 2) {
                                return (
                                    <td
                                        key={'c' + needDay}
                                        className={
                                            'bg-white dark:bg-slate-800 ' +
                                            processPrice(
                                                filterData,
                                                needDay,
                                                ri
                                            )
                                        }>
                                        {filterData[needDay][ri]}
                                    </td>
                                );
                            }
                            return (
                                <td
                                    className="bg-white dark:bg-slate-800"
                                    key={'c' + needDay}>
                                    {filterData[needDay][ri]}
                                </td>
                            );
                        } else {
                            return (
                                <th
                                    colSpan={2}
                                    className="uppercase bg-gray-100 dark:bg-gray-700"
                                    key={'header' + ri}>
                                    {headers[ri]}
                                </th>
                            );
                        }
                    })}
                </tr>
            ))}
        </table>
    );
};

export default DataTable;
