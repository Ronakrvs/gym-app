import React from 'react'
import {Result,Button,Carousel} from 'antd'

const Poster = () => {
    const contentStyle= {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: 'url(https://st2.depositphotos.com/3386033/5304/i/450/depositphotos_53041219-stock-photo-modern-gym-interior-with-various.jpg)',
      };
  return (
    <Carousel >
      <div style={{backgroundColor: "#8BC6EC",
 backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
 }}>
        <h3 style={contentStyle}>WTF</h3>
      </div>
    </Carousel>
  )
}

export default Poster