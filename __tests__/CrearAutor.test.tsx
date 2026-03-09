import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CrearAutor from "../app/crear/page"

describe("Formulario CrearAutor", () => {

  test("renderiza el formulario", () => {

    render(<CrearAutor />)

    expect(
      screen.getByRole("heading", { name: /crear autor/i })
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText("Nombre")
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText("Descripción")
    ).toBeInTheDocument()

  })


  test("muestra error si el nombre tiene menos de 3 caracteres", async () => {

    render(<CrearAutor />)

    const nameInput = screen.getByPlaceholderText("Nombre")

    await userEvent.type(nameInput, "ab")

    expect(
      screen.getByText("El nombre debe tener al menos 3 caracteres")
    ).toBeInTheDocument()

  })


  test("muestra error si la descripción tiene menos de 10 caracteres", async () => {

    render(<CrearAutor />)

    const descriptionInput = screen.getByPlaceholderText("Descripción")

    await userEvent.type(descriptionInput, "corto")

    expect(
      screen.getByText("La descripción debe tener al menos 10 caracteres")
    ).toBeInTheDocument()

  })


  test("el botón está deshabilitado si el formulario no es válido", () => {

    render(<CrearAutor />)

    const button = screen.getByRole("button", { name: /crear autor/i })

    expect(button).toBeDisabled()

  })


  test("el botón se habilita cuando el formulario es válido", async () => {

    const { container } = render(<CrearAutor />)

    await userEvent.type(
      screen.getByPlaceholderText("Nombre"),
      "Gabriel Garcia"
    )

    await userEvent.type(
      screen.getByPlaceholderText("Descripción"),
      "Autor colombiano muy famoso"
    )

    const dateInput = container.querySelector('input[type="date"]')!

    fireEvent.change(dateInput, {
      target: { value: "1980-01-01" }
    })

    const button = screen.getByRole("button", { name: /crear autor/i })

    expect(button).not.toBeDisabled()

  })

})