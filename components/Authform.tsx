"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import FormField from "@/components/FormField"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { signIn, signUp } from '@/lib/actions/auth.action'

const authformSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100)
})
}
type FormType = "sign-in" | "sign-up"
const Authform = ({ type }: { type: FormType }) => {
  // 1. Define your form.
  const Router = useRouter();
  const formSchema = authformSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === "sign-in"){
        const{email,password}= values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();
        if(!idToken){
          toast.error("Sign in failed");
        }
        await signIn({
          email,
          idToken: password
        })
        toast.success("Signed in successfully!");
        Router.push('/');
      } else {
        const {name,email,password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        const result = await signUp({
          uid : userCredentials.user.uid,
          name : name ?? "",
          email,
          password
        })
        if(!result?.success){
          toast.error(result?.message);
          return;
        }
        else{
          toast.success("Account created Successfully. Please Sign in");
          Router.push('/sign-in');
        }
      }
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong. Please try again. Error: " + error);
    }
  }
  const isSignin = type === "sign-in";
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="card-border bg-white rounded-xl shadow-xl lg:min-w-[400px] w-full max-w-md transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col gap-6 card py-12 px-8 items-center">
          <div className="flex flex-row gap-2 justify-center items-center">
            <Image src="/logo.svg" alt="logo" height={40} width={48} />
            <h2 className="text-indigo-700 text-2xl font-bold transition-colors duration-300 hover:text-purple-700">
              ByteInterview
            </h2>
          </div>
          <h3 className="text-lg font-medium text-gray-700 text-center mb-2">
            Practice job interviews with AI
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col items-center space-y-6 mt-2"
            >
                {!isSignin && 
                <FormField
                  control={form.control}
                  name="name"
                  label=""
                  placeholder="Your Name"
                  type="text"
                />}
                <FormField
                  control={form.control}
                  name="email"
                  label=""
                  placeholder="Your Email Address"
                  type="email"
                />
                <FormField
                  control={form.control}
                  name="password"
                  label=""
                  placeholder="Enter Password"
                  type="password"
                />
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-purple-600 text-white font-semibold py-2 rounded transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {isSignin ? "Sign In" : "Create an Account"}
              </Button>
            </form>
          </Form>
          <div className="text-sm text-gray-500 mt-2 transition-colors duration-300 hover:text-indigo-700 cursor-pointer">
            {isSignin ? "": ""}
              <Link href={!isSignin ? "/sign-in" : "/sign-up"} className="text-indigo-600 hover:text-purple-600 font-medium ml-1">{isSignin ? "Don't have an account? Sign up!" : "Already have an account? Sign in!"}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authform