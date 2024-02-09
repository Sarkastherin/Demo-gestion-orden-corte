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
    event.preventDefault()
    const description = document.getElementById('descripcion');
    if(description.value==""){
        alert('debe completar todos los campos')
    }
    else{
        console.log('Enviando formulario')
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
            description.value = pieza.descripcion;
            description.classList.remove('placeholder')
        }
        else {
            alert('Pieza no encontrada')
        }
        console.log(pieza)
    } catch (e) {
        console.log(e)
    }
    console.log(code.value)
  }