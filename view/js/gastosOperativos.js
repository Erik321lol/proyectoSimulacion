$(document).ready(function(){
        let nombre = [];
        let precio = 0;
        let cantidad = 0;
        let contador = 0;
        let labels = [];
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/ingredientes",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $('.tablaPrecioIngrediente').html("");
                $.each(data, function(i, item){
                    contador++;
                    console.log(contador);
                    labels.push(contador);
                    $('.tablaPrecioIngrediente').html($('.tablaPrecioIngrediente').html() + '<tr><th scope="row">' + contador + '</th><td>' + item.nombre + '</td><td>' + item.precio + '</td><td>' + item.cantidad + '</td> <td>');
                    precio += parseInt(item.precio + "", 10);
                });
                
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

            }
        });  

        document.getElementById("btn_calcular").addEventListener("click", function(){
            document.getElementById("ocultarTabla").innerHTML= '<div class="col">'+
            '<div class="p-3 mb-3 mt-3 ms-3 me-2 bg-dark text-white"'+
            'style="text-align: center">'+
            '<h8>Tabla de cálculo de simulación del producto seleccionado</h8>'+
            ' </div>'+
            ' <div class="ms-3 me-3 mb-3">'+
            '  <table class="table">'+
            '    <thead>'+
            '     <tr>'+
            '      <th scope="col">Cantidad Producto</th>'+
            '       <th scope="col">Nombre</th>'+
            '       <th scope="col">Precio</th>'+
            '      <th scope="col">Cantidad para Preparacion</th>'+
            '      <th scope="col">Costo total por Ingrediente</th>'+
            '     </tr>'+
            '   </thead>'+
            '    <tbody class="tablaListaPreparacion"></tbody>'+
            ' </table>'+
            ' </div>'+
            ' </div>';
            let cantidadProducto = $("#txt_ingreso_prod").val();
            let productoSeleccionado = $('.prod-selec option:selected').val();
            let costoIngrediente = 0;
            let costoTotal = 0;
            let precioProductoTotal = 0;
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/producto/" + productoSeleccionado,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $.each(data, function(i, item){
                        precioProductoTotal = parseFloat(item.precio + "") * cantidadProducto;
                    })
                    }
            })
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/ingredientes_producto/" + productoSeleccionado,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $('.tablaListaPreparacion').html("");
                    $.each(data, function(i, item){                      
                        costoIngrediente = parseInt(item.precio + "", 10) * parseFloat(item.cantidad + "") * cantidadProducto;
                        costoTotal += costoIngrediente;
                        $('.tablaListaPreparacion').html($('.tablaListaPreparacion').html() + '<tr><th scope="row">' + cantidadProducto + '</th><td>' + item.nombre + '</td><td>' + item.precio + '</td><td>' + item.cantidad + '</td> <td>' + costoIngrediente.toFixed(2) + '</td> <td>');
                    });
                    document.getElementById("resultadoTotal").textContent= 'Coste de preparación= Q' + costoTotal.toFixed(2);
                    document.getElementById("precioVenta").textContent= 'Precio de venta = Q' + precioProductoTotal;
                    let gananciaProducto = precioProductoTotal - costoTotal;
                    document.getElementById("gananciaTotal").textContent= 'Ganancia total = Q' + gananciaProducto.toFixed(2);
                }
            });
            
        });
        
});