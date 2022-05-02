console.log("Hola mundo")

let produtosSeleccionados = [];

document.getElementById('Pedidos').addEventListener('change', (event) => {
    let pedido = $('.Pedidos option:selected').val();
});
document.getElementById('btn_agregar').addEventListener('click', function () {
    let pedido = $('.Pedidos option:selected').val();
    document.getElementById('txt_pedido').innerHTML += '<p id="producto_seleccionado">' + pedido + '</p>'
    produtosSeleccionados.push(pedido);
})

document.getElementById('btn_eliminar').addEventListener('click', function () {
    $('#txt_pedido').children().last().remove()
    produtosSeleccionados.splice(produtosSeleccionados.length - 1);
})

let tiempo_preparacion = 0;
let precio = 0;
let tiempo_prom = 0;

document.getElementById('btn_simular').addEventListener('click', function () {
    console.log(document.getElementById('input_llegada').value)
    if (document.getElementById('input_llegada').value == '') {

        tiempo_preparacion = 0;
        let contador = 0;
        tiempo_prom = 0;
        let servidor = $('.Servidores option:selected').val();
        console.log(servidor);
        document.getElementById('txt_servidor').innerHTML = '<p id="producto_seleccionado">' + servidor + '</p>'
        for (let i = 0; i < produtosSeleccionados.length; i++) {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/producto/" + produtosSeleccionados[i],
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $('#Table > tbody').empty();
                    $.each(data, function (i, item) {
                        contador++
                        if (servidor == 'servidor2') {
                            console.log('servidor2')
                            tiempo_preparacion += parseInt(item.tiempo_preparacion, 10);


                        } else if (servidor == 'servidor3') {
                            console.log('servidor3')
                            tiempo_preparacion += parseInt(item.tiempo_preparacion, 10) - 2
                        } else if (servidor == 'servidor4') {
                            console.log('servidor4')
                            tiempo_preparacion += parseInt(item.tiempo_preparacion, 10) - 3
                        } else if (servidor == 'none') {
                            alert('Seleccione la cantidad de servidores')
                        }

                        precio = item.precio;
                        console.log(tiempo_preparacion);
                        console.log(precio);
                    });
                    tiempo_prom = tiempo_preparacion / contador;
                    console.log(data);
                    console.log(tiempo_prom);
                },
                failure: function (data) {
                    alert(data.responseText);
                },
                error: function (data) {
                    alert(data.responseText);
                }
            });
        }

    } else {
        let tasa_servicio = 0;
        let tasa_llegada = parseInt(document.getElementById('input_llegada').value, 10)
        if (tasa_llegada >= 50) {
            alert('El sistema no soporta la tasa de llegada ingresada')
        } else {
            let servidor = $('.Servidores option:selected').val();
            if (servidor == 'servidor2') {
                tasa_servicio = 30;

            } else if (servidor == 'servidor3') {
                tasa_servicio = 45;
        
            } else if (servidor == 'servidor4') {
                tasa_servicio = 50;

            } else if (servidor == 'none') {
                alert('Seleccione los servidores')
            }

            let num_promedio_cola = Math.round(Math.pow(tasa_llegada,2)/((tasa_servicio)*(tasa_servicio-tasa_llegada)))
            console.log(num_promedio_cola)
            let tiempo_prom_cola = ((Math.pow(tasa_llegada,2)/((tasa_servicio)*(tasa_servicio-tasa_llegada)))/(tasa_llegada)).toFixed(2)
            console.log(tiempo_prom_cola)
            let prob_persona_servicio = (tasa_llegada/tasa_servicio).toFixed(2)
            console.log(prob_persona_servicio)

        }


    }


})