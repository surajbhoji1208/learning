import React from 'react'
import Buttonslist from './Buttonslist'
import Vediocontainer from './Vediocontainer'

const Maincontainer = () => {
  return (
    <div className="flex flex-col p-4 w-full">
    <Buttonslist />
    <Vediocontainer />
    </div>
  )
}

export default Maincontainer