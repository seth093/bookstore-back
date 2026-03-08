"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditarAutor() {

  const params = useParams()
  const router = useRouter()

  const id = params.id

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {

    fetch(`http://127.0.0.1:8080/api/authors/${id}`)
      .then(res => res.json())
      .then(data => {

        setName(data.name)
        setBirthDate(data.birthDate)
        setDescription(data.description)
        setImage(data.image)

      })

  }, [id])

  const updateAuthor = async (e: React.FormEvent) => {

    e.preventDefault()

    const author = {
      name,
      birthDate,
      description,
      image
    }

    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(author)

    })

    alert("Autor actualizado")

    router.push("/authors")

  }

  return (

    <div>

      <h1>Editar Autor</h1>

      <form onSubmit={updateAuthor}>

        <div>
          <label>Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div>
          <label>Descripción</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Imagen</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button type="submit">
          Guardar cambios
        </button>

      </form>

    </div>
  )
}