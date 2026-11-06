export default function About() {
  return (
    <div className="container section">
      <div className="form about">
        <h1>Sobre o Projeto</h1>
        <p>Projeto Na Disciplina de Front-end Frameworks.</p>
        <p>
          Aplicação desenvolvida em React + TypeScript. Dados fornecidos pela{' '}
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
            PokéAPI
          </a>
          .
        </p>
        <h2>Por que escolhi a PokéAPI?</h2>
        <p>
            Escolhi a PokéAPI por dois motivos. O primeiro é que já tinha experiência com ela, o que
            me deixou mais seguro para focar nos requisitos do trabalho (componentes, páginas e hooks)
            em vez de perder tempo aprendendo uma API nova.
        </p>
        <p>
            O segundo, e o mais importante, é que ela é <strong>gratuita</strong>: não exige cadastro,
            chave de acesso nem pagamento, então qualquer pessoa pode baixar o projeto e rodá-lo sem
            configurar nada.
        </p>
      </div>
    </div>
  )
}
