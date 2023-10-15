import React from 'react';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../utilities/firebase';

const Banner = ({title}) => {
    const provider = new GoogleAuthProvider();

    const buttonStyle = {
        marginTop: '30px',
        padding: '5px 10px',
        fontSize: '12px',
    };

    const signInOutButton = auth.currentUser 
    ? <button style={buttonStyle} onClick={() => signOut(auth)}>Sign Out</button> 
    : <button style={buttonStyle} onClick={() => signInWithPopup(auth, provider)}>Sign In</button>;

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{title}</h1>
            <div style={{ display: 'inline-block' }}>
                {signInOutButton}
            </div>
        </div>
    );
};

export default Banner;
