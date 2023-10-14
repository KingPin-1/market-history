import { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import DataTable from './components/DataTable';
import PaginationNav from './components/PaginationNav';
import Loader from './components/Loader';
import './index.css';

export default function App() {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [darkMode, setDarkMode] = useLocalStorage(
        'theme',
        window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? true
            : false
    );
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    useEffect(() => {
        fetch(
            'https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data'
        )
            .then((response) => response.json())
            .then((result) => {
                setData(result.data);
            });
    }, []);
    return (
        <div className="App min-h-screen w-full p-8 flex flex-col justify-center items-center dark:bg-slate-950 dark:text-white text-sm lg:text-lg bg-gradient-to-tr from-blue-300 to-transparent dark:from-blue-950">
            {!data && <Loader />}
            {data && (
                <>
                    <button
                        className="fixed top-4 right-4 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg px-2 py-1 dark:bg-gray-800  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 mr-4 cursor-pointer"
                        onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                    <h1 className="text-3xl font-bold">${data[0].symbol}</h1>
                    <div className="table-block rounded-lg w-full max-w-[1200px] relative overflow-x-auto shadow-md my-6">
                        <DataTable data={data} page={page} />
                    </div>
                    <PaginationNav
                        page={page}
                        length={data.length}
                        setPage={setPage}
                    />
                </>
            )}
        </div>
    );
}
