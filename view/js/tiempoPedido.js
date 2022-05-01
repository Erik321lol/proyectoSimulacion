console.log("Hola mundo")

let produtosSeleccionados = [];

document.getElementById('Pedidos').addEventListener('change', (event) => {
    let pedido = $('.Pedidos option:selected').val();
});
document.getElementById('btn_agregar').addEventListener('click', function() {
    let pedido = $('.Pedidos option:selected').val();
    document.getElementById('txt_pedido').innerHTML += '<p id="producto_seleccionado">' + pedido + '</p>'
    produtosSeleccionados.push(pedido);
})

document.getElementById('btn_eliminar').addEventListener('click', function() {
    $('#txt_pedido').children().last().remove()
    produtosSeleccionados.splice(produtosSeleccionados.length - 1);
})

let tiempo_preparacion = 0;
let precio = 0;

document.getElementById('btn_simular').addEventListener('click', function() {
    let servidor = $('.Servidores option:selected').val();
    document.getElementById('txt_servidor').innerHTML = '<p id="producto_seleccionado">' + servidor + '</p>'
    for (let i = 0; i < produtosSeleccionados.length; i++) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/producto/" + produtosSeleccionados[i],
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                $('#Table > tbody').empty();
                $.each(data, function(i, item) {
                    tiempo_preparacion = item.tiempo_preparacion;
                    precio = item.precio;
                    console.log(tiempo_preparacion);
                    console.log(precio);
                });
                console.log(data);
            },
            failure: function(data) {
                alert(data.responseText);
            },
            error: function(data) {
                alert(data.responseText);
            }
        });
    }

})