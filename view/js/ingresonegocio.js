$(document).ready(function() {
    $(".boton_ingresar").click(function() {
        let labels = [];
        let dataDatos = [];
        let dataDatos2 = [];
        let clienteAtendidoAcumulado = 0;
        let clienteLlegadaAcumulado = 0;
        let clienteAtendidoAcumuladop = 0;
        let clienteLlegadaAcumuladop = 0;
        let atencionClientes = 0;
        let atencionNoClientes = 0;
        let contador = 0;
        let dia_atendido = $('.dia option:selected').val();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/ingresonegocio/" + dia_atendido,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                $('.tablaDias').html("");
                $.each(data, function(i, item) {
                    contador++;
                    console.log(contador);
                    labels.push(contador);
                    dataDatos2.push(item.no_cliente_ingreso + "");
                    dataDatos.push(item.no_cliente_atendido + "");
                    $('.tablaDias').html($('.tablaDias').html() + '<tr><th scope="row">' + contador + '</th><td>' + item.dia_atendido + '</td><td>' + item.no_cliente_atendido + '</td> <td>' + item.no_cliente_ingreso + '</td></tr>');
                    clienteAtendidoAcumulado += parseInt(item.no_cliente_atendido + "", 10);
                    clienteLlegadaAcumulado += parseInt(item.no_cliente_ingreso + "", 10);
                });
                console.log(dataDatos + "")
                $('.grafica').first().html('<div class="grafica"> <canvas id="myChart"></canvas> </div>');
                $('.grafica2').first().html('<div class="grafica"> <canvas id="myChart2"></canvas> </div>');
                graficar(dataDatos, labels);
                graficar2(dataDatos2, labels);

                function decimalAdjust(type, value, exp) {
                    // Si el exp no está definido o es cero...
                    if (typeof exp === 'undefined' || +exp === 0) {
                        return Math[type](value);
                    }
                    value = +value;
                    exp = +exp;
                    // Si el valor no es un número o el exp no es un entero...
                    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                        return NaN;
                    }
                    // Shift
                    value = value.toString().split('e');
                    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
                    // Shift back
                    value = value.toString().split('e');
                    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
                }
                if (!Math.round10) {
                    Math.round10 = function(value, exp) {
                        return decimalAdjust('round', value, exp);
                    };
                }
                clienteAtendidoAcumuladop = clienteAtendidoAcumulado / contador;
                clienteLlegadaAcumuladop = clienteLlegadaAcumulado / contador;
                atencionClientes = (Math.round10((clienteAtendidoAcumuladop / clienteLlegadaAcumuladop), -2)) * 100;
                atencionNoClientes = (100 - atencionClientes);
                $('.porcentajeAtendido').text(atencionClientes + "");
                $('.porcentajeNoAtendido').text(atencionNoClientes + "");

            },
            failure: function(data) {
                alert(data.responseText);
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    });
});

function graficar(dataDatos, labels) {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Distribucion binomial',
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

function graficar2(dataDatos, labels) {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Distribucion binomial',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataDatos,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart2'),
        config
    );
}