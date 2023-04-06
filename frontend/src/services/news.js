import axios from 'axios'
const URL = "http://localhost:8000/api";
export const categories = async(handler) =>{
  axios
  .post(URL+"/categories").then((result) => {
        handler(result);
    })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}

export const filter = async(filter,handler) =>{
  axios
  .post(URL+"/filter",{
      filter:filter
  }).then((result) => {
        handler(result);
    })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}

export const search = async(search,handler) =>{
  axios
  .post(URL+"/search",{
    search:search
  }).then((result) => {
    handler(result);
  })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}


export const allnews = async(handler) =>{
  axios
  .post(URL+"/allnews").then((result) => {
    handler(result);
  })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}