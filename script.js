let compromissos = [];
let compromissosOrganizados = {}; // Variável global para armazenar os compromissos organizados
let cabecalhoPDF = 'Congregação Cristã no Brasil';

document.getElementById('compromissoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const compromissoSelect = document.getElementById('compromisso');
    const compromisso = compromissoSelect.options[compromissoSelect.selectedIndex].value;
    const dataHora = document.getElementById('data').value;
    const responsavel = document.getElementById('anciao').value;
    const local = document.getElementById('local').value;

    const novoCompromisso = {
        compromisso,
        dataHora,
        responsavel,
        local
    };

    compromissos.push(novoCompromisso);

    // Ordenar os compromissos por data e hora antes de limpar o formulário
    compromissos.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

    // Limpar o formulário após adicionar o compromisso
    document.getElementById('compromissoForm').reset();

    // Exibir a lista de compromissos após adicionar um novo
    atualizarListaCompromissos();
});

document.getElementById('gerarPDF').addEventListener('click', function() {
    gerarPDFCompromissos();
});

function atualizarListaCompromissos() {
    const listaCompromissos = document.getElementById('listaCompromissos');
    listaCompromissos.innerHTML = '';

    compromissos.forEach(compromisso => {
        const compromissoElement = document.createElement('div');
        compromissoElement.classList.add('compromisso-item');

        const compromissoDataHora = new Date(compromisso.dataHora);
        const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

        compromissoElement.innerHTML = `
            <strong>${compromissoDataHoraFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}
        `;

        listaCompromissos.appendChild(compromissoElement);
    });
}

document.getElementById('organizarBtn').addEventListener('click', function() {
    organizarCompromissosPorTipoEData();
});

// ordenando e organizando a lista de compromissos
function organizarCompromissosPorTipoEData() {
    // Organizar os compromissos por tipo e data
    compromissosOrganizados = {}; // Limpar a variável antes de organizar os compromissos

    compromissos.forEach(compromisso => {
        if (!compromissosOrganizados[compromisso.compromisso]) {
            compromissosOrganizados[compromisso.compromisso] = [];
        }
        compromissosOrganizados[compromisso.compromisso].push(compromisso);
    });

    // Limpar a lista de compromissos antes de exibir a lista organizada
    document.getElementById('listaCompromissos').innerHTML = '';

    // Exibir a lista de compromissos organizados por tipo e data
    for (const tipoCompromisso in compromissosOrganizados) {
        const compromissosDoTipo = compromissosOrganizados[tipoCompromisso];
        const tipoCompromissoElement = document.createElement('div');
        tipoCompromissoElement.classList.add('compromissos-tipo');

        const tipoCompromissoTitle = document.createElement('h3');
        tipoCompromissoTitle.textContent = tipoCompromisso;
        tipoCompromissoElement.appendChild(tipoCompromissoTitle);

        compromissosDoTipo.forEach(compromisso => {
            const compromissoElement = document.createElement('div');
            compromissoElement.classList.add('compromisso-item');

            const compromissoDataHora = new Date(compromisso.dataHora);
            const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

            compromissoElement.innerHTML = `
                <strong>${compromissoDataHoraFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}
            `;

            tipoCompromissoElement.appendChild(compromissoElement);
        });

        document.getElementById('listaCompromissos').appendChild(tipoCompromissoElement);
    }
}


// Gerar PDF
document.getElementById('gerarPDF').addEventListener('click', function() {
    gerarPDFCompromissos();
});

function gerarPDFCompromissos() {
    const docDefinition = {
        content: []
    };

    compromissos.forEach(compromisso => {
        const compromissoData = new Date(compromisso.data);
        const compromissoDataFormatted = `${compromissoData.getDate()}/${compromissoData.getMonth() + 1}/${compromissoData.getFullYear()}`;

        const linhaTexto = `${compromissoDataFormatted} - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}`;

        docDefinition.content.push({ text: linhaTexto });
    });

    pdfMake.createPdf(docDefinition).download('compromissos.pdf');
}

// Gerar PDF organizado
document.getElementById('gerarPDFOrganizado').addEventListener('click', function() {
    gerarPDFCompromissosOrganizados();
});

// Função para gerar o PDF organizado
function gerarPDFCompromissosOrganizados() {
    const docDefinition = {
        header: cabecalhoPDF, // Utiliza o valor do cabeçalho armazenado na variável global
        content: [],
        styles: {
            tipoCompromissoTitle: {
                fontSize: 18,
                bold: true,
                margin: [0, 10]
            },
            compromissoItem: {
                fontSize: 10, // Altera o tamanho da fonte para 10
                margin: [0, 5]
            }
        }
    };

    for (const tipoCompromisso in compromissosOrganizados) {
        const compromissosDoTipo = compromissosOrganizados[tipoCompromisso];
        
        // Criação de tabelas para alinhar os dados
        const tableData = {
            widths: ['auto', 'auto', 'auto'], // Define as larguras das colunas da tabela
            body: []
        };

        // Adiciona o título do tipo de compromisso como uma célula acima da tabela
        tableData.body.push([{ text: tipoCompromisso, colSpan: 3, style: 'tipoCompromissoTitle', alignment: 'center' }, {}, {}]);
        
        // Cabeçalho da tabela com os títulos "Data", "Local" e "Ancião"
        tableData.body.push([
            { text: 'Data', style: 'compromissoItem', bold: true },
            { text: 'Local', style: 'compromissoItem', bold: true },
            { text: 'Ancião', style: 'compromissoItem', bold: true }
        ]);

        compromissosDoTipo.forEach((compromisso) => {
            const compromissoDataHora = new Date(compromisso.dataHora);
            const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

            // Adiciona uma linha à tabela para cada compromisso
            tableData.body.push([
                { text: compromissoDataHoraFormatted, style: 'compromissoItem' },
                { text: compromisso.local, style: 'compromissoItem' },
                { text: compromisso.responsavel, style: 'compromissoItem' }
            ]);
        });

        // Adiciona a tabela ao conteúdo do PDF
        docDefinition.content.push({ table: tableData, alignment: 'center' });

        // Adiciona um espaço entre os tipos de compromissos
        docDefinition.content.push({ text: '', margin: [0, 10] });
    }

    pdfMake.createPdf(docDefinition).download('compromissos_organizados.pdf');
}

// Evento de clique para o botão "Salvar Lista"
document.getElementById('salvarLista').addEventListener('click', function() {
    salvarListaCompromissos();
});

// Função para salvar a lista de compromissos em um arquivo
function salvarListaCompromissos() {
    // Obtém todo o conteúdo da página principal (incluindo o formulário e botões)
    const paginaCompleta = document.documentElement.outerHTML;

    // Cria um objeto Blob com o conteúdo da página
    const blob = new Blob([paginaCompleta], { type: 'text/html' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pagina_principal.html';

    // Clica no link para iniciar o download
    link.click();
}