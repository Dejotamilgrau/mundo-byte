/* Pesquisa de problemas da página inicial.
 Funciona só no navegador: procura na lista abaixo pelo texto digitado e pelas categorias marcadas.
 Ao criar uma página nova no site, adicione ela nesta lista para que apareça na pesquisa. */

const paginas = [
    // Hardware
    { titulo: "Visão do computador", url: "../HARDWARE/hardware.html", categoria: "hardware", palavras: "placa mae processador memoria ram placa de video fonte hd pecas componentes" },
    { titulo: "Problemas em computadores antigos", url: "../HARDWARE/computadores_antigos.html", categoria: "hardware", palavras: "pc velho lento pecas antigas" },

    // Software
    { titulo: "Inacesso à internet e drivers desatualizados", url: "../SOFTWARE/drivers_desatualizados.html", categoria: "software", palavras: "driver rede wifi wi-fi internet realtek gerenciador de dispositivos" },
    { titulo: "Windows sem som", url: "../SOFTWARE/windows_sem_som.html", categoria: "software", palavras: "audio som caixa fone alto-falante driver" },
    { titulo: "Espaço em disco ficando cheio sozinho", url: "../SOFTWARE/disco_cheio.html", categoria: "software", palavras: "hd ssd armazenamento cheio limpeza temp" },
    { titulo: "Arquivos ou pastas que não podem ser excluídos", url: "../SOFTWARE/arquivos_bloqueados.html", categoria: "software", palavras: "apagar deletar excluir arquivo em uso gerenciador de tarefas" },
    { titulo: "Mouse ou teclado não funciona", url: "../SOFTWARE/mouse_teclado.html", categoria: "software", palavras: "usb pilha bateria bluetooth driver periferico" },
    { titulo: "Impressora não imprime", url: "../SOFTWARE/impressora.html", categoria: "software", palavras: "fila offline spooler imprimir" },
    { titulo: "Programa não abre ou fecha sozinho", url: "../SOFTWARE/programa_fecha.html", categoria: "software", palavras: "aplicativo trava congela nao esta respondendo dll compatibilidade" },
    { titulo: "Ícones da área de trabalho sumidos ou desorganizados", url: "../SOFTWARE/icones_area_trabalho.html", categoria: "software", palavras: "desktop icone sumiu explorer" },
    { titulo: "Volume baixo ou microfone sem funcionar", url: "../SOFTWARE/volume_microfone.html", categoria: "software", palavras: "audio som mic chamada meet discord teams" },

    // Sistema operacional
    { titulo: "Sistema operacional corrompido", url: "../SOFTWARE/so_corrompido.html", categoria: "sistemaOperacional", palavras: "windows nao inicia trava formatar reparar" },
    { titulo: "Loop de reparo automático", url: "../SOFTWARE/loop_reparo.html", categoria: "sistemaOperacional", palavras: "windows reinicia reparo bootrec inicializacao" },
    { titulo: "Erro de boot do Windows XP no Rufus e Ventoy", url: "../SOFTWARE/problema1.html", categoria: "sistemaOperacional", palavras: "instalar windows xp usb pen drive winsetupfromusb" },
    { titulo: "Como criar um pen drive de boot com o Ventoy", url: "../SOFTWARE/pendrive_ventoy.html", categoria: "sistemaOperacional", palavras: "tutorial pendrive boot iso instalar" },
    { titulo: "Como criar um pen drive de boot com o Rufus", url: "../SOFTWARE/pendrive_rufus.html", categoria: "sistemaOperacional", palavras: "tutorial pendrive boot iso instalar" },
    { titulo: "Como criar um pen drive de boot direto com a ISO", url: "../SOFTWARE/pendrive_iso.html", categoria: "sistemaOperacional", palavras: "tutorial pendrive boot iso instalar" },
    { titulo: "Como apagar o boot do pen drive e voltar ao normal", url: "../SOFTWARE/limpar_pendrive.html", categoria: "sistemaOperacional", palavras: "tutorial pendrive formatar diskpart limpar" }
];

const resultadosPorPagina = 5;
let paginaAtual = 0;

const campoPesquisa = document.getElementById("digitaPesquisa");
const filtros = document.querySelectorAll(".filtro input");
const listaResultados = document.getElementById("listaResultadosPesquisa");
const botaoVoltar = document.getElementById("botaoVoltar");
const botaoAvancar = document.getElementById("botaoAvancar");

// Deixa o texto em minúsculas e sem acento, assim "audio" encontra "Áudio"
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Palavras muito comuns que não ajudam a achar o problema, como em "meu computador não tem som"
const palavrasIgnoradas = ["a", "o", "as", "os", "e", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
    "um", "uma", "meu", "minha", "nao", "com", "sem", "por", "pra", "para", "que", "se", "esta", "ta", "ficou", "tem",
    "computador", "pc", "problema"];

// Nomes das categorias que aparecem em cada resultado
const nomesCategorias = {
    hardware: "hardware",
    software: "software",
    sistemaOperacional: "sistema-operacional"
};

// Separa um texto em palavras normalizadas
function separarPalavras(texto) {
    return normalizar(texto).split(/[^a-z0-9]+/).filter(palavra => palavra !== "");
}

// Verifica se alguma palavra da lista começa com a palavra pesquisada, assim "impress" encontra "impressora",
// mas "ram" não encontra "programa"
function contemPalavra(lista, palavra) {
    return lista.some(item => item.startsWith(palavra));
}

// Devolve as páginas que combinam com o texto digitado e com as categorias marcadas,
// das mais parecidas com a pesquisa para as menos parecidas
function buscar() {
    const pesquisadas = separarPalavras(campoPesquisa.value).filter(palavra => !palavrasIgnoradas.includes(palavra));
    const categoriasMarcadas = [...filtros].filter(f => f.checked).map(f => f.value);

    const encontrados = [];

    paginas.forEach(pagina => {
        // Sem nenhuma categoria marcada, todas valem
        if (categoriasMarcadas.length > 0 && !categoriasMarcadas.includes(pagina.categoria)) {
            return;
        }

        // Cada palavra encontrada no título vale 2 pontos, e nas palavras-chave vale 1
        const palavrasTitulo = separarPalavras(pagina.titulo);
        const palavrasChave = separarPalavras(pagina.palavras);
        let pontos = 0;

        pesquisadas.forEach(palavra => {
            if (contemPalavra(palavrasTitulo, palavra)) {
                pontos += 2;
            } else if (contemPalavra(palavrasChave, palavra)) {
                pontos += 1;
            }
        });

        // Sem nada digitado mostra todas; com pesquisa, só as que acertaram alguma palavra
        if (pesquisadas.length === 0 || pontos > 0) {
            encontrados.push({ pagina, pontos });
        }
    });

    // Ordena pela pontuação, mantendo a ordem da lista quando empata
    encontrados.sort((a, b) => b.pontos - a.pontos);
    return encontrados.map(item => item.pagina);
}

// Monta a lista de resultados da página atual e atualiza os botões
function mostrarResultados() {
    const encontrados = buscar();
    const totalPaginas = Math.max(1, Math.ceil(encontrados.length / resultadosPorPagina));
    paginaAtual = Math.min(paginaAtual, totalPaginas - 1);

    listaResultados.innerHTML = "";

    if (encontrados.length === 0) {
        const aviso = document.createElement("li");
        aviso.className = "semResultado";
        aviso.textContent = "Nenhum problema encontrado. Tente outra palavra ou desmarque os filtros.";
        listaResultados.appendChild(aviso);
    }

    const inicio = paginaAtual * resultadosPorPagina;

    // A numeração dos resultados (01, 02...) continua de onde a página anterior parou
    listaResultados.style.counterReset = "resultado " + inicio;
    encontrados.slice(inicio, inicio + resultadosPorPagina).forEach(pagina => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = pagina.url;
        link.className = "itemResultado";
        link.textContent = pagina.titulo;

        // Etiqueta com a categoria ao lado do título
        const etiqueta = document.createElement("span");
        etiqueta.className = "categoriaResultado";
        etiqueta.textContent = nomesCategorias[pagina.categoria];
        link.appendChild(etiqueta);

        item.appendChild(link);
        listaResultados.appendChild(item);
    });

    botaoVoltar.disabled = paginaAtual === 0;
    botaoAvancar.disabled = paginaAtual >= totalPaginas - 1;
}

// Uma busca nova sempre começa da primeira página de resultados
function novaBusca() {
    paginaAtual = 0;
    mostrarResultados();
}

campoPesquisa.addEventListener("input", novaBusca);
filtros.forEach(filtro => filtro.addEventListener("change", novaBusca));

// Ao apertar Enter, abre o primeiro resultado em vez de recarregar a página
document.getElementById("formularioDigitacao").addEventListener("submit", evento => {
    evento.preventDefault();
    const primeiro = buscar()[0];
    if (primeiro) {
        window.location.href = primeiro.url;
    }
});

botaoVoltar.addEventListener("click", () => {
    paginaAtual--;
    mostrarResultados();
});

botaoAvancar.addEventListener("click", () => {
    paginaAtual++;
    mostrarResultados();
});

mostrarResultados();
