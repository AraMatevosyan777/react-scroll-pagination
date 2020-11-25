import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(()=>{
    if(fetching){
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
    .then(res => {
      setTotalCount(res.headers['x-total-count'])
      setPhotos([...photos, ...res.data])
      setCurrentPage(currentPage + 1)
    })
    .finally(()=> setFetching(false))
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
    </div>
  )
}

export default App
