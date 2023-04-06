import React,{useState} from 'react';
import {registerCheck} from '../services/authenticate';
const store = require('store-js');
export default function Register({setClicked}){
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [nameError,setNameError] = useState('');
    const [password,setPassword] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    let centerClass = 'd-flex flex-row';
    const onSubmit = (e) =>{
        e.preventDefault();
        
        let flag = false;
      if(password.length===0){
          flag = false;
          setPasswordError("Password is Required")
      }

      if(name.length===0){
        flag = false;
        setNameError("Name is Required")
      }

      if(email.length!==0 && password.length!==0 && name.length!==0){
          flag = true;
      }
      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(regEmail)){
          flag = true;
          setEmailError(" ");
      }else{
          flag = false;
          if(email.length===0){
              setEmailError("Email is Required");
          }else{
              setEmailError("Email Format is invalid");
          }

      }

      if(password.length>0){
          setPasswordError(" ");
          const re1 = /.{8,30}/;
          const re2 = /(?=.*?[A-Z])/;
          const re3 = /(?=.*?[a-z])/;
          const re4 = /(?=.*?[0-9])/;
          const re5 = /(?=.*?[#?!@$%^&*-])/;
          const message = [];
          
          if (re2.test(password) === false) {
              message.push('Alteast One Uppar Character Required');
              flag = false;
          }
          if (re3.test(password) === false) {
              message.push('Alteast One Lower Character Required');
              flag = false;
          }

          if (re4.test(password) === false) {
              message.push('Alteast One Digit Required');
              flag = false;
          }
          if (re5.test(password) === false) {
              message.push('Alteast One Special Required');
              flag = false;
          }
          if (re1.test(password) === false) {
              message.push('Password must between 8 and 30 Characters');
              flag = false;
          }
          
          const listitems = message.map((data) => <li>{data}</li>);
          setPasswordError(<ul>{listitems}</ul>);
          centerClass = '';
          if(listitems.length===0){
              flag = true;
          }  
      }

      if(flag===true){
        
        registerCheck(name,email,password,(data) => {
            
            if(data.data.success===true){
                store.set('token',data.data.token)
                window.location.href = window.location.host + '/home'
            }  
        });
        
      }
        
    }



    return <>
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{"borderRadius": '15px'}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form type="submit" onSubmit={onSubmit}>

                                <div className="row mb-3">
                                      <div className="col-md-2">

                                          <div className="form-outline">
                                              <label className="form-label" htmlFor="firstName">Name</label>
                                          </div>

                                      </div>

                                      <div className='col-md-10'>
                                          <input type="text" id="name" name="name" className="form-control form-control-lg" 
                                          onChange={e=>setName(e.target.value)}
                                          
                                          value={name} />

                                          <div className='d-flex flex-row text-danger'>
                                              {nameError}
                                          </div>
                                      </div>
                                      
                                  </div>


                                  <div className="row mb-3">
                                      <div className="col-md-2">

                                          <div className="form-outline">
                                              <label className="form-label" htmlFor="firstName">Email</label>
                                          </div>

                                      </div>

                                      <div className='col-md-10'>
                                          <input type="text" id="email" name="email" className="form-control form-control-lg" 
                                          onChange={e=>setEmail(e.target.value)}
                                          
                                          value={email} />

                                          <div className='d-flex flex-row text-danger'>
                                              {emailError}
                                          </div>
                                      </div>
                                      
                                  </div>

                                  <div className='row'>
                                      <div className="col-md-2 mb-4">

                                          <div className="form-outline">
                                              <label className="form-label" htmlFor="password">Password</label>
                                          </div>

                                      </div>
                                      <div className='col-md-10 mb-4'>
                                          <input type="password" id="password" value={password} name="password" className="form-control form-control-lg"
                                          onChange={e=>setPassword(e.target.value)}
                                          />
                                          <div className={`text-danger ${centerClass}`}>
                                              {passwordError}
                                          </div>
                                      </div>
                                  </div>

                                    
                                  <div className="mt-4 pt-2">
                                      <input className="btn btn-success btn-lg" type="submit" value="Submit" />
                                      <button className="btn btn-primary btn-lg ml-5" onClick={()=>setClicked('login')}> Login</button>
                                  </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>  
    </>
}