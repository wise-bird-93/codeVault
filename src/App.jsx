import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ErrorPage from "./ErrorPage.jsx" 
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Pastes from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <NavBar />
        <Home />
      </div>,
      errorElement: <ErrorPage />,
    },
    {
      path:'/pastes',
      element:
      <div>
        <NavBar />
        <Pastes />
        
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    }
  ],
  {
    basename: "/codeVault", 
  }
)

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
