import React from 'react'

function ProductBox( { data } ) {
    
    const handleSelection = (event) => {
        if (event.target.getAttribute('type') !== 'checkbox') {
            event.currentTarget.classList.toggle('selected');
            const checkbox = event.currentTarget.querySelector('.delete-checkbox');
            checkbox.checked = !checkbox.checked;
        }
    }


  return (
    <div className="product-wrapper" onClick={ handleSelection }>
        <input type="checkbox" className='delete-checkbox' id={data.id}/>
        <p>{data.sku}</p>
        <p>{data.name}</p>
        <p>{data.price}$</p>
        <p>{data.type}: {data.value + ( data.type === 'Size' ? ' MB' : data.type === 'Weight' ? ' KG' : '' ) }</p>
    </div>
  )
}

export default ProductBox