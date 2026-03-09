"use client"

import { useState } from "react"

export default function CrearAutor(){

  const [name,setName] = useState("")
  const [birthDate,setBirthDate] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")

  const calculateAge = (date:string) => {
    const today = new Date()
    const birth = new Date(date)

    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){
      age--
    }

    return age
  }

  const nameError =
    name.length > 0 && name.length < 3
      ? "El nombre debe tener al menos 3 caracteres"
      : ""

  const descriptionError =
    description.length > 0 && description.length < 10
      ? "La descripción debe tener al menos 10 caracteres"
      : ""

  let ageError = ""

  if(birthDate){
    const age = calculateAge(birthDate)

    if(age < 18){
      ageError = "El autor debe tener al menos 18 años"
    }
  }

  const isFormValid =
    name.length >= 3 &&
    description.length >= 10 &&
    birthDate &&
    calculateAge(birthDate) >= 18

  const handleSubmit = async (e:React.FormEvent) => {

    e.preventDefault()

    if(!isFormValid) return

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

    setName("")
    setBirthDate("")
    setDescription("")
    setImage("")
  }

  return (

    <div style={{display:"flex",justifyContent:"center",marginTop:"40px"}}>

      <div style={{
        width:"420px",
        padding:"30px",
        borderRadius:"10px",
        boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{textAlign:"center",marginBottom:"20px"}}>
          Crear Autor
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{display:"flex",flexDirection:"column",gap:"15px"}}
        >

          {/* NOMBRE */}
          <div>
            <input
              placeholder="Nombre"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{
                width:"100%",
                padding:"10px",
                borderRadius:"6px",
                border: nameError ? "1px solid red" : "1px solid #ccc"
              }}
            />

            {nameError && (
              <p style={{color:"red",fontSize:"12px"}}>
                {nameError}
              </p>
            )}
          </div>

          {/* FECHA */}
          <div>
            <input
              type="date"
              value={birthDate}
              onChange={(e)=>setBirthDate(e.target.value)}
              style={{
                width:"100%",
                padding:"10px",
                borderRadius:"6px",
                border: ageError ? "1px solid red" : "1px solid #ccc"
              }}
            />

            {ageError && (
              <p style={{color:"red",fontSize:"12px"}}>
                {ageError}
              </p>
            )}
          </div>

          {/* DESCRIPCION */}
          <div>
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              style={{
                width:"100%",
                padding:"10px",
                borderRadius:"6px",
                border: descriptionError ? "1px solid red" : "1px solid #ccc"
              }}
            />

            {descriptionError && (
              <p style={{color:"red",fontSize:"12px"}}>
                {descriptionError}
              </p>
            )}
          </div>

          {/* IMAGEN */}
          <input
            placeholder="URL de imagen"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          {/* BOTON */}
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              padding:"12px",
              borderRadius:"6px",
              border:"none",
              background: isFormValid ? "#0070f3" : "#9ca3af",
              color:"white",
              fontWeight:"bold",
              cursor: isFormValid ? "pointer" : "not-allowed",
              transition:"0.2s"
            }}
          >
            Crear Autor
          </button>

        </form>

      </div>

    </div>
  )
}