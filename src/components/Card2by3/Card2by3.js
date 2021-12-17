import React from 'react'
import {Link} from 'react-router-dom'

const Card2by3 = ({heading, desc, authorName, mini, image, authorImage, category,idx}) => {
    const path = window.location.pathname;
    return (
        <div className="w-full md:w-2/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <Link to={idx===-1?path:`/post/${idx+1}`} className="flex flex-wrap no-underline hover:no-underline">	
                    <img src={image} className="h-full w-full rounded-t pb-6" alt="post"/>
                    <p className="w-full text-gray-600 text-xs md:text-sm px-6">{category}</p>
                    <div className="w-full font-bold text-xl text-gray-900 px-6">{heading}</div>
                    <p className="text-gray-800 font-serif text-base px-6 mb-5">
                        {desc} 
                    </p>
                </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                    <img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src={authorImage} alt={authorName}/>
                    <p className="text-gray-600 text-xs md:text-sm">{mini} READ</p>
                </div>
            </div>
        </div>
    )
}

export default Card2by3
