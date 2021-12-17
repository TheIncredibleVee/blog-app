import * as firebase from 'firebase/auth'; 

const socialMeidaAuth = (provider) => {
    return firebase.signInWithPopup(provider).then(res=>{
        return res.user.facebook
        }).catch(err=>{
            console.log(err);
            return err;
        })
};
export default socialMeidaAuth;