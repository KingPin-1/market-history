const PaginationNav = ({ page, length, setPage }) => {
    return (
        <nav class="flex flex-col gap-4 md:flex-row md:w-3/4 max-w-[1200px] items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">
                Showing{' '}
                <span class="font-semibold text-gray-900 dark:text-white">
                    {page}-{Math.min(page + 7, length)}
                </span>{' '}
                of{' '}
                <span class="font-semibold text-gray-900 dark:text-white">
                    {length}
                </span>
            </span>
            <ul class="inline-flex text-sm">
                <li>
                    <button
                        disabled={page - 7 < 1}
                        className="flex items-center justify-center px-3 h-8 ml-0 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-default"
                        onClick={() => setPage(page - 7)}>
                        Previous
                    </button>
                </li>
                <li>
                    <button
                        disabled={page + 7 > length}
                        className="flex items-center justify-center px-3 h-8 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-default"
                        onClick={() => setPage(page + 7)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default PaginationNav;
