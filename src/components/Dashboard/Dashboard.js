import React from 'react'
import LeadCard from '../../components/LeadCard/LeadCard';
import react from 'react';
import {useContext, useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import useStyles from './styles';
import Card1by2 from '../../components/Card1by2/Card1by2';
import Card2by3 from '../../components/Card2by3/Card2by3';
import Card1by3 from '../../components/Card1by3/Card1by3';
import {UserContext} from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs,  doc, setDoc} from 'firebase/firestore';
import {PathContext} from '../../context/pathContext';

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
const db = getFirestore();


const Dashboard = () => {


    const navigate = useNavigate();
    const {user, isLoggedIn} = useContext(UserContext);
    
    const {path, setPath}= useContext(PathContext);
    const [loading, setLoading] =useState(true);
    const [posts, setPosts] = useState([{heading: '', body: '',desc:'', authorImage: '', authorName:'', mini:'',image:'', date:''}]);
    const [localPost,setLocalPost] =useState(false);
    const mainCat=['Getting Started', 'Crypto', 'ML'];
    const [postData, setPostData] = useState({heading: '', body: '',desc:'',authorName:user?user.displayName:'', authorImage: user?user.photoURL:'',mini:'',image:'', date:'2021-12-17',category:''});



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

      if(!isLoggedIn){  
        navigate('/login');
        setPath('/login');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleConflict(e) {
      if(localPost){
        const temp = await fetchData();
        setLocalPost(false);
      }
    }
    handleConflict();

    let userPosts = user?posts.filter(post => post.authorName ===user.displayName):posts;
    
    const classes = useStyles();
    const clear = () => {
      setPostData({heading: '', body: '',desc:'',authorName:user?user.displayName:'', authorImage: user?user.photoURL:'' ,mini:'',image:'', id:posts.length, date:'2021-12-17', category:''});
      setCurrentId(posts.length+1);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        postData.mini='10 min';
        const idNew= currentId?currentId:posts.length+1;
        let temp= postData;
        postData.id=idNew;
        await setPostData({...postData, id:idNew});
        console.log({pId:postData.id, cId:idNew});
        //await updateDoc(doc(db,'posts'), {mini:'2 min'});
        await setDoc(doc(db, "posts", `${idNew}`), postData); 
        //console.log("Document written with ID: ", docRef.id);
        const p= await fetchData();
        setPosts(p);
    }

    
    const [currentId,setCurrentId]= useState();

    const handleCard=(e, id)=>{
      setCurrentId(id);
      console.log(currentId);
      const temp= userPosts.find(post => post.id === id);
      setPostData({...postData, category:temp.category, heading:temp.heading, body:temp.body,desc:temp.desc,authorName:temp.authorName, authorImage:temp.authorImage,mini:temp.mini,image:temp.image, id:temp.id, date:temp.date});
    }
    if(!loading)
      return (
          <>
          <div className="grid grid-cols-4 gap-3">
          <div className=" col-span-3 bg-gray-200 font-sans leading-normal tracking-normal">
          <div className="container px-4 md:px-0 max-w-6xl mx-auto pt-10">
            <div className="mx-0 sm:mx-6">
              
              
              <div className="bg-gray-200 w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
                
                <div className="flex flex-wrap justify-between pt-12 -mx-6">
                  {userPosts.map((post, index) => {
                      if(index===0){
                        return(
                          <div className="bg-gray-200 p-5 text-xl w-12/12 md:text-2xl text-gray-800 leading-normal rounded-t"  onClick={(e)=>handleCard(e,post.id)}> 
                            <LeadCard idx={-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                          </div>
                          
                        )
                      }
                      else if(index %7===0 || index%7=== 1 || index%7===2 || index%7===3){
                        if(index%7===1 &&index===userPosts.length-1){
                          return(
                            <div className="bg-gray-200 p-5 text-xl w-12/12 md:text-2xl text-gray-800 leading-normal rounded-t" onClick={(e)=>handleCard(e,post.id)} > 
                              <LeadCard idx={-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                            </div>
                            )
                        }else
                          return <div onClick={(e)=>handleCard(e,post.id)}><Card1by3  idx={-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/></div>
                      }
                      else if(index%7===4 || index%7===5){
                        if(index%7===4 &&index===userPosts.length-1){
                          return(
                            <div className="bg-gray-200 ml-5 mr-5 text-xl md:text-2xl text-gray-800 leading-normal rounded-t"  onClick={(e)=>handleCard(e,post.id)}> 
                              <LeadCard idx={-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                            </div>
                            )  
                        }else
                          return <div onClick={(e)=>handleCard(e,post.id)}><Card1by2 onClick={(e)=>handleCard(e,post.id)} idx={-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/></div>
                      }
                      else{
                        if(index%7===6  && index===userPosts.length-1 ){
                          return(
                            <div className="bg-gray-200 ml-5 mr-5 text-xl md:text-2xl text-gray-800 leading-normal rounded-t"  onClick={(e)=>handleCard(e,post.id)}> 
                              <LeadCard idx={-1} key ={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/>
                            </div>
                            )  
                        }else
                          return <div onClick={(e)=>handleCard(e,post.id)}><Card2by3 onClick={(e)=>handleCard(e,post.id)} idx={-1} key={index} category= {post.category} heading={post.heading} desc={post.desc} authorName = {post.authorName} authorImage = {post.authorImage} mini ={post.mini} image={post.image}/></div>
                      }
                  })
                }
                </div>
                  </div>
            </div>
          </div>
        </div>




          <Paper className={classes.paper}>
          <div className="mt-20">      
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId && currentId<posts.length+1?`Editing the ${currentId}th post`:'Enter the data to be entered'}</Typography>
          <TextField disabled={true} name="Name" variant="outlined" label="Name" fullWidth value={postData.authorName} onChange={(e) => setPostData({ ...postData, authorName: e.target.value })} />
          <TextField disabled={true} name="Email" variant="outlined" label="Email" fullWidth value={postData.authorImage} onChange={(e) => setPostData({ ...postData, authorImage: e.target.value })} />
          <TextField name="heading" variant="outlined" label="Heading" fullWidth value={postData.heading} onChange={(e) => setPostData({ ...postData, heading: e.target.value })} />
          <TextField name="Body" variant="outlined" label="Body" fullWidth multiline rows={4} value={postData.body} onChange={(e) => setPostData({ ...postData, body: e.target.value })} />
          <TextField name="Description" variant="outlined" label="Descrpition" fullWidth value={postData.desc} onChange={(e) => setPostData({ ...postData, desc: e.target.value })} />
          <FormControl fullWidth>
            <InputLabel>Main Category</InputLabel>  
            <Select value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
                {mainCat.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          
          <TextField name="Image Url" variant="outlined" label="Image Url" fullWidth value={postData.image} onChange={(e) => setPostData({ ...postData, image: e.target.value })} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
        </div>
      </Paper>
          
        </div>
        </>
      )
    else
    return (
      <div>Loading...</div>
    );
}

export default Dashboard
