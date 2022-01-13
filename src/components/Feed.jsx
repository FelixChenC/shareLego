import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MansoryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(null)
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        if (categoryId) {
            const query = searchQuery(categoryId)

            client.fetch(query)
                .then((data) => {
                    setPins(data)
                    setLoading(false)
                })
        } else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data)
                    setLoading(false)
                })
        }
    }, [categoryId])

    if (loading) return <Spinner message="We are finding lego to fill your page!" />
    if (!pins?.length) return <h2>No Lego available</h2>
    return (
        <div>
            {pins && <MansoryLayout pins={pins} />}
        </div>
    )
}

export default Feed
