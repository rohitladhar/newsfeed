import React,{useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import {FiLogOut} from 'react-icons/fi';
import { search } from '../../services/news';
const store = require('store-js');
export default function Header({setNewsData}){
    const [ searchArray,setSearchArray] = useState('');
    const logout = () =>{
        store.set('token','')
        window.location.reload();
    }

    const handleSearch = () =>{
        setNewsData([])
       
        let arr = searchArray.split(" ")
        search(arr,data=>{
            setNewsData(data.data.news)
        })
    }

    
    return <>
     
        <div>
            <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">

                <div className="container-fluid">

                    <span className="navbar-brand">
                        NewsFeed
                    </span>
                
                    <form className="d-none d-md-flex input-group w-auto my-auto">
                        <input type="search" className="form-control rounded"
                        placeholder='Search' style={{"minWidth": "225px"}}  onChange={e=>setSearchArray(e.target.value)} value={searchArray}/>
                        <span className="input-group-text border-0" onClick={()=>handleSearch()}><BsSearch fontSize={20}/></span>
                    </form>

                   
                    <button className="navbar-nav ms-auto d-flex flex-row btn btn-danger btn-sm" style={{"cursor":"pointer", "outline":"none"}} onClick={()=> logout()
                        
                    }>
                        <FiLogOut fontSize={20}/> 
                    </button>
                   
                </div>

            </nav>

        </div>

    </>
}
