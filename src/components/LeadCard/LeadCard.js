import React from 'react'
import './styles.css'
import {Link} from 'react-router-dom'

function LeadCard({heading, desc, authorName, mini, image, authorImage, category,idx}) {
	const path= window.location.pathname;
    return (
        <div className="flex h-full bg-white rounded overflow-hidden shadow-lg">
					 <Link to={idx===-1?path:`/post/${idx+1}`} className="flex flex-wrap no-underline hover:no-underline">
						<div className="w-full md:w-2/3 rounded-t">	
							<img src={image} className="h-full w-full shadow" alt="blog"/>
						</div>
						<div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
							<div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
								<p className="w-full text-gray-600 text-xs md:text-sm pt-6 px-6">{category}</p>
								<div className="w-full font-bold text-xl text-gray-900 px-6">{heading}</div>
								<p className="text-gray-800 font-serif text-base px-6 mb-5">
									{desc}
								</p>
							</div>

							<div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
								<div className="flex items-center justify-between">
									<img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src={authorImage} alt={authorName}/>
									<p className="text-gray-600 text-xs md:text-sm">{mini} READ</p>
								</div>
							</div>
						</div>

					</Link>
		</div>
    )
}

export default LeadCard;
