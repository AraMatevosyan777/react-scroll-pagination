import axios from 'axios'
import React, { useEffect, useState } from 'react'
import loader from './loader.svg'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(0)

  useEffect(()=>{
    setLoading(true)
    if(fetching){
      setTimeout(()=> {
        axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
    .then(res => {
      setTotalCount(res.headers['x-total-count'])
      setPhotos([...photos, ...res.data])
      setCurrentPage(currentPage + 1)
      setLoading(false)
    })
    .finally(()=> setFetching(false))
      }, 1000)
    }
  }, [fetching])

  useEffect(()=>{
    document.addEventListener('scroll', scrollHandle)
    return function(){
      document.removeEventListener('scroll', scrollHandle)
    }
  }, [])

  const scrollHandle = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
    // && photos.length < totalCount
    ){
      setFetching(true)
    }
  }

  return (
    <div>
      {photos.map(photo => 
        <div key={photo.id} className='photo'>
          <div className='title'>{photo.id}. {photo.title}</div>
          <img src={photo.thumbnailUrl}/>
        </div>
        )}
        {loading && 
          <div className='loader'>
            <img src={loader}/>
          </div>
        }
    </div>
  )
}

export default App
