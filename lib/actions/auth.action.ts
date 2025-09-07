'use server'

import { db, auth } from "@/firebase/admin";
import { SignInParams, SignUpParams, User } from "@/types";
import { cookies } from "next/headers";
import { success } from "zod";

//this is a directive which tells nextjs that this file is a server component and is rendered as a server scomponent

const ONE_WEEK = 60*60*24*7*1000;
export async function signUp(params : SignUpParams  ) {
    const{ uid , name , email } = params;
    try{
         const userRecord = await db.collection('users').doc(uid).get();
         if(userRecord.exists){
            return {
                success:false,
                message: "User already exists!"
            }
         }
         await db.collection('users').doc(uid).set({name ,email})
         return {
            success:true,
            message: "User Created Successfully."   
         }
    }
    catch(error: any){
        console.log("Error creating user", error);
        //firebase specific errors
        if(error.code=== 'auth/email-already-exists'){
            return {
                success: false,
                message: "Email already exists."
            }
        }
        return{
            success: false,
            message: error.message
        }
        throw new Error("Error creating user");

    }
}

export async function setSessionCookie(idToken : string){
    const cookieStore = await cookies();
    const sessionCookies = await auth.createSessionCookie(idToken,{expiresIn: ONE_WEEK })
    cookieStore.set('session',sessionCookies , { 
        maxAge : ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        path : '/',
        sameSite: 'lax' })
}   

export async function signIn(params : SignInParams){
    const { email , idToken } = params;
    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return { 
                success: false,
                message: "User doesn't exist. Create an account instead."
            }
        }
        await setSessionCookie(idToken);
        return { 
            success: true,
            message: "Signed in successfully."
        }
    }
    catch(error : any){
        return { 
            success: false,
            message: "Failed to log in."
        }
    }

}

export async function getCurrentUser() : Promise<User | null>{
    const cookieStore = await cookies();
    //cookieStore thus contains the cookie of the current http request
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie)return null;
    try{
        //decode to see if there is a valid user. 
        //the true passed as parameter checks if the cookie session is revoked or not.
        const decodedClaim = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaim.uid).get();
        if(!(userRecord).exists)return null;
        return {
            ...userRecord.data,
            id: userRecord.id
        } as User
        
    }
    catch(error : any){
        console.log(error);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    // console.log(user);s
    //if u have an object that contains a user data and if u use {} bracket to it , then u get false.
    //  A double curly bracket means that the false will get converted to true. 
    return !!user
}