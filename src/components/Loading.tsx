export default function Loading({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="loading" role="status">
      <span className="loading__ball" aria-hidden="true" />
      <p>{text}</p>
    </div>
  )
}
