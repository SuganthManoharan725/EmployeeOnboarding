
import React, { useState } from 'react';
import './HomePage.css';
import { useLocation } from 'react-router-dom';




const HomePage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userRole = queryParams.get('role');


const [showFields, setShowFields] = useState(false)
const [items, setItems] = useState([]);
const [selectedItemId, setSelectedItemId] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);


const [formData, setFormData] = useState({
    name: '',
    age: '',
    radiovalue: '',
    email:'',
    date: '',
    salary: '',
    number:''
  });


  const generateUniqueId = () => {
    const timestamp = new Date().getTime().toString(16);
    const randomPart = Math.random().toString(16).substring(2);
    return `${timestamp}${randomPart}`;
  };

  
 

  const handleUpdate = (item) => {
    setFormData({
      name: item.name,
      age: item.age,
      radiovalue: item.radiovalue,
      email:item.email,
      date:item.date,
      salary:item.salary,
      number:item.number,
      
    });
    setSelectedItemId(item.id);
    setShowFields(true) 
  };

  const handleUpdateSubmit = () => {
    const updatedItems = items.map((item) =>
      item.id === selectedItemId
        ? {
            ...item,
            name: formData.name,
            age: formData.age,
            radiovalue: formData.radiovalue,email:formData.email,
            date:formData.date, 
            salary:formData.salary, 
            number:formData.number
          }
        : item
    )

    setItems(updatedItems);
    setFormData({
      name: '',
      age: '',
      radiovalue: '',
      email:'',
      date: '',
      salary: '',
      number:'',
    });
    setSelectedItemId(null);
    setShowFields(false); 
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const HandleOk = (e) => {
    e.preventDefault(); 
    const newId = generateUniqueId();
    setItems([...items,{id:newId, name:formData.name, age:formData.age , radiovalue:formData.radiovalue, email:formData.email, date:formData.date, salary:formData.salary, number:formData.number}])
   setShowFields(false); 
   setFormData('');
    
  }
  const HandleCancel = () => {
    setShowFields(false); 
    setFormData('');
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  

  return (
    <div className="crud-container" >
      <h2 style={{ fontWeight: 'bold' , justifyContent: 'center', display:'flex'}}>EMPLOYEE ONBOARDING</h2>

      
      {showFields && (
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
           <div className="content-wrapper">
        <div className="form-group">
          <label className='label-form'>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>

          <div className="form-group">
            <label className='label-form'>Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
          </div>

          <div className="form-group">
            <div className="radio-group">
              <label className='label-form'>Gender</label>
              <div className='.ratio-center'>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.radiovalue === 'male'}
                  onChange={(e) => setFormData({ ...formData, radiovalue: e.target.value })} />
                <label>Male</label>
              </div>

              <div className='.ratio-center'>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.radiovalue === 'female'}
                  onChange={(e) => setFormData({ ...formData, radiovalue: e.target.value })} />
                <label>Female</label>
              </div>
            </div>
          </div>
          
          <div div className="form-group">
            <label className="label-form">Join Date:</label>
            <input
              type="date"
              required
              id="dateInput"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>
          
          <div div className="form-group">
            <label className="label-form">Email:</label>
            <input
              type='mail'
              id="EmailInput"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          
          <div div className="form-group">
            <label className="label-form">Annual CTC:</label>
            <input
              type='text'
              id="SalaryInput"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
          </div>
          
          <div div className="form-group">
            <label className="label-form">Phone Number:</label>
            <input
              type='number'
              id="NumberInput"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
          </div>
          
          <div>
            
            {selectedItemId ? (
                
      <div className="button-group">
        <button onClick={()=>{handleUpdateSubmit(); setDrawerOpen(false); setDrawerOpen(!drawerOpen); } }>Update</button>
        <button  onClick={() => {HandleCancel();setSelectedItemId(null); setDrawerOpen(false)}}>Cancel</button>
      </div>
    ) : null}
         
{showFields && !selectedItemId && (
         <div style={{ borderRadius: '8px', cursor: 'pointer', marginRight: '51px', marginLeft: '13px' }}>
        <button  onClick={(e)=>{HandleOk (e); setDrawerOpen(false); setDrawerOpen(!drawerOpen);}}>Done</button>
        <button  onClick={() => {HandleCancel(); setSelectedItemId(null); setDrawerOpen(false)}}>Cancel</button>
        </div>
      )} 
      
          </div>
          </div>
         </div>
      )} 
 
      <div className="table-container">
        <h4 className='heading'>Employee List</h4>
        <div className="button-container">  
        {!showFields &&(
        <button className="CreateButton" onClick={() => { setDrawerOpen(!drawerOpen); setShowFields(true) }}>Add</button>
      )}
        

      </div> 
        <table className="table table-striped table-hover">
  <thead className="table-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Date</th>
      <th scope="col">Email</th>
      <th scope="col">Annual CTC</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {items.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>{item.radiovalue}</td>
      <td>{item.date}</td>
      <td>{item.email}</td>
      <td>{item.salary}</td>
      <td>{item.number}</td>
      <td>
      <div className='item-button' style={{ display: 'flex' }}>
                    {userRole === 'manager' && (
                <>
                    <button onClick={() => { handleUpdate(item); setDrawerOpen(true); }}>Update</button>
                    <button onClick={() => { handleDelete(item.id); setDrawerOpen(!drawerOpen); }}>Delete</button>
                </>
                )}

        </div>
      </td>
    </tr>
  ))}
</tbody>
</table>

      </div> 
    </div>
  );
};

export default HomePage