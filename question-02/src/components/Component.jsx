import React, { useState } from 'react';
import Products from './Products';

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
        {/* view all button */}
        <button className='view-all-btn' type='button' onClick={renderAllData}>
          View All
        </button>

        {/* collapse button visible when render data is greater or equal to 4 */}
        <button
          className='collapse-btn'
          type='button'
          style={{ display: renderData.length >= 4 ? 'block' : 'none' }}
          onClick={collapseData}
        >
          Collapse
        </button>
      </div>

      {/* data list */}
      <div className='Products'>
        <Products products={renderData} />
      </div>
    </div>
  );
};
