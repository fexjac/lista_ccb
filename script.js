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
