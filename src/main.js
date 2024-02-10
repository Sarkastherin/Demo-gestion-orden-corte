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
    event.preventDefault()
    const description = document.getElementById('descripcion');
    if(description.value==""){
        alert('debe completar todos los campos')
    }
    else{
      openModal(LoadTitle, LoadMessage_1);
      setTimeout(() => {
        closeModal();
        openModal(SuccessTitle, SuccessMessage_1);
        form.reset();
        form.classList.remove('was-validated')
      },2000);
      //
    }
    
  }
  async function searchCode(event) {
    const code = document.getElementById('codigo');
    const description = document.getElementById('descripcion');
    description.value =''
    description.classList.add('placeholder')
    let pieza;
    try {
        let response = await fetch('./Data/dataPieza.json');
        let data = await response.json();
        let isPieza = data.some(item => item.codigo === code.value);
        if (isPieza) {
            pieza = data.find(item => item.codigo === code.value);
            description.value = `✔️ ${pieza.descripcion}`;
            description.classList.remove('placeholder')
        }
        else {
            openModal(ErrorTitle, ErrorMessage_1)
        }
    } catch (e) {
        console.log(e)
    }
  }
  function openModal(title, bodyHTML) {
    // Pasar el elemento HTML y no el selector
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    const ModalTitle = document.querySelector('.modal-title');
    const ModalBody = document.querySelector('.modal-body');
    ModalTitle.innerText = title;
    ModalBody.innerHTML = bodyHTML
    myModal.show()
  }
  function closeModal() {
    var modalElement = document.getElementById('myModal');
    var modal = bootstrap.Modal.getInstance(modalElement); // Obtener la instancia del modal
    if (modal) {
      modal.hide(); // Ocultar el modal si existe una instancia
    }
  }
  
  const ErrorTitle = '❌ Error'
  const ErrorMessage_1 = 'La pieza no ha sido encontrada, verifique la información'
  const SuccessTitle = '✔️ Solicitud enviada'
  const SuccessMessage_1 = 'El formulario ha sido enviado, se ha notificado 📧 al encargado para su procesamiento'
  const LoadTitle = '⌛ Procesando solicitud'
  const LoadMessage_1 = 'Se está procesando la solicitud, espere por favor'
  