import React from 'react'
import { Button,PageHeader } from 'antd';
import Poster from './Poster';
import Filter from './Filter';
const Homepage = () => {
  return (
    <>
    <PageHeader
   style={{backgroundColor: "#8BC6EC",
   backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
   }}
    className="site-page-header"
   
    title="W T F"
    extra={[<Button type="primary" >Fitness</Button>,<Button type="primary" >Nutrition</Button>,<Button type="primary" >Gyms</Button>,<Button type="primary" >Become WTF partner</Button>,,<Button type="primary" >About us</Button>,<Button type="danger" >Login</Button>]}
    
  />
  <Poster/>
  <Filter/>
  </>
  )
}

export default Homepage