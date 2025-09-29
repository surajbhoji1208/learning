import React from 'react'

const Buttons = ({ buttons }) => {
  return (
    <div className='flex space-x-2 overflow-x-auto p-2'>
      {buttons.map((button, idx) => <div key={idx} className="bg-gray-200 text-gray-800 rounded-full px-4 py-2 whitespace-nowrap hover:bg-gray-300">{button}</div>)}
    </div>
  )
}

export default Buttons