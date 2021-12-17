import './App.css';
import { useState, useEffect, useContext } from 'react';
import LeadCard from './components/LeadCard/LeadCard';
import Card1by2 from './components/Card1by2/Card1by2';
import Card2by3 from './components/Card2by3/Card2by3';
import Card1by3 from './components/Card1by3/Card1by3';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { UserContext } from './context/userContext';
import {toast} from 'react-toastify'


const firebaseConfig = {
  apiKey: "AIzaSyDSkfkLyQIGW-lR4JuYBg2F2S6XB2cc1Ts",
  authDomain: "blog-app-394d7.firebaseapp.com",
  projectId: "blog-app-394d7",
  storageBucket: "blog-app-394d7.appspot.com",
  messagingSenderId: "850340029521",
  appId: "1:850340029521:web:84d77e569740d29c410470",
  measurementId: "G-63XNKZ9C1N"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



function App() {


  const { user, isLoggedIn, authError, error } = useContext(UserContext);
  console.log({user, isLoggedIn, authError, error});

  const [loading, setLoading] =useState(true);
  const [posts, setPosts] = useState([{heading: '', body: '',desc:'', authorImage: '', authorName:'', mini:'',image:'',length:0, id:0, date:''}]);
  const [localPost,setLocalPost] =useState(false);

  async function getPosts(db) {
    const postCol = collection(db, 'posts');
    const postSnap = await getDocs(postCol);
    const postList = postSnap.docs.map(doc => doc.data());
    return postList;
  }
  async function fetchData() {
    const posts = await getPosts(db);
    posts.sort((a,b) => {
      return a.id-b.id;
    });
    localStorage.setItem('posts', JSON.stringify(posts)); 
    setLoading(false);
    return posts;
  }
  
  useEffect(() => {
    console.log('relaod');
    if(JSON.parse(localStorage.getItem('posts'))){
      setPosts(JSON.parse(localStorage.getItem('posts')));
      setLocalPost(true);
      setLoading(false);
    }else{
      async function  wrapperFetchData(){
        const posts = await fetchData();
        setPosts(posts);
        setLocalPost(false);
      }
      wrapperFetchData();
    }
    toast.info('Welcome to the Blog-app.', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"colored",
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleConflict(e) {
    console.log(localPost);
    if(localPost){
      const temp = await fetchData();
      console.log(temp);
      setLocalPost(false);
    }
  }
  handleConflict();
 
  if(!loading)
    return (
      <>
      <div className="bg-gray-200 font-sans leading-normal tracking-normal">
        <div className="container px-4  md:px-0 max-w-6xl mx-auto pt-10">
          <div className="mx-0 mt-10 sm:mx-6">
            
            
            <div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
            <LeadCard idx={0} category= {posts[0].category} heading={posts[0].heading} desc={posts[0].desc} authorName = {posts[0].authorName} authorImage = {posts[0].authorImage} mini ={posts[0].mini} image={posts[0].image}/>
             
              <div className="flex flex-wrap justify-between pt-12 -mx-6">
                {posts.map((post, index) => {
                    if(index===0){
                      return null;
                    }
                    else if(index %7===0 || index%7=== 1 || index%7===2 || index%7===3){
                      if(index%7===1 &&index===posts.length-1){
                        return(
                          <div className="bg-gray-200 ml-5 mr-5 text-xl md:text-2xl text-gray-800 leading-normal rounded-t" >
                            <LeadCard idx={post.id-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                            </div>
                          )
                      }else
                        return <Card1by3 idx={post.id-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                    }
                    else if(index%7===4 || index%7===5){
                      if(index%7===4 &&index===posts.length-1){
                        return(
                         <div className="bg-gray-200 ml-5 mr-5 text-xl md:text-2xl text-gray-800 leading-normal rounded-t" > 
                            <LeadCard idx={post.id-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                          </div>
                          )  
                      }else
                        return <Card1by2 idx={post.id-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                    }
                    else{
                      if(index%7===6  && index===posts.length-1 ){
                        return(
                          <div className="bg-gray-200 ml-5 mr-5 text-xl md:text-2xl text-gray-800 leading-normal rounded-t" > 
                            <LeadCard idx={post.id-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                          </div>
                          )  
                      }else
                        return <Card2by3 idx={post.id-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                    }
                })
              }
              </div>
               </div>
          </div>
        </div>
       </div>
      </>
    );
  else
    return (
      <div>Loading...</div>
    );
}

export default App;
