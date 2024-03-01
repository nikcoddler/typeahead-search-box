import React from 'react';
import "./listBox.css"

function ListBox(items) {
  
  return (
    <ul className='listBoxContainer'>
      {items?.map((item, index) => 
        <li className="listBoxItem" key={index}>{item.name}</li>
      )}
    </ul>
  )
}

export default ListBox