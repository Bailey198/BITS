import {React, useEffect, useState} from 'react'
import LiveSearch from './LiveSearch';

const DataTable = (props) => {
    const { name, data, columns, numOfPage, currentPage, onPageChange, onChangeItemsPerPage, onKeySearch, onSelectedRows } = props;
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        onSelectedRows(selectedRow)
    }, [selectedRow])

    const renderHeaders = () => {
        return columns.map((col, index) =>
            <th key={index}>{col.name}</th>
        )
    }

    const renderData = () => {
        return (
            data.map((item, index) => (
                <tr key={index}>
                    <td><input checked={selectedRow.includes(String(item.id)) ? true : false}
                    onChange={onClickCheckBox} id="checked-checkbox" type="checkbox" value={item.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
                    {
                        columns.map((col, ind) => <td key={ind}><center>{col.element(item)}</center></td>)
                    }
                </tr>
            ))
        )
    }

    const onClickCheckBox = (event) => {
        let checked = event.target.checked;
        let value = event.target.value;
        
        if(checked){
            if(!selectedRow.includes(value)){
                setSelectedRow([...selectedRow, value])
            }
        }else{
            let index = selectedRow.indexOf(value)
            const temp = [...selectedRow]
            temp.splice(index, 1)
            setSelectedRow(temp)
        }
        
    }

    const renderPagination = () => {
        const pagination = [];
        const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
        const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

        pagination.push(
            <li key="prev">
                <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => { onPageChange(prevPage) }}>
                    &laquo;
                </button>
            </li>
        )

        for (let i = 1; i <= numOfPage; i++) {
            pagination.push(
                <li key={i} >
                    <button className={currentPage === i ? "bg-cyan-400 font-bold flex items-center justify-center px-3 h-8 leading-tight text-red-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                </li>
            )
        }

        pagination.push(
            <li key="next">
                <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => { onPageChange(nextPage) }}>
                    &raquo;
                </button>
            </li>
        )

        return pagination;
    }

    const onChangeOption = (event) => {
        const target = event.target;
        onChangeItemsPerPage(target.value);
    }

    const onSelectAll = (event) => {
        if(event.target.checked){
            const temp = data.map(element => String(element.id))
            setSelectedRow(temp)
        }else{
            setSelectedRow([])
        }
    }

    return (
        <div>
            <strong className="text-gray-700 font-medium">{name}</strong>
            <div className='flex justify-between'>
                <select id="itemsPerPage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChangeOption}>
                    <option selected>Items Per Page</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>

                <LiveSearch onKeySearch={onKeySearch}/>
            </div>
            

            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <td><input checked={selectedRow.length === data.length && data.length > 0 ? true : false}
                            onChange={onSelectAll} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
                            {renderHeaders()}
                        </tr>
                    </thead>
                    <tbody>

                        {renderData()}

                    </tbody>
                </table>

                {/* Pagination */}

                {numOfPage > 1 ?
                    <center>
                        <nav>
                            <ul className="inline-flex -space-x-px text-sm">
                                {renderPagination()}
                            </ul>
                        </nav>
                    </center>
                    : null
                }

            </div>
        </div>
    )
}

export default DataTable;
