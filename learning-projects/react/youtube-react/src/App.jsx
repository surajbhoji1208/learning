import Body from './component/Body'
import Head from './component/Head'
import './index.css'
import { Provider} from 'react-redux'
import {store} from './utils/store' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Watchpage from './component/Watchpage'
import Maincontainer from './component/Maincontainer'

function App() {

  const routes = createBrowserRouter([
    { path: '/' ,element: <Body />,
      children: [
      {  path: '/watch', element: <Watchpage/> },
      { path: '/', element: <Maincontainer /> },

       ]
    },   

  ])

  return (
    <Provider store={store}>
    <div className="App">
      <Head />
      <RouterProvider router={routes} />

    </div>
    </Provider>
  )

}

export default App
