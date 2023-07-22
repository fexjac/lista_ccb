let compromissos = [];
let obreiros = []; // Array para armazenar os obreiros
let avisos = [];
let compromissosOrganizados = {}; // Variável global para armazenar os compromissos organizados
let obreirosOrganizados = {};
let avisosOrganizados = {}; // Variável global para armazenar os avisos organizados


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

function atualizarListaCompromissos() {
    const listaCompromissos = document.getElementById('listaCompromissos');
    listaCompromissos.innerHTML = '';

    compromissos.forEach(compromisso => {
        const compromissoElement = document.createElement('div');
        compromissoElement.classList.add('compromisso-item');

        const compromissoDataHora = new Date(compromisso.dataHora);
        const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

        const compromissoText = `<strong>${compromissoDataHoraFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}`;
        
        compromissoElement.innerHTML = compromissoText;
        listaCompromissos.appendChild(compromissoElement);
    });
}

document.getElementById('obreiroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const ministerioSelect = document.getElementById('ministerio');
    const ministerio = ministerioSelect.options[ministerioSelect.selectedIndex].value;
    const nomeObreiro = document.getElementById('nomeObreiro').value;
    const localObreiro = document.getElementById('localObreiro').value;

    const novoObreiro = {
        ministerio,
        nomeObreiro,
        localObreiro
    };

    obreiros.push(novoObreiro);

    // Limpar o formulário após adicionar o obreiro
    document.getElementById('obreiroForm').reset();

    // Exibir a lista de obreiros após adicionar um novo
    atualizarListaObreiros();
});

function atualizarListaObreiros() {
    const listaObreiros = document.getElementById('listaObreiros');
    listaObreiros.innerHTML = '';

    obreiros.forEach(obreiro => {
        const obreiroElement = document.createElement('div');
        obreiroElement.classList.add('obreiro-item');

        let obreiroText = `<strong>Ministério:</strong> ${obreiro.ministerio}, <strong>Nome:</strong> ${obreiro.nomeObreiro}, <strong>Local:</strong> ${obreiro.localObreiro}`;

        obreiroElement.innerHTML = obreiroText;
        listaObreiros.appendChild(obreiroElement);
    });
}

document.getElementById('avisoForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const aviso = document.getElementById('aviso').value;
  
    const novoAviso = {
      aviso
    };
  
    avisos.push(novoAviso);
  
    // Limpar o formulário após adicionar o aviso
    document.getElementById('avisoForm').reset();
  
    // Exibir a lista de avisos após adicionar um novo
    atualizarListaAvisos();
  });
  
  function atualizarListaAvisos() {
    const listaAvisos = document.getElementById('listaAvisos');
    listaAvisos.innerHTML = '';
  
    avisos.forEach(aviso => {
      const avisoElement = document.createElement('div');
      avisoElement.classList.add('aviso-item');
  
      const avisoText = `<strong>Aviso:</strong> ${aviso.aviso}`;
      avisoElement.innerHTML = avisoText;
      listaAvisos.appendChild(avisoElement);
    });
  }
  

document.getElementById('gerarPDF').addEventListener('click', function() {
    gerarPDFCompromissos();
});

document.getElementById('gerarPDFOrganizado').addEventListener('click', function() {
    gerarPDFCompromissosOrganizados();
});



document.getElementById('organizarBtn').addEventListener('click', function() {
    organizarCompromissosPorTipoEData();
    organizarObreirosPorMinisterio();
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

function organizarObreirosPorMinisterio() {
    obreirosOrganizados = {}; // Reiniciando a variável antes de organizar novamente os obreiros

    obreiros.forEach(obreiro => {
        if (!obreirosOrganizados[obreiro.ministerio]) {
            obreirosOrganizados[obreiro.ministerio] = [];
        }
        obreirosOrganizados[obreiro.ministerio].push(obreiro);
    });

    // Limpar a lista de obreiros antes de exibir a lista organizada
    document.getElementById('listaObreiros').innerHTML = '';

    // Exibir a lista de obreiros organizados por ministério
    for (const ministerio in obreirosOrganizados) {
        const obreirosDoMinisterio = obreirosOrganizados[ministerio];
        const ministerioElement = document.createElement('div');
        ministerioElement.classList.add('ministerio-container');

        const ministerioTitle = document.createElement('h3');
        ministerioTitle.textContent = ministerio;
        ministerioElement.appendChild(ministerioTitle);

        obreirosDoMinisterio.forEach(obreiro => {
            const obreiroElement = document.createElement('div');
            obreiroElement.classList.add('obreiro-item');

            let obreiroText = `<strong>Ministério:</strong> ${obreiro.ministerio}, <strong>Nome:</strong> ${obreiro.nomeObreiro}, <strong>Local:</strong> ${obreiro.localObreiro}`;

            obreiroElement.innerHTML = obreiroText;
            ministerioElement.appendChild(obreiroElement);
        });

        document.getElementById('listaObreiros').appendChild(ministerioElement);
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
        const compromissoDataHora = new Date(compromisso.dataHora);
        const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

        const linhaTexto = `${compromissoDataHoraFormatted} - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}`;

        docDefinition.content.push({ text: linhaTexto });
    });

    pdfMake.createPdf(docDefinition).download('compromissos.pdf');
}

// Gerar PDF organizado

document.getElementById('gerarPDFOrganizado').addEventListener('click', function() {
    gerarPDFCompromissosOrganizados();
});

function gerarPDFCompromissosOrganizados() {
    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [],
        styles: {
            tipoCompromissoTitle: {
                fontSize: 11,
                bold: true,
                margin: [0, 2],
                fillColor: '#CCCCCC'
            },
            compromissoItem: {
                fontSize: 9,
                margin: [0, 2]
            }
        }
    };

    const colunas = [{ stack: [] }, { stack: [] }];

    // Inserir compromissos organizados no PDF
    for (const tipoCompromisso in compromissosOrganizados) {
        const compromissosDoTipo = compromissosOrganizados[tipoCompromisso];
        const compromissosTableData = {
            widths: [69, 90, 65],
            body: []
        };

        compromissosTableData.body.push([{ text: tipoCompromisso, colSpan: 3, style: 'tipoCompromissoTitle', alignment: 'center' }, {}, {}]);
        compromissosTableData.body.push([
            { text: 'Data', style: 'compromissoItem', bold: true },
            { text: 'Local', style: 'compromissoItem', bold: true },
            { text: 'Ancião', style: 'compromissoItem', bold: true }
        ]);

        compromissosDoTipo.forEach((compromisso) => {
            const compromissoDataHora = new Date(compromisso.dataHora);
            const diaSemanaAbreviado = compromissoDataHora.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase();
            const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1} ${diaSemanaAbreviado} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

            compromissosTableData.body.push([
                { text: compromissoDataHoraFormatted, style: 'compromissoItem' },
                { text: compromisso.local, style: 'compromissoItem' },
                { text: compromisso.responsavel, style: 'compromissoItem' }
            ]);
        });

        colunas[0].stack.push({ table: JSON.parse(JSON.stringify(compromissosTableData)), alignment: 'center' });
        colunas[1].stack.push({ table: JSON.parse(JSON.stringify(compromissosTableData)), alignment: 'center' });
        colunas[0].stack.push({ text: '', margin: [0, 5] });
        colunas[1].stack.push({ text: '', margin: [0, 5] });
    }

    // Inserir obreiros organizados no PDF
    for (const ministerio in obreirosOrganizados) {
        const obreirosDoMinisterio = obreirosOrganizados[ministerio];
        const obreirosTableData = {
            widths: [115, 118],
            body: []
        };

        obreirosTableData.body.push([{ text: ministerio, colSpan: 2, style: 'tipoCompromissoTitle', alignment: 'center' }, {}]);
        obreirosTableData.body.push([
            { text: 'Nome', style: 'compromissoItem', bold: true },
            { text: 'Local', style: 'compromissoItem', bold: true },
        ]);

        obreirosDoMinisterio.forEach((obreiro) => {
            obreirosTableData.body.push([
                { text: obreiro.nomeObreiro, style: 'compromissoItem' },
                { text: obreiro.localObreiro, style: 'compromissoItem' }
            ]);
        });

        colunas[0].stack.push({ table: JSON.parse(JSON.stringify(obreirosTableData)), alignment: 'center' });
        colunas[1].stack.push({ table: JSON.parse(JSON.stringify(obreirosTableData)), alignment: 'center' });
        colunas[0].stack.push({ text: '', margin: [0, 5] });
        colunas[1].stack.push({ text: '', margin: [0, 5] });
    }

    // Inserir avisos no PDF
    const avisosTableData = {
        widths: [241],
        body: []
    };

    avisosTableData.body.push([{ text: 'Avisos', style: 'tipoCompromissoTitle', alignment: 'center' }]);
    avisosTableData.body.push([{ text: '' }]); // Empty row

    avisos.forEach((aviso) => {
        avisosTableData.body.push([{ text: aviso.aviso, style: 'compromissoItem' }]);
    });

    colunas[0].stack.push({ table: JSON.parse(JSON.stringify(avisosTableData)), alignment: 'center' });
    colunas[1].stack.push({ table: JSON.parse(JSON.stringify(avisosTableData)), alignment: 'center' });
    colunas[0].stack.push({ text: '', margin: [0, 5] });
    colunas[1].stack.push({ text: '', margin: [0, 5] });

    colunas[0].stack.unshift({ text: cabecalhoPDF, alignment: 'center', fontSize: 14, bold: true, margin: [0, 5] });
    colunas[1].stack.unshift({ text: cabecalhoPDF, alignment: 'center', fontSize: 14, bold: true, margin: [0, 5] });

    docDefinition.content.push({ columns: colunas });

    console.log(colunas[0].stack);
    console.log(colunas[1].stack);

    pdfMake.createPdf(docDefinition).download('compromissos_organizados.pdf');
}


document.addEventListener('DOMContentLoaded', function() {
    atualizarListaCompromissos();
});
