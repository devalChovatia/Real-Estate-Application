import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

export default function CreateListing() {

  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({imageUrls: []})
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log(files)
  console.log(formData)

  const handleFileUpload = (e) =>{
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setUploading(true)
      setImageUploadError(false)
      const promises =[];
      for(let i=0; i < files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
        setImageUploadError(false)
        setUploading(false)
      }).catch((error) => {
        setImageUploadError("Image Upload Failed (max 2mb uploads)")
      })
    } else{
      setImageUploadError("Max File Limit Exceeded (max 6)")
      setUploading(false)
    }
  }

  const storeImage = async (file) =>{
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) =>{
          reject(error)
        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            resolve(downloadURL)
          })
      }
      )
    })
  }

  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }


  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#003366] text-center mt-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-3 flex-1">
          <input type="text" id="name" maxLength="62" minLength="10" required className="border p-2 mt-7 rounded-lg" placeholder="Name" />
          <input type="text" id="description" required className="border p-2 mt-7 rounded-lg" placeholder="Description" />
          <input type="text" id="address" required className="border p-2 mt-7 rounded-lg" placeholder="Address" />
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex gap-2 flex-wrap mt-2">
            <div className="flex gap-2 ">
              <input className="p-1 h-7 w-11 rounded-lg border border-gray-300 " type="number" id="bedroom" min="1" max="10" required />
              <span>Bedrooms</span>
            </div>
            <div className="flex gap-2">
              <input className="p-1 h-7 w-11 rounded-lg border border-gray-300 " type="number" id="bathroom" min="1" max="10" required />
              <span>Bathrooms</span>
            </div>

          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 mt-2">
              <input  className="p-1 h-10 w-20 border border-gray-300 rounded-lg" min="1" max="10" type="number" id="rent" required/>
              
              <div className="">
                <span>Regular Price</span>
                <p className='text-xs text-center'>($ / Month)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input  className="p-1 h-10 w-20 border border-gray-300 rounded-lg" min="1" max="10" type="number" id="discountedRent" required/>
              <div className="">
                <span>Discounted Price</span>
                <p className='text-xs text-center'>($ / Month)</p>
              </div>
            </div>
          </div>
        
        
        
        
        </div>
        <div className="flex flex-col flex-1 mt-7 gap-4 sm:m-7">
          <p className="font-semibold ">Images:
            <span className="font-normal text-gray-400 text-xs ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-2">
            <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="images" accept="image/*" multiple required />
            <button type="button" disabled={uploading} onClick={handleFileUpload} className="p-3 text-[#003366] border border-[#003366]rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? "Uploading ..." :"Upload" }</button>
            
          </div>   
          <p className="text-red-700 text-xs">{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
              return (
                <div key={url} className="flex justify-between p-3 border items-center">
                  
                  <img key={url} src={url} alt='listing image' className="w-20 h-20 object-contain rounded-lg" />
                  <button type="button" onClick={()=>handleRemoveImage(index)} className="text-red-700 text-xs rounded-lg uppercase hover:opacity-80">Delete</button>
                </div>
              );
            })
          }

          <button className="p-3 bg-slate-700 text-white rounded-lg  uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>

        </div>
        
      </form>



    </main>
  )
}
