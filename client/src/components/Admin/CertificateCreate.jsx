import React, { useState } from 'react'
import { useAuth } from '../Store/auth';
import {toast} from "react-toastify";
const CertificateCreate = (props) => {
    const {displayCertificate,apiUrl} = useAuth();
    const [data, setdata] = useState({
      name:"",
      certinumber:"",
      // printed:""
    });
    
    const handlesubmit = async (e) => {
      e.preventDefault();
      console.log(data);
      try {
        const response = await fetch(`${apiUrl}/api/admin/post_certificate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(response);
        if (response.ok) {
          toast.success("Certificate Created");
          setdata({
              name:"",
              certinumber:"",
              // printed:""
          });
          displayCertificate();
        }
      } catch (error) {
        console.log("Service", error);
      }
    };
    const handleinput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setdata({
        ...data,
        [name]: value,
      });
    };
  
    return (
      <div className="popup z-[2]">
        <div className="popup-inner w-[80%] lg:w-[40%]">
          <h2 className="text-center text-amber-600 text-xl pb-8">Create Notice</h2>
          <form onSubmit={handlesubmit}>
            
            <input
              type="text"
              onChange={handleinput}
              className="p-10 text"
              name="name"
              value={data.name}
              placeholder="Name"
              required
            />
            <input
              type="number"
              className="p-10 text"
              onChange={handleinput}
              value={data.certinumber}
              name="certinumber"
              placeholder="Certificate No."
              required
            />
            {/* <input
            
               
                type="boolean"
                name="printed"
                value={data.printed}
                onChange={handleinput}
                placeholder='is Printed?'
                className="block p-10 text w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
              ></input> */}
            <button type="submit">Send</button>
          </form>
          <button onClick={props.toggle}>Close</button>
        </div>
      </div>
    )
}

export default CertificateCreate