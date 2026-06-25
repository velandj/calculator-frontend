import {useState,useEffect} from 'react'
import axios from "axios"
import "./calculator.css"
export const Calculator = () => {
  const [expression,setexpression]=useState("");
  const [result,setresult]=useState("");
  const [history,sethistory]=useState([]);

  const gethistory = async() => {
    try{
          const res=await axios.get(
              "https://calculator-backend-w0dy.onrender.com/api/history/"
          );
          sethistory(res.data);

    }catch(error){
      console.error(error);
    }
  };
  useEffect(()=>{
    gethistory();
  },[])
  const calculate=async()=>{
    try{
      const res=await axios.post(
        "https://calculator-backend-w0dy.onrender.com/api/calculate/"
        ,
        {expression: expression}
      );
      setresult(res.data.result);
      
      gethistory();
    }catch(error){
      console.error(error);
    }
  };
  const clearhistory=async() =>{
    try{
      if (!window.confirm("Clear All History?")){
          return;
        }
      await axios.delete(
        
        "https://calculator-backend-w0dy.onrender.com/api/clear-history/"
      );
      sethistory([]);

    }catch(error){
      console.error(error)
    }

  }
  return (
    <div style={{padding:"20px"}}>
        <h1>
          Calculator
        </h1>
        <input  type='text'
           placeholder='Enter Expression'
           value={expression}
           onChange={(e)=> setexpression(e.target.value)}
           className='inp'
        />
        <button onClick={calculate} className='btn'>
          Calculate
        </button>
       
        
        <h2>
          Result:{result}
        </h2>
         <div>
          <button onClick={clearhistory} className='btn'>
          Clear History
        </button>
        </div>
        <div className='history'>
        <h2>History</h2>
        { history.length ===0? <p> No records</p>:
         
        <ul className='hist'>
          {
            history.map((item)=>(
              <li key={item.id}>
                {item.expression}={item.result}
              </li>
            ))
          }
        </ul>
} </div>
    </div>
  )
}
