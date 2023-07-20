let compromissos = [];
let compromissosOrganizados = {}; // Variável global para armazenar os compromissos organizados

document.getElementById('compromissoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const compromissoSelect = document.getElementById('compromisso');
    const compromisso = compromissoSelect.options[compromissoSelect.selectedIndex].value;
    const data = document.getElementById('data').value;
    const responsavel = document.getElementById('anciao').value;
    const local = document.getElementById('local').value;

    const novoCompromisso = {
        compromisso,
        data,
        responsavel,
        local
    };

    compromissos.push(novoCompromisso);

    // Ordenar os compromissos por data antes de limpar o formulário
    compromissos.sort((a, b) => new Date(a.data) - new Date(b.data));

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

        const compromissoData = new Date(compromisso.data);
        const compromissoDataFormatted = `${compromissoData.getDate()}/${compromissoData.getMonth() + 1}/${compromissoData.getFullYear()}`;

        compromissoElement.innerHTML = `
            <strong>${compromissoDataFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}
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

            const compromissoData = new Date(compromisso.data);
            const compromissoDataFormatted = `${compromissoData.getDate()}/${compromissoData.getMonth() + 1}/${compromissoData.getFullYear()}`;

            compromissoElement.innerHTML = `
                <strong>${compromissoDataFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}
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
    const cabecalho = document.getElementById('cabecalho').value; // Obtém o valor do campo de cabeçalho
    const docDefinition = {
        header: cabecalho || '', // Utiliza o cabeçalho digitado ou uma string vazia se não houver cabeçalho
        content: [],
        styles: {
            tipoCompromissoTitle: {
                fontSize: 18,
                bold: true,
                margin: [0, 10]
            },
            compromissoItem: {
                fontSize: 12,
                margin: [0, 5]
            }
        }
    };

    for (const tipoCompromisso in compromissosOrganizados) {
        const compromissosDoTipo = compromissosOrganizados[tipoCompromisso];
        const tipoCompromissoTitle = { text: tipoCompromisso, style: 'tipoCompromissoTitle' };
        docDefinition.content.push(tipoCompromissoTitle);

        compromissosDoTipo.forEach(compromisso => {
            const compromissoData = new Date(compromisso.data);
            const compromissoDataFormatted = `${compromissoData.getDate()}/${compromissoData.getMonth() + 1}/${compromissoData.getFullYear()}`;

            const linhaTexto = `${compromissoDataFormatted} - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}`;

            docDefinition.content.push({ text: linhaTexto, style: 'compromissoItem' });
        });

        // Adiciona um espaço entre os tipos de compromissos
        docDefinition.content.push({ text: '', margin: [0, 10] });
    }

    pdfMake.createPdf(docDefinition).download('compromissos_organizados.pdf');
}
