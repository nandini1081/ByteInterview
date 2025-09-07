"use client"
import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: String;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
}

const FormField = <T extends FieldValues>({ control,name,label,placeholder,type="text" }: FormFieldProps<T>) => {
  return (
    <Controller 
    name={name} 
    control={control} 
    render={({ field }) => 
      (
        <FormItem>
          <FormLabel className='label text-black'>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} className="text-black"/>
          </FormControl>
          <FormMessage />
        </FormItem>
    )
  }
  />
   
  )
}

export default FormField