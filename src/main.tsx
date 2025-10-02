import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Slide1 from './slides/Slide1'
import Slide2 from './slides/Slide2'
import Slide3 from './slides/Slide3'
import Slide4 from './slides/Slide4'
import Slide5 from './slides/Slide5'
import Slide6 from './slides/Slide6'
import Slide7 from './slides/Slide7'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/slide1', element: <Slide1 /> },
  { path: '/slide2', element: <Slide2 /> },
  { path: '/slide3', element: <Slide3 /> },
  { path: '/slide4', element: <Slide4 /> },
  { path: '/slide5', element: <Slide5 /> },
  { path: '/slide6', element: <Slide6 /> },
  { path: '/slide7', element: <Slide7 /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div id="content-ready" />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
