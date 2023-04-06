import React,{useState,useEffect} from 'react';
import Header from './dashboard/Header';
import MainContent from './dashboard/MainContent';
import Sidebar from './dashboard/Sidebar';
import {allnews} from '../services/news';
export default function Dashboard({initial,setInitial}){
    const [newsData,setNewsData]=useState([]);

    useEffect(()=>{
        if(initial===true){
            allnews(data=>{
                setInitial(false)
                setNewsData(data.data.news)
            })
        }
    },[])
 
    
    return <>
            <div>
                <Header setNewsData={setNewsData} />
            </div>
            <div className='row'>
                <div className='col-3'>
                    <Sidebar setNewsData={setNewsData}/>
                </div>
                <div className='col-9'>
                    <h2 className='mt-5'>News Feeds</h2>
                    <MainContent newsData={newsData}/>
                </div>
            </div>
    </>
}