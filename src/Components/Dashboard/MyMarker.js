import React from 'react'
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
