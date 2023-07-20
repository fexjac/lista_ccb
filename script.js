let compromissos = [];

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
    // Gerar a lista em PDF posteriormente
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

function organizarCompromissosPorTipoEData() {
    // Organizar os compromissos por tipo e data
    const compromissosOrganizados = {};
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