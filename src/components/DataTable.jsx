import React from 'react';

const DataTable = ({ data, day }) => {
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB').toString().replaceAll('/', '-');
    };

    const processPrice = (data, ci, ri) => {
        if (ri === 3) {
            if (data[ci][ri] === data[ci][ri - 1]) return '';
            return data[ci][ri] < data[ci][ri - 1] ? 'red' : 'green';
        } else {
            if (ci === 0 || data[ci][ri] === data[ci - 1][ri + 1]) return '';
            return data[ci][ri] < data[ci - 1][ri + 1] ? 'red' : 'green';
        }
    };

    const filterData = data
        .map((x) => [convertDate(x.date), null, x.open, x.close])
        .reverse();
    const headers = ['Date', null, 'Open', 'Close'];
    const rows = new Array(4).fill(0);
    const cols = new Array(8).fill(0).map((x, i) => day + i - 1);
    return (
        <table className="border-collapse">
            {rows.map((rv, ri) => (
                <tr key={'r' + ri}>
                    {cols.map((cv, ci) => {
                        const needDay = cv - 1;
                        if (needDay >= filterData.length) {
                            return <></>;
                        } else if (cv >= day) {
                            if (ri === 2 || ri === 3) {
                                return (
                                    <td
                                        key={'c' + needDay}
                                        className={processPrice(
                                            filterData,
                                            needDay,
                                            ri
                                        )}>
                                        {filterData[needDay][ri]}
                                    </td>
                                );
                            }
                            return (
                                <td key={'c' + needDay}>
                                    {filterData[needDay][ri]}
                                </td>
                            );
                        } else {
                            return (
                                <td key={'c' + needDay}>
                                    {needDay < day
                                        ? headers[ri]
                                        : filterData[needDay][ri]}
                                </td>
                            );
                        }
                    })}
                </tr>
            ))}
        </table>
    );
};

export default DataTable;
