import { useEffect, useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import DataTable from './components/DataTable';
import './index.css';

export default function App() {
    const [data, setData] = useState(null);
    const [day, setDay] = useState(1);
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
        fetch('data.json')
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setData(result.data);
            });
    }, []);
    return (
        <div className="App min-h-screen text-center p-8 flex flex-col justify-center items-center bg- bg-emerald-100 dark:bg-slate-900 dark:text-white text-sm md:text-lg">
            {!data && <h1>LOADING...</h1>}
            {data && (
                <>
                    <button
                        className="fixed top-4 right-4 w-[5rem] text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 mr-4 cursor-pointer"
                        onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                    <h1 className="text-3xl font-bold">${data[0].symbol}</h1>
                    <div className="table-block">
                        <DataTable data={data} day={day} />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 mr-4 cursor-pointer"
                            disabled={day - 7 < 1}
                            onClick={() => setDay(day - 7)}>
                            Previous
                        </button>
                        <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 cursor-pointer"
                            disabled={day + 7 > data.length}
                            onClick={() => setDay(day + 7)}>
                            Next
                        </button>
                    </div>
                    <h1>{day}</h1>
                </>
            )}
        </div>
    );
}
