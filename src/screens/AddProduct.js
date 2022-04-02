import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/addproduct.scss'
import { Link } from 'react-router-dom';
import fetchData from '../hooks/fetchData';

function AddProduct() {

    const [dvdSelected, setDvdSelected] = useState(false);

    const [furnitureSelected, setFurnitureSelected] = useState(false);

    const [bookSelected, setBookSelected] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null)

    const [formData, setFormData] = useState(Object.freeze({
        sku : '' ,
        name : '',
        price : '',
        type : '',
        height : '',
        width : '',
        length : '',
        size : '',
        weight : ''
    }));

    const formRef = useRef(null);

    const navigate = useNavigate();

    const handleType = ( event ) => {
        setFormData({ 
            ...formData ,
            height : '',
            width : '',
            length : '',
            size : '',
            weight : '',
            [event.target.name] : event.target.value.trim()
        });
        switch (event.target.value) {
            case 'DVD':
                setFurnitureSelected(false);
                setBookSelected(false);
                setDvdSelected(true);
                break;
            case 'Furniture':
                setBookSelected(false);
                setDvdSelected(false);
                setFurnitureSelected(true);
                break;
            case 'Book':
                setFurnitureSelected(false);
                setDvdSelected(false);
                setBookSelected(true);
                break;
        
            default:
                setFurnitureSelected(false);
                setDvdSelected(false);
                setBookSelected(false);
                break;
        }
    }

    const handleInputChanges = ( e ) => {
        setFormData({ 
            ...formData ,
            [e.target.name] : e.target.value.trim()
        })
    }

    const save = () => {
        setErrorMessage(null);
        fetchData('POST' , formData).then( response => {
            console.log(response);
            if (response.success) {
                if (response.err) {
                    setErrorMessage(response.err)
                    return;
                }
            }
            navigate('/');
        });
    }


  
    const lBtn = () => (
        <button className="btn btn-primary" onClick={save}>Save</button>
    )
  
    const rBtn = () => (
        <Link to='/'>
            <button className="btn btn-danger">Cancel</button>
        </Link>
    )

  return (
    <section className='ap-container'>
        <Header title = 'Add Product' leftBtn = {lBtn} rightBtn = {rBtn} />
        <div className="ap-body">
            <form id="product_form" ref={ formRef }>
                {
                    errorMessage && <div className="alert alert-warning">{ errorMessage }</div>
                }
                <div className="input-wrapper">
                    <label htmlFor="sku">SKU :</label>
                    <input type="text" name='sku' id='sku' onChange={handleInputChanges} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="name">Name :</label>
                    <input type="text" name='name' id='name' onChange={handleInputChanges} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="price">Price :</label>
                    <input type="text" name='price' id='price' onChange={handleInputChanges} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="type">Type :</label>
                    <select name="type" id='productType' onChange={handleType} >
                        <option value="" hidden >Select product type</option>
                        <option value="DVD">DVD</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Book">Book</option>
                    </select>
                </div>
                { dvdSelected &&
                <>
                <div className="input-wrapper">
                    <label htmlFor="size">Size (MB) :</label>
                    <input type="text" name='size' id='size' onChange={handleInputChanges} />
                </div>
                <div className="helper-text">Please, provide size.</div>
                </>
                }
                { furnitureSelected &&
                <>
                <div className="input-wrapper">
                    <label htmlFor="height">Height (CM) :</label>
                    <input type="text" name='height' id='height' onChange={handleInputChanges} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="width">Width (CM) :</label>
                    <input type="text" name='width' id='width' onChange={handleInputChanges} />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="length">Length (CM) :</label>
                    <input type="text" name='length' id='length' onChange={handleInputChanges} />
                </div>
                <div className="helper-text">Please, provide dimensions in HxWxL.</div>
                </>
                }
                { bookSelected && 
                <>
                <div className="input-wrapper">
                    <label htmlFor="weight">Weight (Kg) :</label>
                    <input type="text" name='weight' id='weight' onChange={handleInputChanges} />
                </div>
                <div className="helper-text">Please, provide weight.</div>
                </>
                }
            </form>
            <div className='logo'>
                Scandiweb
            </div>
        </div>
        <Footer />
    </section>
  )
}

export default AddProduct