
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomeView from './page/HomeView.jsx'
import AboutView from './page/AboutView.jsx'
import ContactView from './page/ContactView.jsx'
import TodoView from './page/TodoView.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<HomeView/>}/>
      <Route path='/about' element={<AboutView/>}/>
      <Route path='/contact' element={<ContactView/>}/>
      <Route path='/todo' element={<TodoView/>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);