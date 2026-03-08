"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Author = {
  id: number
  name: string
  birthDate: string
  description: string
  image: string
}

export default function Authors() {

  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data))
  }, [])

  const deleteAuthor = async (id: number) => {

    await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "DELETE"
    })

    setAuthors(authors.filter(a => a.id !== id))
  }

  return (

    <div>

      <h1>Lista de Autores</h1>

      <Link href="/crear">
        Crear Autor
      </Link>

      <ul>

        {authors.map((author) => (

          <li key={author.id} style={{ marginBottom: "20px" }}>

            <img
              src={author.image}
              width="120"
              alt={author.name}
            />

            <h3>{author.name}</h3>

            <p>{author.description}</p>

            <Link href={`/editar/${author.id}`}>
              Editar
            </Link>

            <button onClick={() => deleteAuthor(author.id)}>
              Eliminar
            </button>

          </li>

        ))}

      </ul>

    </div>
  )
}