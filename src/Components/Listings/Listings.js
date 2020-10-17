import React, { useState, useEffect } from 'react'

const Listing = (props) => {
    const [title, setTitle]= useState('')
    const [price, setPrice] = useState(0)
    const [host, setHost] = useState('')



    useEffect(() => {
        axios
            // TODO finish passing props into the axios request
            .get(`/api/listing/getlisting/${this.state.id}`)
            // TODO need to finish this request
            .then(res => (res.date))

    }, [] )

    return ( <div>

    </div> )

}

export default Listing
