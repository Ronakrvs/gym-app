import { SearchOutlined,DownOutlined} from '@ant-design/icons';
import {  Card,Menu ,List,Rate,Input,Button,Dropdown,Space, Typography,Spin} from 'antd';
import React, { useMemo, useState ,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';


const GymCard = ({cardData,getresult,term}) => {
    console.log(cardData,term)
    const [search,setSearch]=useState('')
  
    const [gymCity,setGymcity]=useState([])
    const [placeData,setPlaceData]=useState([])
    const [subArea,setsubArea]=useState(false)
    const [gymsubarea,setGymsubarea]=useState([])
    const [loading,setLoading]=useState(false)
    const [city,setCity]=useState("select city")
    const [area,setArea]=useState("select area")
    const navigate = useNavigate();
    useEffect(() => {
       
        gymPlaces()
    
    
    }, [])
    
    
    const gymPlaces = ()=>{
        setLoading(true)
        fetch('https://api.wtfup.me/gym/places')
        .then((res)=> res.json())
        .then((data) => {
          console.log(data)
    setPlaceData(data.data)
    let item = []
    data.data.map((city,index)=>{
        let reqObj = {
            label:city.city,
            key:index
        }
        item.push(reqObj)
    })

    setGymcity(item)
    setLoading(false)
        });
      }
      const selectArea=(key)=>{
        
     let area =  placeData[key.key]
      setArea("select area")
     setSearch("")
     setCity(area.city)
     getresult(area.city)
     let item = []
    area.addressComponent.map((area,index)=>{
        let reqObj = {
            label:area.address1,
            key:index
        }
        item.push(reqObj)
    })

    setGymsubarea(item)
     setsubArea(true)
      }
    const menu=(
        <Menu
        onClick={selectArea}
    items={gymCity}
  />
    )
    const selectsubArea=(key)=>{
        console.log(key)
        console.log(gymsubarea)
       let item = gymsubarea[key.key]
       console.log(item)
       setArea(item.label)
       setSearch(item.label)
    }
    const submenu=(
        <Menu
        onClick={selectsubArea}
    items={gymsubarea}
  />
    )

    const searchGym =useMemo(()=>{
return search.length >0 ? cardData.filter(e=>String(e.gym_name).toUpperCase().includes(search.toUpperCase()) || String(e.address1).toUpperCase().includes(search.toUpperCase())|| String(e.address2).toUpperCase().includes(search.toUpperCase())):cardData
    },[search,cardData])

    const GotoDetail=(id,data)=>{
        console.log(id)

        navigate({pathname:`/gym/${id}`,state:{data}})
    }
    return(
        <>
        <Spin spinning={loading}>
        <Dropdown overlay={menu} overlayStyle={{background:"red !important"}}>
    <a onClick={e => e.preventDefault()}>
      <Space>
       {city}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
 { subArea && <Dropdown overlay={submenu}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        {area}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>}
        <Input type='text' suffix={<SearchOutlined/>} onChange={({target})=>{setSearch(target.value)}}/>
       
        <List
        loading={loading}
        split={true}
    itemLayout="vertical"
    size="large"
   
    dataSource={searchGym}
   
    renderItem={item => (
      <List.Item
        
        key={item.gym_name}
        actions={[
           <Button type="primary">Book Now</Button> , <Link to={`/gym/${item.user_id}`}  state= {{ results: {benefit:item,term:term} }}> More Details </Link>]}
        
        extra={
          <img
            width={272}
            height={250}
            alt="logo"
            src={item.cover_image}
          />
        }
      >
        <List.Item.Meta
         
          title={<a href={item.href}>{item.gym_name}</a>}
          description={item.description}
        />
        <Rate allowHalf defaultValue={item.rating} />
        <br/>
        <Typography.Text>{item.address1},{item.address2}</Typography.Text>
        <br/>
        <Typography.Text>{item.duration_text} away |{item.distance_text}</Typography.Text>
    
      </List.Item>
    )}
  />
  </Spin>
  </>
    )
    }

export default GymCard;