import { Button, Typography } from 'antd'
import React, { useState ,useEffect} from 'react'
import { useParams ,useLocation} from 'react-router-dom'

import {PageHeader,List,Card,Row,Col,Avatar,Tag,Carousel,Rate,Spin} from 'antd'
const Detail = () => {
    const [plan,setPlan]=useState([])
    const [detailData,setDetailData]=useState([])
    const [name,setName]=useState("")
    const [loading,setLoading]=useState(false)
    const { Meta } = Card;
    let location = useLocation()
    let { id } = useParams();
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.wtfup.me/gym/plan`,{
     
            // Adding method type
            method: "POST",
             
           
            body: JSON.stringify({
                gym_id:id
            }),
             
         
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
         
             .then(response => response.json())
         
       
        .then(json => {
            console.log("json",json)
            setDetailData(json.data)
            setName(json.data[0].gym_name)
            setLoading(false)
        }
            );
    }, [id])

   
    
  return (
  <>     
   <PageHeader
 style={{backgroundColor: "#8BC6EC",
 backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
 }}
        onBack={() => window.history.back()}
        title="selected Plan"
         />
         <Spin spinning={loading}>
         <Carousel autoplay>
            {location.state.results.benefit.gallery.map((item)=>{
        return(
            <> 
            <div>
            <h3 style={{height: '600px',
      color: '#fff',
      lineHeight: '600px',
      textAlign: 'center',
      background: `url(${item.images})`
      }}></h3>
          </div>
                </>)})}
     
      </Carousel>
<Row style={{backgroundColor: "#8BC6EC",
backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
}}>
<Col span={17}>

<Typography.Title>{location.state.results.benefit.gym_name}</Typography.Title>
<Rate allowHalf defaultValue={location.state.results.benefit.rating} />
        <br/>
        <Typography.Text>{location.state.results.benefit.address1},{location.state.results.benefit.address2}</Typography.Text>
        <br/>
        <Typography.Text>{location.state.results.benefit.duration_text} away |{location.state.results.benefit.distance_text}</Typography.Text>
    
    <Typography.Title>Facility</Typography.Title>
    {location.state.results.benefit.benefits.map((item)=>{
        return(
            <>
            <Tag color="magenta">{item.name}</Tag>
            </>
    )
    })}

<Typography.Title>Why to choose WTF</Typography.Title>
    {location.state.results.term.map((item)=>{
       if(item.name ==null)return null;
        return(
            <>
            <Tag color="magenta">{item?.name}</Tag>
            </>
    )
    })}
</Col>
<Col span={6}>
    <div style={{height:"500px", overflow:"auto", border:"2px solid black",borderRadius:"20px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <Typography.Title level={3} style={{textAlign:"center"}}>Choose Membership</Typography.Title>
         <List
         grid={{ gutter: 16, column: 1 }}
         dataSource={detailData}
         renderItem={(item,index) => (
           <List.Item key={item.email}>
            <Card  >
                <Row>
                    <Col span={20}>
                <div>Plan {index+1}</div>
                <div style={{display:"flex"}}>
                <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
     
    />
               <Typography.Text> {item.plan_name}</Typography.Text>
               </div>
               </Col>
               <Col span={4}>               <div>{item.plan_price}</div></Col>


               </Row>

                </Card>
             {/* <List.Item.Meta
               
               title={<a href="https://ant.design">{item.plan_name}</a>}
               description={item.description}
             />
             <div>Content</div> */}
           </List.Item>
         )}
       />
        </div>
       </Col>
       </Row>
       </Spin >
   </>

  )
}

export default Detail