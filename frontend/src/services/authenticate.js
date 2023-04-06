import axios from 'axios'
const URL = "http://localhost:8000/api";
export const loginCheck = async(email,password,handler) =>{
  axios
  .post(URL+"/login",{
    email:email,
    password:password
    }).then((result) => {
        handler(result);
    })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}

export const registerCheck = async(name,email,password,handler) =>{
  axios
  .post(URL+"/register",{
    name:name,
    email:email,
    password:password
    }).then((result) => {
        handler(result);
    })
  .catch(function (error) {
    console.log("-----error-------",error);   
  })
}