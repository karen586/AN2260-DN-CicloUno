document.addEventListener('DOMContentLoaded', function () {

    //Seleccionar los elementos de la interfaz
    const inputNombre = this.documentElement.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#boton');
    const alertaExito = document.querySelector('#alertaExito');

    const objeto = {
        nombre: '',
        email: ''
    }

    let alerta = true;

    inputNombre.addEventListener('input', validar);

    inputEmail.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarFormulario);

    btnSubmit.addEventListener('clic', function (e) {
        e.preventDefault();
    })


    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
            objeto[e.target.name] = '';
            comprobarCampos();
            return;
        }

        if (e.target.id === 'nombre' && isNaN(e.target.value.trim()) === false) {
            mostrarAlerta(`El campo ${e.target.id} debe ser texto.`, e.target.parentElement);
            objeto[e.target.name] = '';
            comprobarCampos();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido.', e.target.parentElement);
            objeto[e.target.name] = '';
            comprobarCampos();
            return;
        }

        alerta = limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        objeto[e.target.name] = e.target.value.trim();

        //Comprobar objeto
        comprobarCampos();
    }

    function mostrarAlerta(mensaje, referencia) {
        //Eliminar alerta existente
        limpiarAlerta(referencia);

        //Generar una alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-danger', 'p-1', 'text-light', 'text-center', 'mt-2', 'rounded');
        referencia.appendChild(error);
    }


    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-danger');
        if (alerta) {
            alerta.remove();
            return true;
        }

        return false;
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado = regex.test(email);

        return resultado;
    }

    function comprobarCampos(alerta) {

        if (Object.values(objeto).includes('')) {
            btnSubmit.disabled = true;
        } else {
            btnSubmit.disabled = false;
        }

    }

    function enviarFormulario(e) {
        e.preventDefault();

        setTimeout(() => {
            //Mensajede enviado
            const alertaEnvio = document.createElement('P');
            alertaEnvio.textContent = 'Datos enviados correctamente';
            alertaEnvio.classList.add('bg-success', 'p-1', 'text-light', 'text-center', 'mt-2', 'rounded');
            alertaExito.appendChild(alertaEnvio);

            //Limpiar formulario
            resetFormulario();

            setTimeout(() => {
                alertaEnvio.remove();
            }, 3000);


        }, 1000);
    }


    function resetFormulario() {
        objeto.nombre = '';
        objeto.email = '';

        formulario.reset();

        comprobarCampos();
    }


});
