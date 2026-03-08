"use client"

import { useState } from "react"

export default function CrearAutor(){

  const [name,setName] = useState("")
  const [birthDate,setBirthDate] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")

  const handleSubmit = async (e:React.FormEvent) => {

    e.preventDefault()

    const author = {
      name,
      birthDate,
      description,
      image
    }

    await fetch("http://127.0.0.1:8080/api/authors",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(author)

    })

    alert("Autor creado")
  }

  return (

    <div>

      <h1>Crear Autor</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Nombre"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="date"
          value={birthDate}
          onChange={(e)=>setBirthDate(e.target.value)}
        />

        <input
          placeholder="Descripción"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          placeholder="Imagen"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        <button type="submit">
          Crear
        </button>

      </form>

    </div>
  )
}