# Fitpel Site

Site institucional da Fitpel, desenvolvido em HTML5 semântico para a disciplina de Desenvolvimento Frontend para Web — A2 (2026.2).

**Professor:** Cid Andrade

## Alunos

- Guilherme Souza Do Carmo — RGM: 47856424
- Matheus Victoriano Pires Barbosa — RGM: 47387980
- Diogo de Castro Moreira — RGM: 47629045

## Introdução

A FIT-PEL é uma fabricante brasileira de fitas adesivas, com sede própria na Mooca, São Paulo, atuando no mercado há mais de 37 anos. A empresa produz uma linha completa de fitas — de embalagem, dupla face, técnicas e personalizadas — atendendo indústrias, distribuidores e e-commerces em todo o Brasil, com uma estrutura fabril de 8.000 m² e mais de 120 colaboradores.

O objetivo deste site é apresentar a empresa, seus produtos e diferenciais de forma clara e organizada, funcionando como um canal de contato e solicitação de orçamento para clientes em potencial, além de esclarecer dúvidas frequentes sobre qual tipo de fita utilizar em cada aplicação.

## Desenvolvimento

### Levantamento com a organização

O contato com a FIT-PEL foi feito de forma presencial, através de visita à fábrica, localizada na Mooca, São Paulo. Na ocasião, o membro Guilherme conversou com o gerente da empresa, que apresentou brevemente a estrutura fabril e o processo produtivo, e autorizou o uso de fotos, vídeo institucional e do logotipo da empresa neste projeto acadêmico.

**Comprovação do contato:**

![Visita à fábrica FIT-PEL](/assets/img/IMG_1809.jpg)

*Foto tirada durante a visita à fábrica, mostrando caixas de fita adesiva e maquinário de produção.*

### Estrutura do site

O site é composto por 10 páginas HTML interligadas por um menu de navegação:

- `index.html` — página inicial, com apresentação da empresa e destaques dos produtos
- `contato.html` — formulário de contato
- `orcamento.html` — solicitação de orçamento
- `paginas/quem-somos.html` — história e identidade da empresa
- `paginas/fabrica.html` — estrutura fabril, com vídeo institucional
- `paginas/produtos.html` — linha de produtos
- `paginas/aplicacoes.html` — segmentos atendidos
- `paginas/fita-personalizada.html` — fita personalizada com logotipo do cliente
- `paginas/qual-fita-usar.html` — guia de escolha de produto
- `paginas/faq.html` — perguntas frequentes

```
projeto-fitpel-frontend/
├── index.html
├── contato.html
├── orcamento.html
├── README.md
├── paginas/
│   ├── quem-somos.html
│   ├── fabrica.html
│   ├── produtos.html
│   ├── aplicacoes.html
│   ├── fita-personalizada.html
│   ├── qual-fita-usar.html
│   └── faq.html
└── assets/
    ├── img/
    │   ├── IMG_1058.jpg
    │   ├── IMG_1080.jpg
    │   ├── IMG_1153.jpg
    │   ├── IMG_1809.jpg
    │   └── logo-fitpel.webp
    ├── audio/
    │   └── breve-audio.mp3
    ├── video/
        ├── video-institucional.mp4
        └── video-institucional-2.mp4
```

### Decisões técnicas

- Marcação semântica HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`) em todas as páginas.
- Formulário de contato com validação nativa do HTML5 (`required`, `pattern`, `type="email"`, `type="tel"`, etc.), sem depender de JavaScript.
- Recursos de `<audio>` e `<video>` incorporados em pelo menos uma página.
- Código validado no [W3C Validator](https://validator.w3.org/).

### Desafios técnicos

- **Validação nativa do formulário (`required`, `pattern`, `type="email"`):** entender como o HTML5 valida os campos sem precisar de JavaScript foi um dos pontos que mais gerou dúvida. O `required` sozinho não garante o formato certo do dado — foi preciso pesquisar como o `pattern` funciona com expressões regulares (por exemplo, para aceitar o telefone no formato `(11) 91234-5678`) e entender por que `type="email"` já valida automaticamente a estrutura de um e-mail, sem precisar de regex adicional.
- **Caminhos relativos:** inicialmente os links para `assets/` e as páginas internas apresentaram erro 404, pois os arquivos dentro de `paginas/` referenciavam os caminhos como se estivessem na raiz do projeto. Foi necessário ajustar todos os caminhos usando `../` para subir um nível de pasta corretamente.
- **Vídeo institucional:** o vídeo fornecido pela empresa precisou ser recodificado com o HandBrake (codec H.264) para garantir compatibilidade de reprodução nos navegadores.
- **Proporção de imagens:** a imagem usada como capa (poster) do vídeo estava em formato retrato, o que distorcia a visualização no elemento `<video>`. Foi necessário cortar a imagem para uma proporção widescreen antes de utilizá-la.
- **Padronização de indentação:** por ter sido editado por integrantes diferentes do grupo, o código apresentou inconsistência entre 2 e 4 espaços de indentação, corrigida posteriormente para manter o padrão do projeto.

## Conclusão

A ser escrito ao final da Entrega 1: reflexão do grupo sobre o resultado e os aprendizados da etapa.

## Site hospedado

Link do deploy no Netlify — a ser adicionado após o deploy.

## Uso de Inteligência Artificial

Durante o desenvolvimento deste projeto, ferramentas de IA (Claude) foram utilizadas de forma extensiva como apoio ao aprendizado e à execução do trabalho, já que o grupo ainda está iniciando os estudos em HTML5, Git/GitHub e boas práticas de desenvolvimento web. A IA foi consultada para tirar dúvidas em praticamente todas as etapas do projeto, incluindo: uso e significado de tags HTML e atributos (semânticos, de acessibilidade e de formulário), formatação e indentação de código, convenções de nomenclatura de arquivos e pastas, uso do Git e GitHub (commits, tags de versão, controle de histórico), e organização geral do repositório.

Parte do conteúdo textual das páginas foi escrita diretamente pelo grupo, e parte foi levantada por meio de pesquisa (incluindo informações do site oficial da empresa e de conversas com o responsável pela FIT-PEL) e posteriormente organizada e redigida com auxílio de IA. A ferramenta também ajudou na resolução de problemas técnicos específicos encontrados durante o desenvolvimento (como caminhos relativos de arquivos e compatibilidade de vídeo, descritos na seção de Desafios técnicos). As decisões finais de estrutura, conteúdo e revisão do site foram feitas pelo grupo, que também validou todas as páginas no W3C Validator e testou o funcionamento do site (navegação, formulário, vídeo e áudio) antes da entrega.

## Como visualizar

Abra o arquivo `index.html` em um navegador, ou acesse o link do site hospedado acima.
