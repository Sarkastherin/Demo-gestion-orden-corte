let Piezas;
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
            sendForm(event)
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  function sendForm(event) {
    let form = document.querySelector('form')
    event.preventDefault();
    const pieza = document.getElementById('pieza');
    pieza.classList.remove('alert')
    if(pieza.value == ''){
      openModal(ErrorTitle, ErrorMessage_1);
      pieza.classList.add('alert')
    }
    else {
      openModal(LoadTitle, LoadMessage_1);
      setTimeout(() => {
        closeModal();
        openModal(SuccessTitle, SuccessMessage_1);
        form.reset();
        form.classList.remove('was-validated')
      },2000);
    }
    
  }
  async function openModalPiezas(event){
    const myModal = new bootstrap.Modal(document.getElementById('modalPiezas'));
    myModal.show();
    try{
      let response = await fetch('./Data/dataPieza.json');
      Piezas = await response.json();
      loadPiezas(Piezas)
    }catch (e) {
      console.log(e)
    }
  }
  function loadPiezas(data) {
    const listModal = document.getElementById('listModal');
    listModal.innerHTML = '';
    data.map(item => {
      listModal.innerHTML += `
      <li 
        class="btn btn-pieza btn-sm" 
        title="${item.descripcion}"
        onclick="getPieza(event)"
        id="${item.codigo}">
        ${item.descripcion}
      </li>
      `
    })
  }
  function filter(event) {
    let word = normalizeString(event.target.value);
    let piezasFilter = Piezas.filter((item) => {
      if (item.descripcion) {
        let normalizedItemName = normalizeString(item.descripcion);
        return normalizedItemName.includes(word);
      }
    });
    loadPiezas(piezasFilter)
  }
  function getPieza(event) {
    const pieza = event.target.title;
    const inputPieza = document.getElementById('pieza');
    inputPieza.value = pieza;
    let modalElement = document.getElementById('modalPiezas');
    let modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
    modal.hide()
    
  }
  function normalizeString(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
  
  function openModal(title, bodyHTML) {
    // Pasar el elemento HTML y no el selector
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const ModalTitle = document.querySelector('#myModalTitle');
    const ModalBody = document.querySelector('#myModalBody');
    ModalTitle.innerText = title;
    ModalBody.innerHTML = bodyHTML
    myModal.show()
  }
  function closeModal() {
    let modalElement = document.getElementById('myModal');
    let modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
    if (modal) {
      modal.hide(); // Ocultar el modal si existe una instancia
    }
  }
  
  const ErrorTitle = '❌ Error'
  const ErrorMessage_1 = '<p>Debe seleccionar una pieza</p>'
  const SuccessTitle = '✔️ Solicitud enviada'
  const SuccessMessage_1 = 'El formulario ha sido enviado, se ha notificado 📧 al encargado para su procesamiento'
  const LoadTitle = '⌛ Procesando solicitud'
  const LoadMessage_1 = '<p>Se está procesando la solicitud, espere por favor</p>'
  