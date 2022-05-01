console.log("Hola mundo")
document.getElementById('Pedidos').addEventListener('change', (event) => {
    let pedido = $('.Pedidos option:selected').val();
});
document.getElementById('btn_agregar').addEventListener('click', function () {
    let pedido = $('.Pedidos option:selected').val();
    document.getElementById('txt_pedido').innerHTML += '<p id="producto_seleccionado">' + pedido + '</p>'
    console.log(pedido)
})

document.getElementById('btn_eliminar').addEventListener('click', function () {
    $('#txt_pedido').children().last().remove()
    $('#txt_pedido').children().text();
    console.log($('#txt_pedido').children().text().toLowerCase());
})

document.getElementById('btn_simular').addEventListener('click', function () {
    let servidor = $('.Servidores option:selected').val();
    document.getElementById('txt_servidor').innerHTML = '<p id="producto_seleccionado">' + servidor + '</p>'
    console.log(pedido)
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/producto/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#Table > tbody').empty();
            $.each(data, function (i, item) {
                var rows =
                    "" +
                    "" + item.id + "" +
                    "" + item.Nombres + "" +
                    "" + item.Cargo + "" +
                    "" + item.Dpto + "" +
                    "";
                $('#Table > tbody').append(rows);
            });
            console.log(data);
        },
        failure: function (data) {
            alert(data.responseText);
        },
        error: function (data) {
            alert(data.responseText);
        }
    });

})