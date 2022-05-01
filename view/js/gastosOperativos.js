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
            let cantidadProducto = document.getElementById('txt_ingreso_prod').innerHTML;
            cantidadProducto = $("#txt_ingreso_producto").text();
            console.log(cantidadProducto);
        })

        $(".boton_ingresar").click(function() {

        });    
});