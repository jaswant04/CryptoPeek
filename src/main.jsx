import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import News from './pages/News/News.jsx';
import Trending from './pages/Trending/Trending.jsx';
import GainerLoser from './pages/GainersLosers/GainerLoser.jsx';
import Coin from './components/Coin';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/trending',
        element: <Trending />,
      },
      {
        path: 'gainers-losers',
        element: <GainerLoser />
      },{
        path:'/:id',
        element:<Coin/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
