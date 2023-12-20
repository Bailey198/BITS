import React, { useEffect, useState } from 'react'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';

const GameList = () => {
  const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [numOfPage, setNumOfPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [searchString, setSearchString] = useState("");
    const [refresh, setRefresh] = useState(Date.now());

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
    <div className="grid grid-cols-3 gap-4 place-items-stretch h-56" >
        {productData.map((product, index) => (
          <ProductCard key={index} data={product}/>
        ))
        }
    </div>
  )
}

export default GameList;