import ajax from "../config/ajax";
import axios from "axios";



const getCountryInfo = (countryName) =>
{
  return axios.post(`/home_list?country=${countryName}`);

}




export default {
  getCountryInfo,

}