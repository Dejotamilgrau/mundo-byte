# Mundo Byte

Site sobre montagem e manutenção de computadores, feito pela turma **TINF4V** (4º ano do Curso Técnico em Informática Integrado de 2026) do **Instituto Federal Sul-rio-grandense (IFSul), câmpus Camaquã**, na disciplina de Tópicos Especiais.

O objetivo é reunir os problemas, diagnósticos e soluções que a turma encontrou nas aulas práticas do laboratório de montagem e manutenção, para ajudar as próximas turmas e qualquer pessoa que precise resolver problemas comuns de computador.

## Conteúdo

- **Home** – apresentação do site e área de pesquisa de problemas.
- **Visão do computador** – página interativa com uma placa-mãe: ao passar o mouse sobre um componente (processador, memória RAM, placa de vídeo, fonte etc.), aparece uma explicação da função dele.
- **Problemas de hardware** – problemas comuns em computadores antigos.
- **Problemas de software** – tutoriais como:
  - criar pen drive de boot (com a ISO, com o Rufus ou com o Ventoy) e limpar o pen drive depois;
  - instalar o Windows XP via USB;
  - sistema operacional corrompido;
  - loop de reparo automático;
  - drivers desatualizados ou corrompidos;
  - Windows sem som;
  - disco ficando cheio sozinho;
  - arquivos ou pastas que não fecham ou não podem ser excluídos.
- **Sobre nós** – quem somos, missão e visão da turma.
- **Entrar** e **Cadastro** – telas de login e de cadastro. No cadastro dá para escolher entre conta de usuário ou de administrador; a de administrador fica pendente até ser aprovada manualmente por um operador. Por enquanto é só a interface: o site ainda não tem servidor, então os formulários não enviam nada.

## Como rodar

O site é estático, então não precisa instalar nada nem fazer build.

1. Clone o repositório:
   ```bash
   git clone https://github.com/Dejotamilgrau/mundo-byte.git
   cd mundo-byte
   ```
2. Abra o arquivo `HTML/index.html` no navegador (dois cliques no arquivo já resolve).

Se preferir usar um servidor local, por exemplo com Python:

```bash
python3 -m http.server 8000
```

Depois acesse <http://localhost:8000/HTML/index.html>. No VS Code, a extensão **Live Server** também funciona.

## Estrutura de pastas

```
├── HTML/       # Página inicial (index.html), "Sobre nós", login e cadastro
├── HARDWARE/   # Páginas de hardware (visão interativa e computadores antigos)
├── SOFTWARE/   # Páginas de problemas e tutoriais de software
├── CSS/        # Folhas de estilo (reset, base, layout, cabeçalho, rodapé e estilos de cada página)
└── IMG/        # Imagens, logos e ícones (IMG/INTERATIVO tem as peças da página interativa)
```

## Tecnologias

- **HTML5** – estrutura e conteúdo das páginas.
- **CSS3** – estilização, com estilos separados por função (reset, base, layout, cabeçalho, rodapé) e por página.

Não usa JavaScript, frameworks nem bibliotecas externas.

## Autores

Alunos da turma TINF4V de 2026 – IFSul câmpus Camaquã.
Instagram: [@tinf4ve](https://www.instagram.com/tinf4ve)
