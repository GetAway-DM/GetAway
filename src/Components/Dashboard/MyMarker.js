import React from 'react'
import HouseIcon from '@material-ui/icons/House'

const WrapperStyle = {
  color: 'white',
  backgroundColor: 'teal',
  fontSize: '10px',
}

const Wrapper = () => <HouseIcon size="large" />

const MyMarker = ({ text, onClick, tooltip }) => (
  <Wrapper
    style={WrapperStyle}
    src={HouseIcon}
    text={'text'}
    tooltip={'test'}
    onClick={onClick}
  />
)

export default MyMarker
