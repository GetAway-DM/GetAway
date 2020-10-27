import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CircularProgress from '@material-ui/core/CircularProgress'
import errorImage from '../../assets/404.svg'
import axios from 'axios'
import HouseImage from '../../assets/placeholderHouse.jpg'
import './dashboard.css'

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const CardListing = () => {
  const classes = useStyles()
  const [data, setData] = useState({ listings: [] })
  const [url, setUrl] = useState('/api/listing/getlistings')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios
          .get('/api/listing/getlistings')
          .then((res) => {
            const listings = res.data
            setData({ listings })
          })
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return (
    <div className="container-listing-mapped">
      {isError && <img src={errorImage} alt="error" />}

      {isLoading ? (
        <CircularProgress
          size={200}
          color={'secondary'}
          style={{ position: 'relative', top: '8rem', left: '-2rem' }}
        />
      ) : (
        <>
          {data.listings.map((item) => (
            <Card className={classes.card} key={item.id}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>${item.price}</Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.title}
                subheader={`${item.city}, ${item.state}`}
              />
              {item.zip}
              <CardMedia
                className={classes.media}
                image={HouseImage}
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  )
}

export default CardListing
