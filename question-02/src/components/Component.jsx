import React, { useState } from 'react';

const data = [
  { name: 'Product A', price: 300 },
  { name: 'Product B', price: 200 },
  { name: 'Product C', price: 700 },
  { name: 'Product D', price: 500 },
  { name: 'Product E', price: 650 },
  { name: 'Product F', price: 800 },
];

export const Component = () => {
  const initialRenderData = data.slice(0, 3);
  const [renderData, setRenderData] = useState(initialRenderData);
  const renderAllData = () => setRenderData(data);
  const collapseData = () => setRenderData(initialRenderData);
  return (
    <div className='component'>
      <div className='action-btns'>
      {/* <div className='view-all'> */}
        <button className='view-all-btn' type='button' onClick={renderAllData}>
          View All
        </button>
      {/* </div> */}

        <div className='collapse'>
          {renderData.length > 4 && (
            <button
              className='collapse-btn'
              type='button'
              onClick={collapseData}
            >
              Collapse
            </button>
          )}
        </div>
        
      </div>
      <ol className='product-list'>
        {renderData.map((el, index) => (
          <li key={index}>
            <strong className='product-name'>Name : </strong>
            {el.name}
            <strong className='product-price'>Price : </strong> {el.price}
          </li>
        ))}
      </ol>
    </div>
  );
};
