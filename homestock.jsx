import axios from 'axios';
import {useEffect, useState } from "react";

function Homestock()

{
  //Logic

  const [homestockid, setId] = useState('');
  const [homestockname, setName] = useState("");
  const [homestockaddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [homestocks, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);


  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8089/api/v1/homestock/getAll");
         setUsers(result.data);
         console.log(result.data);
  }
 
     async function save(event)
    {
        event.preventDefault();
        
         // Simple form validation
    if (!homestockname || !homestockaddress || !mobile) {
      alert("All fields are required!");
      return;
  }
    try
        {
         await axios.post("http://localhost:8089/api/v1/homestock/save",
        {
          homestockname: homestockname,
          homestockaddress: homestockaddress,
          mobile: mobile
        });
          alert("Customer Registation Successfully");
          setId("");
          setName("");
          setAddress("");
          setMobile("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

   async function editHomestock(homestocks)
   {
    setName(homestocks.homestockname);
    setAddress(homestocks.homestockaddress);
    setMobile(homestocks.mobile); 
    setId(homestocks._id);
   }

   async function DeleteHomestock(homestockid)
   {
        await axios.delete("http://localhost:8089/api/v1/homestock/delete/" + homestockid); 
        alert("Homestock deleted Successfully");
        Load();
   }

   async function update(event)
   {
    event.preventDefault();

   try
       {
        await axios.put("http://localhost:8089/api/v1/customer/edit/" + homestockid,
       {
        
        homestockname: homestockname,
        homestockaddress: homestockaddress,
         mobile: mobile
       
       });
         alert("Registation Updateddddd");
         setId("");
         setName("");
         setAddress("");
         setMobile("");
         Load();
       }
   catch(err)
       {
         alert("User Updated Failed");
       }
  }

  //Design

  return (
    <div>
       <h1>Customer Details</h1>
       <div class="container mt-4" >
          <form>
              <div class="form-group"> 
                <label>Homestock Name</label>
                <input  type="text" class="form-control" id="homestockname"
                value={homestockname}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>

              <div class="form-group">
                <label>Homestock Address</label>
                <input  type="text" class="form-control" id="homestockaddress" 
                 value={homestockaddress}
                  onChange={(event) =>
                    {
                      setAddress(event.target.value);      
                    }}
                />
              </div>

              <div class="form-group">
                <label>Mobile</label>
                <input type="text" class="form-control" id="mobile" 
                  value={mobile}
                onChange={(event) =>
                  {
                    setMobile(event.target.value);      
                  }}
                />
              </div>
              <div>
              <button   class="btn btn-primary mt-4" type="button" onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  type="button" onClick={update}>Update</button>
              </div>   
            </form>
          </div>

          <br/>

<table class="table table-dark" align="center">
  <thead>
    <tr>
  
      <th scope="col">homestock Name</th>
      <th scope="col">homestock Address</th>
      <th scope="col">homestock Mobile</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {homestocks.map(function fn(homestock)
       {
            return(
            <tbody>
                <tr>
                
                <td>{homestock.homestockname}</td>
                <td>{homestock.homestockaddress}</td>
                <td>{homestock.mobile}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editHomestock(homestock)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteHomestock(homestock._id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
  
  export default Homestock;