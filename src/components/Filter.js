import React,{useEffect,useState} from 'react'
import {Input,Spin} from 'antd'
import GymCard from './GymCard';
import Poster from './Poster';
const { Search } = Input;
const Filter = () => {
  const [location,setLocation]=useState([])
  const [term,setTerm]=useState([])
  const [loading,setLoading]=useState(false)
 
  useEffect(() => {
    getNearestgym()
  
   
  }, [])

  const getNearestgym=(city)=>{
    if(city==undefined){
      setLoading(true)
      fetch(`https://api.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231`)
      .then((res)=> res.json())
      .then((data) => {
        console.log(data)
          setTerm(data?.terms)
        setLocation(data?.data)
        setLoading(false)
      });
    }else{
      setLoading(true)
      fetch(`https://api.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231&city=${city}`)
      .then((res)=> res.json())
      .then((data) => {
        console.log(data)
        setTerm(data?.terms)
        setLocation(data?.data)
        setLoading(false)
      });
    }
    
  }
 

  
  return (
    <>
<div style={{backgroundColor: "#8BC6EC",
 backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
 }}>
  <Spin spinning={loading}>
  <GymCard cardData={location} getresult={getNearestgym} term={term}/>
  </Spin>
  </div>
  </>
  )
}

export default Filter