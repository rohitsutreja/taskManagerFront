import axios from "axios";


export const apiPublic = axios.create({
  baseURL: 'https://localhost:5000', 
  timeout: 5000,
});


export const axiosPrivate = axios.create({
  baseURL: 'https://localhost:5000', 
  headers: {'Content-Type' : 'application/json'},
  withCredentials: true,
})




export default axiosPrivate;
