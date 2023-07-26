
let compromissos = [];
let obreiros = []; // Array para armazenar os obreiros
let avisos = [];
let compromissosOrganizados = {}; // Variável global para armazenar os compromissos organizados
let obreirosOrganizados = {};
let avisosOrganizados = {}; // Variável global para armazenar os avisos organizados
let index = -1;

let cabecalhoPDF = 'Congregação Cristã no Brasil';
let administracao = 'Vilhena';
let dataReuniao = 'Teste';

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

    compromissos.forEach((compromisso, index) => {
        const compromissoElement = document.createElement('div');
        compromissoElement.classList.add('compromisso-item');

        const compromissoDataHora = new Date(compromisso.dataHora);
        const compromissoDataHoraFormatted = `${compromissoDataHora.getDate()}/${compromissoDataHora.getMonth() + 1}/${compromissoDataHora.getFullYear()} ${compromissoDataHora.getHours().toString().padStart(2, '0')}:${compromissoDataHora.getMinutes().toString().padStart(2, '0')}`;

        const compromissoText = `<strong>${compromissoDataHoraFormatted}</strong> - ${compromisso.compromisso} (Anciao: ${compromisso.responsavel}) - Local: ${compromisso.local}`;

        compromissoElement.innerHTML = compromissoText;

        // Criar botões de editar e excluir
        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', () => editarCompromisso(index));

        const excluirButton = document.createElement('button');
        excluirButton.textContent = 'Excluir';
        excluirButton.addEventListener('click', () => excluirCompromisso(index));

        compromissoElement.appendChild(editarButton);
        compromissoElement.appendChild(excluirButton);

        listaCompromissos.appendChild(compromissoElement);
    });
}

function editarCompromisso(index) {
    const compromisso = compromissos[index];

    // Criar um formulário de edição para o compromisso selecionado
    const formEdicao = document.createElement('form');

    // Campo para editar o tipo de compromisso
    const compromissoSelect = document.createElement('select');
    compromissoSelect.setAttribute('id', 'compromissoEdicao');

    // Opção inicial desabilitada e selecionada
    const optionInicial = document.createElement('option');
    optionInicial.text = 'Selecione a missão';
    optionInicial.value = '';
    optionInicial.disabled = true;
    optionInicial.selected = true;
    compromissoSelect.appendChild(optionInicial);

    // Opções para o tipo de compromisso
    const tiposCompromisso = ['Batismo', 'Reunião Para Mocidade', 'Ensaio Regional', 'Santa Ceia', 'Reunião de Evangelização', 'Outro'];
    tiposCompromisso.forEach((tipo) => {
        const option = document.createElement('option');
        option.text = tipo;
        option.value = tipo;
        if (compromisso.compromisso === tipo) {
            option.selected = true;
        }
        compromissoSelect.appendChild(option);
    });
    formEdicao.appendChild(compromissoSelect);

    // Campo para editar a data e hora do compromisso
    const dataHoraInput = document.createElement('input');
    dataHoraInput.setAttribute('type', 'datetime-local');
    dataHoraInput.setAttribute('id', 'dataHoraEdicao');
    dataHoraInput.setAttribute('value', compromisso.dataHora);
    formEdicao.appendChild(dataHoraInput);

    // Campo para editar o responsável pelo compromisso
    const responsavelInput = document.createElement('input');
    responsavelInput.setAttribute('type', 'text');
    responsavelInput.setAttribute('id', 'responsavelEdicao');
    responsavelInput.setAttribute('value', compromisso.responsavel);
    formEdicao.appendChild(responsavelInput);

    // Campo para editar o local do compromisso
    const localInput = document.createElement('input');
    localInput.setAttribute('type', 'text');
    localInput.setAttribute('id', 'localEdicao');
    localInput.setAttribute('value', compromisso.local);
    formEdicao.appendChild(localInput);

    // Botão para salvar as alterações
    const salvarButton = document.createElement('button');
    salvarButton.textContent = 'Salvar';
    salvarButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Atualizar os dados do compromisso com as informações do formulário de edição
        compromisso.compromisso = compromissoSelect.options[compromissoSelect.selectedIndex].value;
        compromisso.dataHora = dataHoraInput.value;
        compromisso.responsavel = responsavelInput.value;
        compromisso.local = localInput.value;

        // Ordenar os compromissos novamente após a edição
        compromissos.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

        // Atualizar a lista de compromissos na página
        atualizarListaCompromissos();

        // Remover o formulário de edição após salvar as alterações
        formEdicao.remove();
    });
    formEdicao.appendChild(salvarButton);

    // Botão para cancelar a edição
    const cancelarButton = document.createElement('button');
    cancelarButton.textContent = 'Cancelar';
    cancelarButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Remover o formulário de edição sem salvar as alterações
        formEdicao.remove();
    });
    formEdicao.appendChild(cancelarButton);

    // Inserir o formulário de edição antes do compromisso na lista
    const compromissoElement = document.querySelector(`.compromisso-item:nth-child(${index + 1})`);
    compromissoElement.insertAdjacentElement('beforebegin', formEdicao);
}

function excluirCompromisso(index) {

    compromissos.splice(index, 1);


    atualizarListaCompromissos();
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

document.getElementById('atualizarCabecalho').addEventListener('click', function(event) {
    event.preventDefault();
    administracao = document.getElementById('localCabecalho').value;
    dataReuniao = document.getElementById('dataCabecalho').value;

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
        // Inserir avisos no PDF apenas se houver pelo menos um aviso cadastrado
        if (avisos.length > 0) {
            const avisosTableData = {
                widths: [241],
                body: []
            };
    
            avisosTableData.body.push([{ text: 'Avisos', style: 'tipoCompromissoTitle', alignment: 'center' }]);
    
            avisos.forEach((aviso) => {
                avisosTableData.body.push([{ text: aviso.aviso, style: 'compromissoItem' }]);
            });
    
            colunas[0].stack.push({ table: JSON.parse(JSON.stringify(avisosTableData)), alignment: 'center' });
            colunas[1].stack.push({ table: JSON.parse(JSON.stringify(avisosTableData)), alignment: 'center' });
            colunas[0].stack.push({ text: '', margin: [0, 5] });
            colunas[1].stack.push({ text: '', margin: [0, 5] });
        }
    
        colunas[0].stack.unshift({ text: dataReuniao, alignment: 'center', fontSize: 12, bold: true, margin: [0, 0] });
        colunas[0].stack.unshift({ text: administracao, alignment: 'center', fontSize: 12, bold: true, margin: [0, 0] });
        colunas[0].stack.unshift({ text: cabecalhoPDF, alignment: 'center', fontSize: 14, bold: true, margin: [0, 1] });
        colunas[1].stack.unshift({ text: dataReuniao, alignment: 'center', fontSize: 12, bold: true, margin: [0, 0] });
        colunas[1].stack.unshift({ text: administracao, alignment: 'center', fontSize: 12, bold: true, margin: [0, 0] });
        colunas[1].stack.unshift({ text: cabecalhoPDF, alignment: 'center', fontSize: 14, bold: true, margin: [0, 1] });
        
        docDefinition.content.push({ columns: colunas });
    
        pdfMake.createPdf(docDefinition).download('compromissos_organizados.pdf');
}


document.addEventListener('DOMContentLoaded', function() {
    atualizarListaCompromissos();
});

document.getElementById('salvarDados').addEventListener('click', function() {
    salvarDados();
});

// Função para salvar os dados em um arquivo JSON
function salvarDados() {
    const dados = {
        compromissos: compromissos,
        obreiros: obreiros,
        avisos: avisos
    };

    const dadosJson = JSON.stringify(dados, null, 2);

    const blob = new Blob([dadosJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('carregarDadosBtn').addEventListener('click', function() {
    document.getElementById('carregarDados').click();
});

document.getElementById('carregarDados').addEventListener('change', function(event) {
    carregarDados(event);
});
// Função para carregar os dados de um arquivo JSON
function carregarDados(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const dadosJson = e.target.result;
        const dadosCarregados = JSON.parse(dadosJson);

        compromissos = dadosCarregados.compromissos || [];
        obreiros = dadosCarregados.obreiros || [];
        avisos = dadosCarregados.avisos || [];

        // Atualizar as listas com os dados carregados
        atualizarListaCompromissos();
        atualizarListaObreiros();
        atualizarListaAvisos();
    };

    reader.readAsText(file);
}


