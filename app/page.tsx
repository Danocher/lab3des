'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { decryption, encryption } from "@/actions";
// import Dec from "@/components/decrypt";
export default function Home() {
  const [text, setText] = useState('')
  const [cipher, setCipher] = useState('')
  const [Encrypted, setEncrypted] = useState('')
  const [decode, setDecode] = useState('')
  function input(e: React.ChangeEvent<HTMLInputElement>){
    setText(e.target.value)
    setCipher('')
  }
  const [isPending, startTransition] = useTransition()
  function submitt(e: React.FocusEvent<HTMLFormElement>){
    e.preventDefault()
    // startTransition(()=>{
      encryption({ text, key})
      .then((e:string)=>{
      setCipher(e)

      })
      decryption({text: Encrypted, key: key1})
      .then((e:string)=>{
        setDecode(e)

      })
    // })
  }
  function cipherus(e: React.ChangeEvent<HTMLInputElement>){
    setEncrypted(e.target.value)
  }
  const [key, setKey] = useState('')
  function inputkey(e: React.ChangeEvent<HTMLInputElement>){
      setKey(e.target.value)
  }
  const [key1, setKey1] = useState('')
  function inputkey1(e: React.ChangeEvent<HTMLInputElement>){
    setKey1(e.target.value)
}
  return (
    <div className="flex-col items-center justify-center mt-22" >
      <form className="h-full mt-10 " onSubmit={submitt}>
        <Input placeholder="Key" value={key} onChange={inputkey} className=" "/>
        <Input placeholder="Text" value={text} onChange={input} className=" mt-4"></Input>
        {cipher != '' && <div className="text-white mt-2">
      Зашифрованная строка: {cipher}
      </div>}
      <div className="text-white mt-4"> Key1 = 26 - key</div>
      <Input placeholder="Key1" value={key1} onChange={inputkey1} className=" mt-4"/>
        <Input placeholder="Cipher" value={Encrypted} onChange={cipherus} className=" mt-4"/>
        {decode !='' && 
        <div className="text-white mt-2">
          Расшифрованная строка: {decode}
          </div>}
        <Button type="submit" className="w-full p-2 rounded-xl mt-4" >Encrypt</Button>
      </form>
    </div>
  );
}
