import React, { useState } from 'react'
import useFetchPromise from './useFetchPromise'
import listBox from '../listBox'

function SearchBox({id, name, label, placeholder, errorMessage, autoComplete, maxItems, noItemMessage, styles, transformData, promise, debounceWait }) {

    const [query, setQuery] = useState("")
    const [activeIndex, setActiveIndex] = useState(null)
    const [data, setData, error] = useFetchPromise(query, transformData, promise, debounceWait, autoComplete)

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyUp = (event) => {
      const keyCode = event.keyCode
      if(keyCode === 13 ) {
        // user enter
        if(activeIndex == null) return
      }else if(keyCode === 40){
        //move down

      }else if(keyCode === 38 ) {

        // move up
      }
    }

  return (
   <>
    <label className={styles.label} for={name}>{label}</label>
    <br />
    <input name={name} id={id} className={styles.input} value={query} onChange={handleChange} onKeyUp={handleKeyUp}/>
    {data && data.length>0 && listBox(data)}
   </>
  )
}

export default SearchBox