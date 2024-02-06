import React, { useState } from 'react'
import Spinner from './Spinner'

const QrCode = () => {
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [qrdata, setQrData] = useState('https://tailwindcss.com/')
  const [qrsize, setQrsize] = useState('50')
  async function generateQR() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(
        qrdata
      )}`
      setImg(url)
      setQrData('')
      setQrsize('')
    } catch (error) {
      console.error('QR Code generate error', error)
    } finally {
      setLoading(false)
    }
  }
  function downloadQR() {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const Link = document.createElement('a')
        Link.href = URL.createObjectURL(blob)
        Link.download = 'QrCode.png'
        document.body.appendChild(Link)
        Link.click()
        document.body.removeChild(Link)
      })
      .catch((error) => {
        console.error('QR Code download error', error)
      })
  }
  return (
    <div className='w-screen h-screen flex flex-col font-poppins items-center justify-center'>
      <h1 className='font-semibold text-sky-600 py-5'>QR CODE GENERATOR</h1>
      {loading && <Spinner />}
      {img && <img src={img} alt='' className='p-2 shadow-lg m-4' />}
      <div className='mx-4'>
        <label htmlFor='data' className='block mb-2 text-sky-600'>
          Data for QR Code :
        </label>
        <input
          type='text'
          id='data'
          value={qrdata}
          onChange={(e) => setQrData(e.target.value)}
          placeholder='Enter data for QR Code'
          className='px-2 py-1.5 w-full mb-6 border-2 border-sky-500 rounded-md outline-sky-600 lg:w-[480px]'
        />
        <label htmlFor='size' className='block mb-2 text-sky-600'>
          Image Size (e.g-150) :
        </label>
        <input
          type='text'
          id='size'
          value={qrsize}
          onChange={(e) => setQrsize(e.target.value)}
          placeholder='Enter image size'
          className='px-2 py-1.5 w-full mb-6 border-2 border-sky-500 rounded-md outline-sky-600 lg:w-[480px]'
        />
        <div className='gap-2'>
          <button
            disabled={loading}
            className='px-2 py-1.5 mr-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 ease-in duration-200'
            onClick={generateQR}
          >
            Generate QR Code
          </button>
          <button
            className='px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 ease-in duration-200'
            onClick={downloadQR}
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  )
}

export default QrCode
