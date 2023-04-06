import React from 'react';

export default function MainContent({newsData}){
    return <>
        
        <div className='container'>
           
            <div className='row'>
                {newsData && newsData.map((item,index)=>(
                   
                    <div className='col-md-4 col-sm-12 my-3' key={index}>
                        <div className="card">
                            <img className="card-img-top" src={item.url}
                            width={150}
                            height={150}
                            
                            alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <div className='row'>
                                    <div className='col-9'>
                                    {item.published_date.substring(0,10)}
                                    </div>
                                    <div className='col-3'>
                                    {item.published_date.substring(11,16)}
                                    </div>
                                </div>
                                <p className="card-text">{item.abstract}</p>
                                <button href="#" className="btn btn-primary">Read News</button>
                            </div>
                        </div>
                    </div>
                        
                    
                ))}
               
              
            </div>
            
        </div>
        
    </>
}