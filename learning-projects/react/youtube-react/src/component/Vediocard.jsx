import React from 'react'

const Vediocard = ({ vidInfo }) => {
  
  const { channelTitle, thumbnails, publishedAt, title } = vidInfo.snippet;
  const { viewCount } = vidInfo.statistics;
   
  return (


  <div className="w-72 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
    <img src={thumbnails.default.url} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg leading-tight truncate">{title}</h3>
      <div className="flex items-center text-sm text-gray-600 mt-2">
        <span className="truncate">{channelTitle}</span>
        <span className="mx-1">&middot;</span>
        <span>{viewCount} views</span>
        <span className="mx-1">&middot;</span>
        <span>{publishedAt}</span>
      </div>
    </div>
  </div>
)

}

export default Vediocard