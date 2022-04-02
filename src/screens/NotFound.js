import React from 'react';
import '../styles/notfound.scss';

function NotFound() {
  return (
    <div className='err404'>
        <h1 className='text-muted'>404 !</h1>
        <p>Page not found.</p>
    </div>
  )
}

export default NotFound