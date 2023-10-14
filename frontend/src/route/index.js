import { Navigate } from 'react-router-dom'
import Page from "../pages"

export default [
  {
    path:'/Home',
    element:<Page.Home key="Home"/>
  },
  //默认
  {
    path:'/',
    element:<Navigate to="/Home"/>
  },
  {
    path:'/CountryInfo',
    element:<Page.CountryInfo key="CountryInfo"/>
  },
]
