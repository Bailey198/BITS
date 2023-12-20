import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/api'
import DataTable from '../common/DataTable';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';

const Customers = () => {
    const dispatch = useDispatch();
    const [customerData, setCustomerData] = useState([]);
    const [numOfPage, setNumOfPage] = useState(1);
    const [totalCustomer, setTotalCustomer] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [searchString, setSearchString] = useState("");
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null);
    const [deleteType, setDeleteType] = useState('single');
    const [popUp, setPopUp] = useState(false);
    const [refresh, setRefresh] = useState(Date.now());

    const columns = [
        {
            name: 'ID',
            element: row => row.id
        },
        {
            name: 'First Name',
            element: row => row.firstName
        },
        {
            name: 'Last Name',
            element: row => row.lastName
        },
        {
            name: 'Email',
            element: row => row.email
        },
        {
            name: 'Created At',
            element: row => format(new Date(row.created_at), 'dd MMM yyyy') //{format(new Date(order.order_date), 'dd MMM yyyy')}
        },
        {
            name: 'Updated At',
            element: row => format(new Date(row.updated_at), 'dd MMM yyyy')
        },
        {
            name: 'Actions',
            element: row => (
                <div className='flex justify-between m-3'>
                    <Link to={`/Admin/update_user/${row.id}`}><i className='fa fa-pencil'> </i></Link>
                    <button type='button' onClick={() => handleDelete(row.id)}><i className='fa fa-trash'> </i></button>
                </div>
            )
        }
    ]

    const handleDelete = (id) => {
        setPopUp(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const handleMultiDelete = () => {
        setPopUp(true)
        setDeleteType('multi')
    }

    const requestDeleteApi = () => {
        if(deleteType === 'single'){
            dispatch(actions.controlLoading(true))
            requestApi(`/users/${deleteItem}`, 'DELETE', []).then(response => {
                setPopUp(false)
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err);
                setPopUp(false)
                dispatch(actions.controlLoading(false))
            })
        }else{
            dispatch(actions.controlLoading(true))
            requestApi(`/users/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
                setPopUp(false)
                setSelectedRows([])
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err);
                setPopUp(false)
                dispatch(actions.controlLoading(false))
            })
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?itemsPerPage=${itemsPerPage}&page=${currentPage}&search=${searchString}`
        requestApi(`/users${query}`, 'GET', []).then(response => {
            console.log(response)
            setCustomerData(response.data.data)
            setNumOfPage(response.data.lastPage)
            setTotalCustomer(response.data.total)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [currentPage, itemsPerPage, searchString, refresh])

    return (
        <div>
            <div className={popUp ? 'brightness-50' : null}>
                <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">

                    <div className='flex text-black justify-between'>
                        <h2 className='me-2 h3'>Total Customers: {totalCustomer}</h2>

                        <div className='flex flex-col'>
                            <div className='flex-1 my-2'>
                                <Link to='/Admin/add_user' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded'>+ Add New</Link>
                            </div>
                            <div className='flex-1'>
                                {selectedRows.length > 0 &&
                                    <button onClick={() => handleMultiDelete()} type='button'
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-blue-700 rounded'>
                                        <i className='fa fa-trash'> </i> Delete all
                                    </button>}
                            </div>
                        </div>

                    </div>

                    <DataTable
                        name='Customers Info'
                        data={customerData}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onKeySearch={(keyword) => {
                            setSearchString(keyword);
                        }}
                        onSelectedRows={(rows) => {
                            console.log(rows)
                            setSelectedRows(rows)
                        }} />
                </div>
            </div>
            {popUp ?
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto ">

                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button onClick={() => setPopUp(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button onClick={() => setPopUp(false)} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                        No, cancel
                                    </button>
                                    <button onClick={requestDeleteApi} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        Yes, I'm sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
        </div>
    )
}

export default Customers;
