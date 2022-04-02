import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/products.scss'
import { Link } from 'react-router-dom';
import fetchData from '../hooks/fetchData';
import ProductBox from '../components/ProductBox';

function Products() {

    const [dataLoaded, setDataLoaded] = useState(false);

    const [productList, setProductList] = useState([]);

    const [error, setError] = useState(false);

    const [idList, setIdList] = useState([]);

  
  const massDelete = () => {
      setIdList([]);
      document.querySelectorAll('input[type=checkbox]:checked').forEach(checkbox => {
        idList.push(checkbox.getAttribute('id'));
      });
      if (idList.length) {
          fetchData('POST' , idList , 'delete' ).then(() => {
              setProductList(productList.filter( product => !idList.includes(product.id)))
          })
      }
  }

  const lBtn = () => (
      <Link to='/addproduct'>
          <button className="btn btn-primary">ADD</button>
      </Link>
  )

  const rBtn = () => (
        <button className="btn btn-danger" onClick={massDelete}>MASS DELETE</button>
  )

  useEffect(() => {
    fetchData().then(response => {
        if (response.success) {
            setProductList(response.data)
            setDataLoaded(true);
        }
        else {
            setError(true)
        }
    })
  }, []);

  return (
    <section className='p-container'>
        <Header title = 'Product List' leftBtn = {lBtn} rightBtn = {rBtn}  />
        <div className="p-body">
            {
                dataLoaded ? 
                productList.length ? productList.map( product => (
                    <ProductBox data = { product } key = { product.id }/>
                )) :
                <p className='p-message'>No data</p> : error ? 
                <div className="p-message">Oops, something went wrong.</div> :
                <div className="p-message">Loading...</div> 
            }
           
        </div>
        <Footer />
    </section>
  )
}

export default Products