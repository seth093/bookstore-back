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
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then(res => res.json())
      .then(data => setAuthors(data))
  }, [])

  const deleteAuthor = async (id:number) => {

    const confirmDelete = confirm("¿Eliminar autor?")

    if(!confirmDelete) return

    await fetch(`http://127.0.0.1:8080/api/authors/${id}`,{
      method:"DELETE"
    })

    setAuthors(authors.filter(a => a.id !== id))
  }

  
  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Autores
          </h1>

          <Link
            href="/crear"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Crear Autor
          </Link>

        </div>

      
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar autor por nombre..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        {filteredAuthors.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
            No se encontraron coincidencias
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredAuthors.map((author) => (

            <div
              key={author.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <img
                src={author.image}
                alt={author.name}
                className="w-full h-40 object-cover rounded mb-4"
              />

              <h2 className="text-xl font-semibold">
                {author.name}
              </h2>

              <p className="text-gray-600 mb-4">
                {author.description}
              </p>

              <div className="flex gap-3">

                <Link
                  href={`/editar/${author.id}`}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </Link>

                <button
                  onClick={()=>deleteAuthor(author.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}