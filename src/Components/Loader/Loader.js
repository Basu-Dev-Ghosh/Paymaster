import React from 'react'
import './Loader.css'
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
    return (
        <div className='Loader-container'>
            <HashLoader
                color="#DE3767"
                size={80}
            />
        </div>
    )
}

export default Loader