async function obtenerNombresPaises() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Error al obtener los países.');
    }
    const data = await response.json();
    return data.map(pais => pais.name.common);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function obtenerDetallesPais(nombrePais) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${nombrePais}`);
    if (!response.ok) {
      throw new Error('Error al obtener detalles del país.');
    }
    const [data] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function mostrarDetalles(nombrePais, index) {
  const detallesPaisDiv = document.getElementById('detallesPais');
  

  const elementosPaises = document.querySelectorAll('.nombre-pais');
  elementosPaises.forEach(elemento => {
    elemento.classList.remove('seleccionado');
  });
  const paisSeleccionado = document.getElementById(`pais-${index}`);
  paisSeleccionado.classList.add('seleccionado');


  const detallesPais = await obtenerDetallesPais(nombrePais);
  if (detallesPais) {
    detallesPaisDiv.innerHTML = '<h3>Detalles del país seleccionado:</h3>';
    detallesPaisDiv.innerHTML += `<p><strong>Nombre:</strong> ${detallesPais.name.common}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Capital:</strong> ${detallesPais.capital}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Población:</strong> ${detallesPais.population}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Área:</strong> ${detallesPais.area} km²</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Región:</strong> ${detallesPais.region}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Subregión:</strong> ${detallesPais.subregion}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Idiomas:</strong> ${Object.values(detallesPais.languages).join(', ')}</p>`;
    const monedas = Object.values(detallesPais.currencies).map(moneda => moneda.name).join(', ');
    detallesPaisDiv.innerHTML += `<p><strong>Monedas:</strong> ${monedas}</p>`;
    detallesPaisDiv.innerHTML += `<p><strong>Bandera:</strong> <img src="${detallesPais.flags.png}" alt="Bandera de ${detallesPais.name.common}" style="max-width: 100px;"></p>`;

  } else {
    detallesPaisDiv.innerHTML = '<p>No se encontraron detalles para el país seleccionado.</p>';
  }
}

async function main() {
  const listaPaisesDiv = document.getElementById('listaPaises');
  const detallesPaisDiv = document.getElementById('detallesPais');

  const listaPaises = await obtenerNombresPaises();

  if (listaPaises.length > 0) {
    listaPaisesDiv.innerHTML = '<h3>Lista de países disponibles:</h3>';
    listaPaises.forEach((pais, index) => {
      const paisElemento = document.createElement('p');
      paisElemento.textContent = `${index + 1}. ${pais}`;
      paisElemento.classList.add('nombre-pais');
      paisElemento.id = `pais-${index}`;

      paisElemento.addEventListener('click', async () => {
        await mostrarDetalles(pais, index);
      });

      listaPaisesDiv.appendChild(paisElemento);
    });
  } else {
    listaPaisesDiv.innerHTML = '<p>No se pudo obtener la lista de países.</p>';
  }
}

main();