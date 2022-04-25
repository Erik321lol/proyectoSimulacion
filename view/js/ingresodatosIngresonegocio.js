$(document).ready(function() {
    $(".boton_ingresar").click(function() {
        let no_cliente_atendido = parseInt($('.atendidos').val(), 10);
        let no_cliente_ingreso = parseInt($('.ingreso').val(), 10);
        let dia_atendido = $('.dia option:selected').val();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/ingresonegocio",
            data: JSON.stringify({
                "no_cliente_atendido": no_cliente_atendido,
                "no_cliente_ingreso": no_cliente_ingreso,
                "dia_atendido": dia_atendido
            }),
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                alert('registro agregado');
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