import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

const EMPTY_FORM: FormData = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSent(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (form.name.trim().length < 2) {
      setError('Informe seu nome.')
      nameRef.current?.focus()
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Informe um e-mail válido.')
      return
    }
    if (form.message.trim().length < 10) {
      setError('A mensagem precisa ter pelo menos 10 caracteres.')
      return
    }

    // Envio simulado (não há servidor de e-mail neste projeto)
    setError('')
    setSent(true)
    setForm(EMPTY_FORM)
    nameRef.current?.focus()
  }

  return (
    <div className="container section">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1>Contato</h1>
        <p className="muted">Dúvidas ou sugestões? Envie uma mensagem.</p>

        <label htmlFor="contact-name">Nome</label>
        <input
          id="contact-name"
          ref={nameRef}
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="contact-email">E-mail</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="contact-message">Mensagem</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
        />

        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
        {sent && (
          <p className="form__success" role="status">
            ✅ Mensagem enviada com sucesso! (simulado)
          </p>
        )}

        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </div>
  )
}
