import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import LiveSearch from '../common/LiveSearch';

const GameList = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchString, setSearchString] = useState("");
  const [refresh, setRefresh] = useState(Date.now());


  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

    pagination.push(
      <li key="prev">
        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => { setCurrentPage(prevPage) }}>
          &laquo;
        </button>
      </li>
    )

    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li key={i} >
          <button className={currentPage === i ? "bg-cyan-400 font-bold flex items-center justify-center px-3 h-8 leading-tight text-red-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        </li>
      )
    }

    pagination.push(
      <li key="next">
        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => { setCurrentPage(nextPage) }}>
          &raquo;
        </button>
      </li>
    )

    return pagination;
  }

  useEffect(() => {
    dispatch(actions.controlLoading(true))
    let query = `?itemsPerPage=${itemsPerPage}&page=${currentPage}&search=${searchString}`
    requestApi(`/products${query}`, 'GET', []).then(response => {
      console.log(response)
      setProductData(response.data.data)
      setNumOfPage(response.data.lastPage)
      setTotalProducts(response.data.total)
      dispatch(actions.controlLoading(false))
    }).catch(err => {
      console.log(err)
      dispatch(actions.controlLoading(false))
    })
  }, [currentPage, itemsPerPage, searchString, refresh])

  return (
    <div>
      <div className='ms-5 mb-5'>
        <LiveSearch onKeySearch={(keyword) => {
          setSearchString(keyword);
        }} />
        <button onClick={() => { setSearchString("") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">All</button>
        <button onClick={() => { setSearchString("MMO") }} value="MMO" className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">MMO</button>
        <button onClick={() => { setSearchString("RPG") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">RPG</button>
        <button onClick={() => { setSearchString("Open World") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Open World</button>
        <button onClick={() => { setSearchString("Turn Base") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Turn Base</button>
        <button onClick={() => { setSearchString("Horror") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Horror</button>
        <button onClick={() => { setSearchString("Casual") }} className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Casual</button>

      </div>
      <center>
        {numOfPage > 1 ? (<div className="mb-6 inline-flex -space-x-px text-sm">
          {renderPagination()}
        </div>) : null}
      </center>
      <div className="grid grid-cols-3 gap-4 place-items-stretch h-56" >
        {productData.map((product, index) => (
          <ProductCard key={index} data={product} />
        ))
        }
      </div>
    </div>
  )
}

export default GameList;