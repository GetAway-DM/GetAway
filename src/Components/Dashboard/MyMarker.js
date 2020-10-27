// import React from 'react'

// const MyMarker = ({ text, tooltip, $hover }) => {
//   const handleClick = () => {
//     console.log(`You clicked on ${tooltip}`)
//   }

//   return (
//     <div className={$hover ? 'circle hover' : 'circle'} onClick={handleClick}>
//       <span className="circleText" title={tooltip}>
//         {text}
//       </span>
//     </div>
//   )
// }
// export default MyMarker

import React from 'react'
import styled from 'styled-components'
import { HouseFill } from '@styled-icons/bootstrap/HouseFill'

const WrapperStyle = {
  color: 'white',
  backgroundColor: 'teal',
  fontSize: '10px',
}

const Wrapper = () => <HouseFill size="48" />

const MyMarker = ({ text, onClick, tooltip }) => (
  <Wrapper
    style={WrapperStyle}
    src={HouseFill}
    text={'text'}
    tooltip={'test'}
    onClick={onClick}
  />
)

export default MyMarker
