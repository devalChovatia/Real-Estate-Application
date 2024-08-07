import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import 'swiper/css/bundle'

export default function Listings() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
    SwiperCore.use([Navigation])

    useEffect(() =>{
        const fetchListings = async() =>{
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    return;
                } 
            setListing(data)
            setLoading(false)
            setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }; fetchListings()
        
    }, [params.listingId])

  return (
    <div>
        {loading && <p className="text-center text-2xl mt-5">Loading...</p>}
        {loading && <p className="text-center text-2xl mt-5">Something went wrong...</p>}
        {listing && !loading && !error &&(
            <>
                <Swiper navigation>
                    {listing.imageUrls.map((url) => <SwiperSlide key={url}>
                        <div className="h-[500px]" style={{background: `url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>

                    </SwiperSlide>

                )}
                </Swiper>
            </>
        )}
    </div>
  )
}
