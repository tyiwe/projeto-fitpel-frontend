/* ==========================================================================
   FIT-PEL — comportamento do site (JavaScript puro, sem bibliotecas)
   Tudo aqui é melhoria progressiva: sem JavaScript o site continua funcionando
   (menu visível, formulários com validação nativa do HTML5, FAQ com <details>).
   ========================================================================== */
(function () {
  "use strict";

  // Avisa o CSS que o JavaScript está ativo (usado no menu mobile).
  document.documentElement.classList.add("js");

  /* 1. Menu responsivo ---------------------------------------------------- */
  function iniciarMenu() {
    var botao = document.querySelector(".menu-toggle");
    var menu = document.getElementById("menu-principal");
    if (!botao || !menu) {
      return;
    }

    function definir(aberto) {
      menu.classList.toggle("aberto", aberto);
      botao.setAttribute("aria-expanded", String(aberto));
      botao.textContent = aberto ? "Fechar" : "Menu";
    }

    botao.addEventListener("click", function () {
      definir(!menu.classList.contains("aberto"));
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && menu.classList.contains("aberto")) {
        definir(false);
        botao.focus();
      }
    });
  }

  /* 2. Números da home que "contam" até o valor final ---------------------- */
  function iniciarContadores() {
    var itens = document.querySelectorAll("[data-contar]");
    var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!itens.length || reduzido || !("IntersectionObserver" in window)) {
      return;
    }

    function animar(elemento) {
      var alvo = Number(elemento.dataset.contar);
      var sufixo = elemento.dataset.sufixo || "";
      var duracao = 1200;
      var inicio = null;

      function passo(agora) {
        if (inicio === null) {
          inicio = agora;
        }
        var progresso = Math.min((agora - inicio) / duracao, 1);
        var suave = 1 - Math.pow(1 - progresso, 3);
        elemento.textContent = Math.round(alvo * suave).toLocaleString("pt-BR") + sufixo;
        if (progresso < 1) {
          window.requestAnimationFrame(passo);
        }
      }

      window.requestAnimationFrame(passo);
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animar(entrada.target);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.4 });

    itens.forEach(function (item) {
      observador.observe(item);
    });
  }

  /* 3. Busca instantânea (produtos e guia "Qual fita usar") ---------------- */
  function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function iniciarBusca() {
    document.querySelectorAll("input[data-filtro]").forEach(function (campo) {
      var itens = Array.from(document.querySelectorAll(campo.dataset.filtro));
      var textos = itens.map(function (item) {
        return normalizar(item.textContent);
      });
      var saida = campo.closest("[role='search']").querySelector(".busca-resultado");
      var secoes = Array.from(document.querySelectorAll("main > section"));

      campo.addEventListener("input", function () {
        var digitado = campo.value.trim();
        var termo = normalizar(digitado);
        var visiveis = 0;

        itens.forEach(function (item, i) {
          var combina = termo === "" || textos[i].indexOf(termo) !== -1;
          item.hidden = !combina;
          if (combina) {
            visiveis += 1;
          }
        });

        // Esconde seções que ficaram sem nenhum item visível (menos a da própria busca).
        secoes.forEach(function (secao) {
          var dentro = Array.from(secao.querySelectorAll(campo.dataset.filtro));
          if (dentro.length && !secao.contains(campo)) {
            secao.hidden = dentro.every(function (item) {
              return item.hidden;
            });
          }
        });

        if (termo === "") {
          saida.textContent = "";
        } else if (visiveis === 0) {
          saida.textContent = "Nenhum resultado para \u201C" + digitado + "\u201D. Tente outra palavra.";
        } else {
          saida.textContent = visiveis + (visiveis === 1 ? " resultado encontrado." : " resultados encontrados.");
        }
      });
    });
  }

  /* 4. Perguntas frequentes: expandir / recolher todas --------------------- */
  function iniciarFaq() {
    document.querySelectorAll("[data-faq]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        var abrir = botao.dataset.faq === "abrir";
        document.querySelectorAll("main details").forEach(function (item) {
          item.open = abrir;
        });
      });
    });
  }

  /* 5. Formulários: máscara de telefone, retorno visual e envio ------------ */
  function mascaraTelefone(valor) {
    var n = valor.replace(/\D/g, "").slice(0, 11);
    if (n.length === 0) {
      return "";
    }
    if (n.length <= 2) {
      return "(" + n;
    }
    var meio = n.length > 10 ? 5 : 4;
    if (n.length <= 2 + meio) {
      return "(" + n.slice(0, 2) + ") " + n.slice(2);
    }
    return "(" + n.slice(0, 2) + ") " + n.slice(2, 2 + meio) + "-" + n.slice(2 + meio);
  }

  function mensagemDeErro(campo) {
    var v = campo.validity;
    if (v.valueMissing) {
      return "Preencha este campo.";
    }
    if (v.typeMismatch) {
      return campo.type === "email" ? "Informe um e-mail válido, como voce@empresa.com.br." : "Valor inválido.";
    }
    if (v.patternMismatch) {
      return campo.title || "Formato inválido.";
    }
    if (v.tooShort) {
      return "Digite pelo menos " + campo.minLength + " caracteres.";
    }
    if (v.rangeUnderflow) {
      return campo.type === "date" ? "Escolha uma data a partir de hoje." : "O valor mínimo é " + campo.min + ".";
    }
    if (v.stepMismatch || v.badInput) {
      return "Informe um número inteiro.";
    }
    return campo.validationMessage;
  }

  function mostrarAviso(formulario, classe, texto) {
    var aviso = formulario.parentNode.querySelector(".aviso-sucesso, .aviso-erro");
    if (!aviso) {
      aviso = document.createElement("p");
      aviso.setAttribute("role", "status");
      aviso.tabIndex = -1;
      formulario.parentNode.insertBefore(aviso, formulario);
    }
    aviso.className = classe;
    aviso.textContent = texto;
    aviso.focus();
  }

  function limparFormulario(formulario) {
    formulario.reset();
    formulario.querySelectorAll(".validado").forEach(function (campo) {
      campo.classList.remove("validado");
      campo.removeAttribute("aria-invalid");
    });
    formulario.querySelectorAll(".erro").forEach(function (erro) {
      erro.textContent = "";
    });
  }

  function iniciarFormularios() {
    document.querySelectorAll("main form").forEach(function (formulario) {
      formulario.querySelectorAll("input, select, textarea").forEach(function (campo) {
        var erro = document.createElement("span");
        erro.className = "erro";
        erro.id = campo.id + "-erro";
        campo.setAttribute("aria-describedby", erro.id);
        campo.insertAdjacentElement("afterend", erro);

        function validar() {
          campo.classList.add("validado");
          campo.setAttribute("aria-invalid", String(!campo.validity.valid));
          erro.textContent = campo.validity.valid ? "" : mensagemDeErro(campo);
        }

        if (campo.type === "tel") {
          campo.addEventListener("input", function () {
            campo.value = mascaraTelefone(campo.value);
          });
        }

        campo.addEventListener("blur", validar);
        campo.addEventListener("input", function () {
          if (campo.classList.contains("validado")) {
            validar();
          }
        });
        campo.addEventListener("invalid", validar);
      });

      // O evento "submit" só chega aqui quando a validação nativa passou.
      formulario.addEventListener("submit", function (evento) {
        var sucesso = formulario.dataset.sucesso || "Enviado com sucesso!";
        var destino = formulario.getAttribute("action");

        // Sem destino configurado (action="#"), o envio é apenas uma demonstração.
        if (!destino || destino === "#") {
          evento.preventDefault();
          limparFormulario(formulario);
          mostrarAviso(formulario, "aviso-sucesso", sucesso + " (Demonstração: nenhum dado foi enviado.)");
          return;
        }

        // Com destino configurado (ex.: Formspree), envia sem recarregar a página.
        evento.preventDefault();
        fetch(destino, {
          method: "POST",
          body: new FormData(formulario),
          headers: { Accept: "application/json" }
        }).then(function (resposta) {
          if (!resposta.ok) {
            throw new Error("Falha no envio");
          }
          limparFormulario(formulario);
          mostrarAviso(formulario, "aviso-sucesso", sucesso);
        }).catch(function () {
          mostrarAviso(formulario, "aviso-erro", "Não foi possível enviar agora. Tente de novo ou fale pelo telefone ou WhatsApp.");
        });
      });
    });

    // Orçamento: o prazo desejado não pode ser anterior a hoje.
    var prazo = document.getElementById("prazo");
    if (prazo) {
      var hoje = new Date();
      prazo.min = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0")
      ].join("-");
    }
  }

  /* 6. Botão "voltar ao topo" ---------------------------------------------- */
  function iniciarVoltarTopo() {
    var botao = document.createElement("button");
    botao.type = "button";
    botao.className = "voltar-topo";
    botao.textContent = "Topo";
    botao.setAttribute("aria-label", "Voltar ao topo da página");
    botao.hidden = true;
    document.body.appendChild(botao);

    window.addEventListener("scroll", function () {
      botao.hidden = window.pageYOffset < 600;
    });

    botao.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  iniciarMenu();
  iniciarContadores();
  iniciarBusca();
  iniciarFaq();
  iniciarFormularios();
  iniciarVoltarTopo();
})();
