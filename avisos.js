let avisos = [];

export function atualizarListaAvisos() {
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