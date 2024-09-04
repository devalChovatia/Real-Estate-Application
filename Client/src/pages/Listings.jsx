import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import 'swiper/css/bundle'
import { useSelector } from 'react-redux'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa'
import ContactLandlord from '../components/ContactLandlord'

export default function Listings() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
    const [copied, setCopied] = useState(false)
    const {currentUser} = useSelector((state) => state.user)
    const [contactLandlord, setContactLandlord] = useState(false)
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
                <div className="fixed top-[16%] cursor-pointer right-[3%] opacity-60 bg-white border rounded-full w-8 h-8 flex justify-center items-center z-10">
                    <FaShare onClick={()=> {
                        navigator.clipboard.writeText(window.location.href)
                        setCopied(true)
                    }}
                    className="text-slate-500"/>
                </div>
                {copied && setTimeout(() => {
                    setCopied(false)
                }, 2000) && (
                    <p className="fixed top-[21%] right-[2%] z-10 rounded-md bg-slate-100 p-2">Link Copied!</p>
                )}
                
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
                    <p className="text-2xl font-semibold">{listing.name} - ${" "}{
                    listing.offer ? listing.discountedPrice.toLocaleString("en-US"): listing.discountedPrice.toLocaleString("en-US")}
                    {listing.type === "rent" && " /month"}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600 text-sm">
                        <FaMapMarkerAlt className="text-green-700"/>
                        {listing.address}
                    </p>
                    <div className="flex gap-2 -mt-5">
                        <p className="bg-red-700 w-full max-w-[200px] text-white text-center rounded-md p-1">
                            {listing.type === "rent" ? "For Rent" : "For Sale"}
                        </p>
                        {
                            listing.offer === true &&(
                                <p className="bg-green-700 w-full max-w-[200px] text-white text-center rounded-md p-1">${+listing.regularPrice - +listing.discountedPrice} OFF</p>
                            )
                        }
                    </div>
                    <p className="text-slate-600">
                        <span className="font-semibold text-black">Description - </span>
                        {listing.description}
                    </p>
                    <ul className="text-green-800 whitespace-nowrap font-semibold text-sm flex flex-wrap gap-4 sm:gap-6 items-center">
                        <li className="flex items-center gap-2 ">
                            <FaBed className="text-lg"/>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed`}
                        </li>
                        <li className="flex items-center gap-2 ">
                            <FaBath className="text-lg"/>
                            {listing.bedrooms > 1 ? `${listing.bathrooms} bathrooms ` : `${listing.bathrooms} bathroom`}
                        </li>
                        <li className="flex items-center gap-2 ">
                            <FaParking className="text-lg"/>
                            {listing.parking === true ? "Parking Spot" : "No Parking"}
                        </li>
                        <li className="flex items-center gap-2 ">
                            <FaChair className="text-lg"/>
                            {listing.furnished === true ? "Furnished" : "Not Furnished"}
                        </li>
                    </ul>
                    {currentUser && listing.userRef !== currentUser._id && !contactLandlord && (
                        <button onClick={()=>{setContactLandlord(true)}} className="bg-slate-700 text-white rounded-lg uppcase hover:opacity-95 p-3">Contact Landlord</button>
                    )}
                    {contactLandlord && <ContactLandlord listing={listing} />}
                </div>
            </>
        )}
    </div>
  )
}
