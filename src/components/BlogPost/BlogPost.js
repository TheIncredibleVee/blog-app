import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {Helmet } from 'react-helmet';


const BlogPost = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const params = useParams();
    console.log(params);
    let posts = JSON.parse(localStorage.getItem('posts')) || [{
        "id": params.id,
        "mini": "2 min",
        "authorImage": "https://i.pravatar.cc/150?img=2",
        "authorName": "\"Vinay\"",
        "body": "\"sample body\"",
        "image": "https://source.unsplash.com/collection/194243/800x600",
        "date": "2021-12-16",
        "desc": "\"This starter template is an attempt to replicate the default Ghost theme \"Casper\" using Tailwind CSS and vanilla Javascript.\"",
        "heading": "\"👋 Welcome fellow Tailwind CSS and Ghost fan\"",
        "category": "\"GETTING STARTED\""
    }];
    const post = posts.find(post => post.id === Number(params.id));
    posts=posts.filter(po => po.id !== Number(params.id));
    console.log({post});
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [post])
    return (
        <>
        <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{post.heading}</title>
            <meta name="description" content={post.desc} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={post.heading} />
            <meta property="og:description" content={post.desc} />
            <meta property="og:image" content={post.image} />
            <meta property="og:url" content={`${window.location.href}`} />
            <meta property="og:site_name" content="Blog-app" />
            <meta property="og:type" content="blog" />
            <meta property="og:locale" content="en_US" />
        </Helmet>
        </div>
        <div className="bg-gray-200 font-sans leading-normal tracking-normal">

        <div className="text-center pt-16 md:pt-32">
		    <p className="text-sm md:text-base text-green-500 font-bold">{post.date} <span className="text-gray-900">/</span> {post.category}</p>
		    <h1 className="font-bold break-normal text-3xl md:text-5xl">{post.heading}</h1>
	    </div>

        <div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style={{backgroundImage:`url('${post.image}')` , height: '75vh'}}></div>
	
        <div className="container max-w-5xl mx-auto -mt-32">
            
            <div className="mx-0 sm:mx-6">
                
                <div className="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style={{fontFamily:'Georgia,serif'}}>
                <div dangerouslySetInnerHTML={{__html: `${post.body}`}} />
                </div> 
        
                <div className="container font-sans bg-green-100 rounded mt-8 p-4 md:p-24 text-center">
                    <h2 className="font-bold break-normal text-2xl md:text-4xl">Subscribe </h2>
                    <h3 className="font-bold break-normal font-normal text-gray-600 text-base md:text-xl">Get the latest posts delivered right to your inbox</h3>
                    <div className="w-full text-center pt-4">
                        <form action="#">
                            <div className="max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center">
                                <input type="email" placeholder="youremail@example.com" className="flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none"/>
                                <button type="submit" className="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            
            </div>
        </div>


        <div className="flex w-full items-center font-sans p-8 md:p-24">
            <img className="w-10 h-10 rounded-full mr-4" src={`${post.authorImage}`} alt={`${post.authorName}`} />
            <div className="flex-1">
                <p className="text-base font-bold text-base md:text-xl leading-none">{`${post.authorName}`}</p>
            </div>
            <div className="justify-end">
                <button className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Read More</button>
            </div>
        </div>
        </div>

        <div className="bg-white-200">
	
		<div className="container w-full max-w-6xl mx-auto px-2 py-8">
			<div className="flex flex-wrap -mx-2">
				
            {posts.map(
                (p,idx) => {
                    if(idx>2){
                        return null;
                    }
                    else
                        return(
                        <div className="w-full md:w-1/3 px-2 pb-12">
                        <div className="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
                            <Link to={`/post/${p.id}`} className="no-underline hover:no-underline" onCLick={(e)=>window.scrollTo(0, 0)}>
                                    <img src={`${p.image}`} alt='post' className="h-48 w-full rounded-t shadow-lg"/>
                                    <div className="p-6 h-auto md:h-48">	
                                        <p className="text-gray-600 text-xs md:text-sm">{p.category}</p>
                                        <div className="font-bold text-xl text-gray-900">{p.heading}</div>
                                        <p className="text-gray-800 font-serif text-base mb-5">
                                            {p.desc} 
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between inset-x-0 bottom-0 p-6">
                                        <img className="w-8 h-8 rounded-full mr-4" src={`${p.authorImage}`} alt={`${p.authorName}`}/>
                                        <p className="text-gray-600 text-xs md:text-sm">{p.mini}</p>
                                    </div>
                            </Link>
                        </div>
                        </div>
                        )
                })}
			
		    </div>
		</div>

		</div>
        </>
    )
}

export default BlogPost

