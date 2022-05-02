console.log("Hola mundo")

let produtosSeleccionados = [];
let labels = [];
let dataDatos = [];
let resulservidor2 = 0
let resulservidor3 = 0
let resulservidor4 = 0

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

document.getElementById('btn_reiniciar').addEventListener('click', function () {
    location.reload();
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
                        resulservidor2 += parseInt(item.tiempo_preparacion, 10)
                        resulservidor3 += parseInt(item.tiempo_preparacion, 10) - 2
                        resulservidor4 += parseInt(item.tiempo_preparacion, 10) - 3 
                        precio = item.precio;
                        console.log(tiempo_preparacion);
                        console.log(precio);
                    });
                    tiempo_prom = (tiempo_preparacion / contador).toFixed(2);
                    console.log(data);
                    document.getElementById('resultado_pedido').innerHTML = '<p id="resultado"> <b>Tiempo promedio: ' + tiempo_prom + ' minutos</b></p>'
                },
                failure: function (data) {
                    alert(data.responseText);
                },
                error: function (data) {
                    alert(data.responseText);
                }
            });
        }

        let r2 = ((resulservidor2 / contador).toFixed(2))
        let r3 = ((resulservidor3 / contador).toFixed(2))
        let r4 = ((resulservidor4 / contador).toFixed(2))
        dataDatos.push(r2)
        dataDatos.push(r3) 
        dataDatos.push(r4) 
        labels.push(2)
        labels.push(3)
        labels.push(4)
        graficar(dataDatos,labels);

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

            let num_promedio_cola = Math.round(Math.pow(tasa_llegada, 2) / ((tasa_servicio) * (tasa_servicio - tasa_llegada)))
            document.getElementById('resultado_formulas').innerHTML += '<p id="resultado"> <b>Numero promedio de clientes en cola: ' + num_promedio_cola + '</b></p>'
            let tiempo_prom_cola = ((Math.pow(tasa_llegada, 2) / ((tasa_servicio) * (tasa_servicio - tasa_llegada))) / (tasa_llegada)).toFixed(2)
            let tiempo_prom_hora= (tiempo_prom_cola*60).toFixed(2);
            document.getElementById('resultado_formulas').innerHTML += '<p id="resultado"> <b>Tiempo promedio que pasa un cliente en cola: ' + tiempo_prom_cola + ' horas</b></p>'
            document.getElementById('resultado_formulas').innerHTML += '<p id="resultado"> <b>Tiempo promedio que pasa un cliente en cola: ' + tiempo_prom_hora + ' minutos</b></p>'
            let prob_persona_servicio = ((tasa_llegada / tasa_servicio)*(100)).toFixed(2)
            document.getElementById('resultado_formulas').innerHTML += '<p id="resultado"> <b>Probabilidad que una persona que llegue tenga que esperar: ' + prob_persona_servicio + ' % </b></p>'

        }


    }


})

function graficar(dataDatos,labels) {

    const data = {
        labels: labels,
        datasets: [{
            label: 'Tiempo promedio Pedidos',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataDatos
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}