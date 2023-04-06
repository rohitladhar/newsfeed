import React,{useState,useEffect} from 'react';
import {categories,filter} from '../../services/news';
let checkboxSelected = [];
export default function Sidebar({setNewsData}){
    const[category,setCategory] = useState([]);
    const changeHandle = (id) =>{
        checkboxSelected.push(id)
        checkboxSelected = checkboxSelected.filter(function(item) {
            return checkboxSelected.lastIndexOf(item) === checkboxSelected.indexOf(item);
        });

    }
    const onHandleCategory = ()=>{
        filter(checkboxSelected,data=>{
            let newArr = [];
            for(let i=0;i<data.data.news.length;i++){
                for(let j=0;j<data.data.news[i].length;j++){
                    newArr.push(data.data.news[i][j])
                }
            }
            setNewsData(newArr)
        })
    }
    useEffect(()=>{
        categories(data=>{
            setCategory(data.data.categories)
        })
    },[])
   
    return <>
        <div className="mt-5 pt-1 ml-3 float-left">
            <h5>Category</h5>
            {category && category.map((item,index)=>{
                return (
                    <div key={index}>
                        <div className="form-group form-check float-left">
                            <input type="checkbox" className="form-check-input" onChange={()=>changeHandle(item)} id={item}/>
                            <label className="form-check-label" htmlFor="exampleCheck1">{item.toUpperCase()}</label>
                        </div>
                    </div>)
            })}

            <button className="btn btn-success btn-md ml-5" onClick={()=>onHandleCategory('register')}> Submit</button>
             

        </div>
    </>
}