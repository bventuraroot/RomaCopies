/**
 *  Form Wizard
 */

"use strict";
$( document ).ready(function() {
    // Obtener todos los parámetros
const urlParams = new URLSearchParams(window.location.search);
const typedocument = urlParams.get('typedocument');
createcorrsale(typedocument);



    var operation = $('#operation').val();
    var valdraft = $('#valdraft').val();
    var valcorr = $('#valcorr').val();
    if (operation == 'delete') {
        var stepper = new Stepper(document.querySelector('.wizard-icons-example'))
        stepper.to(3);
    }else{
        if(valdraft && $.isNumeric(valcorr)){
            var stepper = new Stepper(document.querySelector('.wizard-icons-example'))
        stepper.to(2);
        }
    }

});

$(function () {
    const select2 = $(".select2"),
        selectPicker = $(".selectpicker");

    // Bootstrap select
    if (selectPicker.length) {
        selectPicker.selectpicker();
    }

    // select2
    if (select2.length) {
        select2.each(function () {
            var $this = $(this);
            $this.wrap('<div class="position-relative"></div>');
            $this.select2({
                placeholder: "Select value",
                dropdownParent: $this.parent(),
            });
        });
    }
    //Get companies avaibles
    var iduser = $("#iduser").val();
    $.ajax({
        url: "/company/getCompanybyuser/" + iduser,
        method: "GET",
        success: function (response) {
            $("#company").append('<option value="0">Seleccione</option>');
            $.each(response, function (index, value) {
                $("#company").append(
                    '<option value="' +
                        value.id +
                        '">' +
                        value.name.toUpperCase() +
                        "</option>"
                );
            });
        },
    });

    //Get products avaibles
    $.ajax({
        url: "/product/getproductall",
        method: "GET",
        success: function (response) {
            $("#psearch").append('<option value="0">Seleccione</option>');
            $.each(response, function (index, value) {
                $("#psearch").append(
                    '<option value="' +
                        value.id +
                        '" title="'+ value.image +'">' +
                        value.name.toUpperCase() + "| Descripción: " + value.description + "| Proveedor: " + value.nameprovider +
                        "</option>"
                );
            });
        },
    });

    var selectdcompany = $(".select2company");

    if (selectdcompany.length) {
        var $this = selectdcompany;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar empresa",
            dropdownParent: $this.parent(),
        });
    }

    var selectddestino = $(".select2destino");

    if (selectddestino.length) {
        var $this = selectddestino;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar destino",
            dropdownParent: $this.parent(),
        });
    }

    var selectdcanal = $(".select2canal");

    if (selectdcanal.length) {
        var $this = selectdcanal;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar destino",
            dropdownParent: $this.parent(),
        });
    }

    var selectdlinea = $(".select2linea");

    if (selectdlinea.length) {
        var $this = selectdlinea;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar linea aerea",
            dropdownParent: $this.parent(),
        });
    }

    var selectdclient = $(".select2client");

    if (selectdclient.length) {
        var $this = selectdclient;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar cliente",
            dropdownParent: $this.parent(),
        });
    }

    function formatState(state) {
        //console.log(state);
        if (state.id==0) {
          return state.text;
        }
        var $state = $(
          '<span><img src="../assets/img/products/'+ state.title +'" class="imagen-producto-select2" /> ' + state.text + '</span>'
        );
        return $state;
      };
    var selectdpsearch = $(".select2psearch");

    if (selectdpsearch.length) {
        var $this = selectdpsearch;
        $this.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Seleccionar Producto",
            dropdownParent: $this.parent(),
            templateResult: formatState
        });
    }
        //Get destinos
        $.ajax({
            url: "/sale/destinos",
            method: "GET",
            success: function (response) {
                $("#destino").append('<option value="0">Seleccione</option>');
                $.each(response, function (index, value) {
                    //console.log(value.iata);
                    $("#destino").append(
                        '<option value="' +
                            value.id_aeropuerto +'">'+ value.iata + '-' +value.ciudad + '-' + value.pais + '-' + value.continente +
                            "</option>"
                    );
                });
            },
        });

        //Get linea aerea
        $.ajax({
            url: "/sale/linea",
            method: "GET",
            success: function (response) {
                $("#linea").append('<option value="0">Seleccione</option>');
                $.each(response, function (index, value) {
                    //console.log(value.iata);
                    $("#linea").append(
                        '<option value="' +
                            value.id_aerolinea +'">'+ value.iata + '-' + value.nombre +
                            "</option>"
                    );

                });
            },
        });
});

var valcorrdoc = $("#valcorr").val();
var valdraftdoc = $("#valdraft").val();
if (valcorrdoc != "" && valdraftdoc == "true") {
    var draft = draftdocument(valcorrdoc, valdraftdoc);
}



function agregarp() {

    var productid = $("#productid").val();
    //alert(productid);
    var reserva = $('#reserva').val();
    var ruta = $('#ruta').val();
    var destino = $('#destino').val();
    var linea = $('#linea').val();
    var canal = $('#Canal').val();
    var fee = parseFloat($("#fee").val()) || 0.00;
    //var fee2 = parseFloat($("#fee2").val()) || 0.00;

    // Validar si el producto es 9 y los campos son obligatorios
    if (productid == 9) {
        if (!reserva || !ruta || !destino || !linea || !canal) {
            swal.fire("Favor complete la información del producto");
            return;
        }
    } else {
        // Si el producto no es 9, enviar valores vacíos
        reserva = "null";
        ruta = "null";
        destino = "0";
        linea = "0";
        canal = "null";
    }
    var typedoc = $('#typedocument').val();
    var clientid = $("#client").val();
    var corrid = $("#corr").val();
    var acuenta = ($("#acuenta").val()==""?'SIN VALOR DEFINIDO':$("#acuenta").val());
    var fpago = $("#fpago").val();
    var productname = $("#productname").val();
    var price = parseFloat($("#precio").val());
    var ivarete13 = parseFloat($("#ivarete13").val());
    var rentarete = parseFloat($("#rentarete").val())||0.00;
    var ivarete = parseFloat($("#ivarete").val());
    var type = $("#typesale").val();
    var cantidad = parseFloat($("#cantidad").val());
    var productdescription = $("#productdescription").val();
    var pricegravada = 0;
    var priceexenta = 0;
    var pricenosujeta = 0;
    var sumas = parseFloat($("#sumas").val());
    var iva13 = parseFloat($("#13iva").val());
    var rentarete10 = parseFloat($("#rentaretenido").val());
    var ivaretenido = parseFloat($("#ivaretenido").val());
    var ventasnosujetas = parseFloat($("#ventasnosujetas").val());
    var ventasexentas = parseFloat($("#ventasexentas").val());
    var ventatotal = parseFloat($("#ventatotal").val());
    var descriptionbyproduct;
    //ventatotal = parseFloat(ventatotal/1.13).toFixed(2);
    var sumasl = 0;
    var ivaretenidol = 0;
    var iva13l = 0;
    var renta10l = 0;
    var ventasnosujetasl = 0;
    var ventasexentasl = 0;
    var ventatotall = 0;
    var iva13temp = 0;
    var renta10temp = 0;
    var totaltempgravado = 0;
    var priceunitariofee = 0;
    if (type == "gravada") {
        pricegravada = parseFloat((price * cantidad)+fee);
        totaltempgravado = parseFloat(pricegravada);
        if(typedoc==6 || typedoc==8){
            iva13temp = 0.00;
        }else if(typedoc==3){
            iva13temp = parseFloat(pricegravada * 0.13).toFixed(2);
        }

        //iva13temp = parseFloat(ivarete13 * cantidad).toFixed(2);
    } else if (type == "exenta") {
        priceexenta = parseFloat(price * cantidad);
        iva13temp = 0;
    } else if (type == "nosujeta") {
        pricenosujeta = parseFloat(price * cantidad);
        iva13temp = 0;
    }
    if(typedoc=='8'){
        iva13temp = 0.00;
    }
    if(!$.isNumeric(ivarete)){
        ivarete = 0.00;
    }
    renta10temp = parseFloat(rentarete*cantidad).toFixed(2);
    var totaltemp = parseFloat(parseFloat(pricegravada) + parseFloat(priceexenta) + parseFloat(pricenosujeta));
    var ventatotaltotal =  parseFloat(ventatotal); //+ parseFloat(iva13) + parseFloat(ivaretenido);
    priceunitariofee = price + (fee/cantidad);
    var totaltemptotal = parseFloat(
    ($.isNumeric(pricegravada)? pricegravada: 0) +
    ($.isNumeric(priceexenta)? priceexenta: 0) +
    ($.isNumeric(pricenosujeta)? pricenosujeta: 0) +
    ($.isNumeric(iva13temp)? parseFloat(iva13temp): 0) -
    ($.isNumeric(renta10temp)? parseFloat(renta10temp): 0) -
    ($.isNumeric(ivarete)? ivarete: 0));

    //descripcion factura
    if(productid==10){
        descriptionbyproduct = productname;
    }else {
        descriptionbyproduct =  productname + " " + reserva + " " + ruta;
    }

    //enviar a temp factura
    $.ajax({
        url:
            "savefactemp/" +
            corrid +
            "/" +
            clientid +
            "/" +
            productid +
            "/" +
            cantidad +
            "/" +
            price +
            "/" +
            pricenosujeta +
            "/" +
            priceexenta +
            "/" +
            pricegravada +
            "/" +
            ivarete13 +
            "/" +
            rentarete +
            "/" +
            ivarete +
            "/" +
            acuenta +
            "/" +
            fpago +
            "/" +
            fee +
            "/" +
            reserva +
            "/" +
            ruta +
            "/" +
            destino +
            "/" +
            linea +
            "/" +
            canal,
        method: "GET",
        success: function (response) {
            if (response.res == 1) {
                var row =
                    '<tr id="pro' +
                    response.idsaledetail +
                    '"><td>' +
                    cantidad +
                    "</td><td>" +
                    descriptionbyproduct +
                    "</td><td>" +
                    priceunitariofee.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    pricenosujeta.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    priceexenta.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    pricegravada.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    '</td><td class="text-center">' +
                    totaltemp.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    '</td><td class="quitar_documents"><button class="btn rounded-pill btn-icon btn-danger" type="button" onclick="eliminarpro(' +
                    response.idsaledetail +
                    ')"><span class="ti ti-trash"></span></button></td></tr>';
                $("#tblproduct tbody").append(row);
                sumasl = sumas + totaltemp;
                $("#sumasl").html(
                    sumasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#sumas").val(sumasl);
                if(typedoc==6 || typedoc==8){
                    iva13l=0.00;
                }else if(typedoc==3){
                    //calculo de iva 13%
                    iva13l = parseFloat(parseFloat(iva13) + parseFloat(iva13temp));
                }
                $("#13ival").html(
                    iva13l.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#13iva").val(iva13l);

                if($("#typedocument").val() == '8'){
                    //calculo de retenido 10%
                renta10l = parseFloat(parseFloat(renta10temp) + parseFloat(rentarete10));
                $("#10rental").html(
                    renta10l.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#rentaretenido").val(renta10l);
                }
                //calculo del retenido 1%
                ivaretenidol = ivaretenido + ivarete;
                $("#ivaretenidol").html(
                    ivaretenidol.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ivaretenido").val(ivaretenidol);
                ventasnosujetasl = ventasnosujetas + pricenosujeta;
                $("#ventasnosujetasl").html(
                    ventasnosujetasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ventasnosujetas").val(ventasnosujetasl);
                ventasexentasl = ventasexentas + priceexenta;
                $("#ventasexentasl").html(
                    ventasexentasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ventasexentas").val(ventasexentasl);

                ventatotall = parseFloat(ventatotaltotal)  + parseFloat(totaltemptotal);
                $("#ventatotall").html(
                    parseFloat(ventatotall).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $('#ventatotallhidden').val(ventatotall);
                $("#ventatotal").val(ventatotall);
            } else if (response == 0) {
            }
        },
    });
    $('#precio').val(0.00);
    $('#fee').val(0.00);
    $('#ivarete13').val(0.00);
    $('#ivarete').val(0.00);
    $('#rentarete').val(0.00);
    $('#reserva').val();
    $('#ruta').val();
    $('#destino').val(null).trigger('change');
    $('#linea').val(null).trigger('change');
    $('#canal').val(null).trigger('change');
    $("#psearch").val("0").trigger("change.select2");
}

function totalamount() {
    var typecontricompany = $("#typecontribuyente").val();
    var typecontriclient = $("#typecontribuyenteclient").val();
    var typedoc = $('#typedocument').val();

    // Convertir valores a números asegurando que no sean NaN
    var cantidad = parseFloat($("#cantidad").val()) || 0.00;
    var fee = parseFloat($("#fee").val()) || 0.00;
    //var fee2 = parseFloat($("#fee2").val()) || 0.00;
    var iva = parseFloat($("#iva").val()) || 0.00;
    var valor = parseFloat($('#precio').val()) || 0.00;

    var ivarete13 = 0.00;
    var retencionamount = 0.00;
    var renta = 0.00;
    var totalamount = 0.00;
    var totaamountsinivi = 0.00;
    var totalvalor = 0.00;
    var totalfee = 0.00;
    let retencion = 0.00;

    // Evaluar la retención de IVA según el tipo de contribuyente
    if (typecontricompany === "GRA") { // Empresa grande
        if (typecontriclient === "GRA") {
            retencion = 0.01; // 1% de retención cuando ambas son grandes
        } else if (["MED", "PEQ", "OTR"].includes(typecontriclient)) {
            retencion = 0.01; // 1% cuando empresa grande paga a mediana, pequeña u otro
        }
    } else if (["MED", "PEQ", "OTR"].includes(typecontricompany)) { // Empresa no es grande
        retencion = 0.00; // No retiene IVA
    }

    totalamount = parseFloat(valor * cantidad);
    totaamountsinivi = parseFloat(totalamount/1.13);

    // Cálculo de IVA retenido
    if (typedoc === '6' || typedoc === '8') {
        $("#ivarete13").val(0);
        ivarete13 = 0.00;
    } else {
        totalvalor = parseFloat(valor * iva);
        totalfee = parseFloat(fee * iva);
        ivarete13 = parseFloat(totalvalor + totalfee);
        $("#ivarete13").val(ivarete13.toFixed(2));
    }

    // Cálculo de retención
    retencionamount = parseFloat(valor * retencion);
    $("#ivarete").val(retencionamount.toFixed(2));

    // Cálculo de renta retenida
    if (typedoc === '8') {
        renta = parseFloat(valor * 0.10);
        $("#rentarete").val(renta.toFixed(2));
    } else {
        renta = 0.00;
    }

    // Depuración: Verificar tipos de datos
    //console.log("fee:", typeof fee, fee);
    //console.log("fee2:", typeof fee2, fee2);
    //console.log("iva:", typeof iva, iva);
    //console.log("ivarete13:", typeof ivarete13, ivarete13);
    //console.log("retencionamount:", typeof retencionamount, retencionamount);
    //console.log("renta:", typeof renta, renta);

    // Cálculo del total asegurando que todo es número


    var totalFinal = totalamount + fee + ivarete13 + retencionamount + renta;

    $("#total").val(totalFinal.toFixed(2)); // Aplicar `.toFixed(2)` solo después de la suma final
}


function searchproduct(idpro) {
    if(idpro==9){
        $("#add-information-tickets").css("display", "");
    }else{
        $("#add-information-tickets").css("display", "none");
    }
    //Get products by id avaibles
    var typedoc = $('#typedocument').val();
    var typecontricompany = $("#typecontribuyente").val();
    var typecontriclient = $("#typecontribuyenteclient").val();
    var iva = parseFloat($("#iva").val());
    var iva_entre = parseFloat($("#iva_entre").val());
    //var typecontriclient = $("#typecontribuyenteclient").val();
    var retencion=0.00;
    var pricevalue;
    $.ajax({
        url: "/product/getproductid/" + btoa(idpro),
        method: "GET",
        success: function (response) {
            $.each(response, function (index, value) {

                if(typedoc=='6' || typedoc=='8'){
                    pricevalue = parseFloat(value.price);
                }else{
                    pricevalue = parseFloat(value.price/iva_entre);
                }
                $("#precio").val(pricevalue.toFixed(2));
                $("#productname").val(value.productname);
                $("#productid").val(value.id);
                $("#productdescription").val(value.description);
                $("#productunitario").val(value.id);
                //validar si es gran contribuyente el cliente vs la empresa

                if (typecontricompany == "GRA") {
                    if (typecontriclient == "GRA") {
                        retencion = 0.01;
                    } else if (
                        typecontriclient == "MED" ||
                        typecontriclient == "PEQ" ||
                        typecontriclient == "OTR"
                    ) {
                        retencion = 0.00;
                    }
                }
                if(typecontriclient==""){
                    retencion = 0.0;
                }
                if(typedoc=='6' || typedoc=='8'){
                    $("#ivarete13").val(0);
                }else{
                    $("#ivarete13").val(parseFloat(pricevalue.toFixed(2) * iva).toFixed(2));
                }
                $("#ivarete").val(
                    parseFloat(pricevalue.toFixed(2) * retencion).toFixed(2)
                );
                if(typedoc=='8'){
                    $("#rentarete").val(
                        parseFloat(pricevalue.toFixed(2) * 0.10).toFixed(2)
                    );
                }
            });
            var updateamounts = totalamount();
        },
    });
}

function searchproductcode(codeproduct) {
    //Get products by id avaibles
    var typedoc = $('#typedocument').val();
    var typecontricompany = $("#typecontribuyente").val();
    var typecontriclient = $("#typecontribuyenteclient").val();
    var iva = parseFloat($("#iva").val());
    var iva_entre = parseFloat($("#iva_entre").val());
    //var typecontriclient = $("#typecontribuyenteclient").val();
    var retencion=0.00;
    var pricevalue;
    $.ajax({
        url: "/product/getproductcode/" + btoa(codeproduct),
        method: "GET",
        success: function (response) {
            $.each(response, function (index, value) {
                if(typedoc=='6' || typedoc=='8'){
                    pricevalue = parseFloat(value.price);
                }else{
                    pricevalue = parseFloat(value.price/iva_entre);
                }
                $("#psearch").val(value.id).trigger("change.select2");
                $("#codesearch").val(value.code);
                $("#precio").val(pricevalue.toFixed(2));
                $("#productname").val(value.productname);
                $("#productid").val(value.id);
                $("#productdescription").val(value.description);
                $("#productunitario").val(value.id);
                $("#add-information-products").css("display", "");
                $("#product-image").attr("src", '../assets/img/products/' + value.image);
                $("#product-name").html(value.productname);
                $("#product-marca").html(value.marcaname);
                $("#product-provider").html(value.provider);
                $("#product-price").html(pricevalue.toFixed(2));
                //validar si es gran contribuyente el cliente vs la empresa

                if (typecontricompany == "GRA") {
                    if (typecontriclient == "GRA") {
                        retencion = 0.01;
                    } else if (
                        typecontriclient == "MED" ||
                        typecontriclient == "PEQ" ||
                        typecontriclient == "OTR"
                    ) {
                        retencion = 0.00;
                    }
                }
                if(typecontriclient==""){
                    retencion = 0.0;
                }
                if(typedoc=='6' || typedoc=='8'){
                    $("#ivarete13").val(0);
                }else{
                    $("#ivarete13").val(parseFloat(pricevalue.toFixed(2) * iva).toFixed(2));
                }
                $("#ivarete").val(
                    parseFloat(pricevalue.toFixed(2) * retencion).toFixed(2)
                );
                if(typedoc=='8'){
                    $("#rentarete").val(
                        parseFloat(pricevalue.toFixed(2) * 0.10).toFixed(2)
                    );
                }
            });
            var updateamounts = totalamount();
        },
    });
}

function changetypesale(type){
    var price = $("#precio").val();
    var typedoc = $('#typedocument').val();
    var iva = parseFloat($("#iva").val());
switch(type){
    case 'gravada':
        if(typedoc=='6' || typedoc=='8'){
            $('#ivarete13').val(parseFloat(0));
        }else{
            $('#ivarete13').val(parseFloat(price*iva).toFixed(2));
        }

        if(typedoc=='8'){
            $('#rentarete').val(parseFloat(price*0.10).toFixed(2));
        }

        break;
    case 'exenta':
        $('#ivarete13').val(0.00);
        $('#ivarete').val(0.00);
        $('#rentarete').val(0.00);
        break;
    case 'nosujeta':
        $('#ivarete13').val(0.00);
        break;
}
}

function eliminarpro(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "¿Eliminar?",
            text: "Esta accion no tiene retorno",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminarlo!",
            cancelButtonText: "No, Cancelar!",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                var corr = $('#valcorr').val();
                var document = $('#typedocument').val();
                $.ajax({
                    url: "destroysaledetail/" + btoa(id),
                    method: "GET",
                    async: false,
                    success: function (response) {
                        if (response.res == 1) {
                            Swal.fire({
                                title: "Eliminado",
                                icon: "success",
                                confirmButtonText: "Ok",
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    //$("#pro" + id).remove();
                                    //$('#resultados').load(location.href + " #resultados");
                                    //var details = agregarfacdetails($('#valcorr').val());
                                    //location.reload(true);
                                    window.location.href =
                                    "create?corr=" + corr + "&draft=true&typedocument=" + document +"&operation=delete";
                                }
                            });
                        } else if (response.res == 0) {
                            swalWithBootstrapButtons.fire(
                                "Problemas!",
                                "Algo sucedio y no pudo eliminar el cliente, favor comunicarse con el administrador.",
                                "success"
                            );
                        }
                    },
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelado",
                    "No hemos hecho ninguna accion :)",
                    "error"
                );
            }
        });
}

function aviablenext(idcompany) {
    $("#step1").prop("disabled", false);
}

function getclientbycompanyurl(idcompany) {
    $.ajax({
        url: "/client/getclientbycompany/" + btoa(idcompany),
        method: "GET",
        success: function (response) {
            $("#client").append('<option value="0">Seleccione</option>');
            $.each(response, function (index, value) {
                //console.log(value);
                if(value.tpersona=='J'){
                    $("#client").append(
                        '<option value="' +
                            value.id +
                            '">' +
                            value.name_contribuyente.toUpperCase() +
                            "</option>"
                    );
                }else if (value.tpersona=='N'){
                    $("#client").append(
                        '<option value="' +
                            value.id +
                            '">' +
                            value.firstname.toUpperCase() +
                            " " +
                            value.firstlastname.toUpperCase() +
                            "</option>"
                    );
                }
            });
        },
    });

    //traer el tipo de contribuyente
    $.ajax({
        url: "/company/gettypecontri/" + btoa(idcompany),
        method: "GET",
        success: function (response) {
            $("#typecontribuyente").val(response.tipoContribuyente);
        },
    });
}

function valtrypecontri(idcliente) {
    //traer el tipo de contribuyente
    $.ajax({
        url: "/client/gettypecontri/" + btoa(idcliente),
        method: "GET",
        success: function (response) {
            $("#typecontribuyenteclient").val(response.tipoContribuyente);
        },
    });
}
function createcorrsale(typedocument="") {
    //crear correlativo temp de factura
    let salida = false;
    var valicorr = $("#corr").val();
    if (valicorr == "") {
        //var idcompany = $("#company").val();
        //var iduser = $("#iduser").val();
        //var typedocument = $("#typedocument").val();
        $.ajax({
            url: "newcorrsale/" +  typedocument,
            method: "GET",
            async: false,
            success: function (response) {
                if ($.isNumeric(response.sale_id)) {
                    //recargar la pagina para retomar si una factura quedo en modo borrador
                    //$("#corr").val(response);
                    //salida = true;
                    window.location.href =
                        "create?corr=" + response.sale_id + "&draft=true&typedocument=" + typedocument;
                } else {
                    Swal.fire("Hay un problema, favor verificar"+response);
                }
            },
        });
    } else {
        salida = true;
    }

    return salida;
}

function valfpago(fpago) {
    //alert(fpago);
}

function draftdocument(corr, draft) {
    if (draft) {
        $.ajax({
            url: "getdatadocbycorr/" + btoa(corr),
            method: "GET",
            async: false,
            success: function (response) {
                //console.log(response);
                $.each(response, function (index, value) {
                    //campo de company
                    $('#company').empty();
                    $("#company").append(
                        '<option value="' +
                            value.id +
                            '">' +
                            value.name.toUpperCase() +
                            "</option>"
                    );
                    $("#step1").prop("disabled", false);
                    $('#company').prop('disabled', true);
                    $('#corr').prop('disabled', true);
                    $("#typedocument").val(value.typedocument_id);
                    $("#typecontribuyente").val(value.tipoContribuyente);
                    $("#iva").val(value.iva);
                    $("#iva_entre").val(value.iva_entre);
                    $("#typecontribuyenteclient").val(value.client_contribuyente);
                    $('#date').prop('disabled', true);
                    console.log(corr);
                    $("#corr").val(corr);
                    $("#date").val(value.date);
                    //campo cliente
                    if(value.client_id != null && value.client_firstname!='N/A'){
                        $("#client").append(
                            '<option value="' +
                                value.client_id +
                                '">' +
                                value.client_firstname +' '+ value.client_secondname +
                                "</option>"
                        );
                        $('#client').prop('disabled', true);
                    }else if(value.client_firstname=='N/A') {
                        $("#client").append(
                            '<option value="' +
                                value.client_id +
                                '">' +
                                value.comercial_name +
                                "</option>"
                        );
                        $('#client').prop('disabled', true);
                    }else{
                        var getsclient =  getclientbycompanyurl(value.id);
                    }
                    if(value.waytopay != null){
                        $("#fpago option[value="+ value.waytopay +"]").attr("selected",true);
                    }
                    $("#acuenta").val(value.acuenta);
                    var details = agregarfacdetails(corr);
                });
            },
            failure: function (response) {
                Swal.fire("Hay un problema: " + response.responseText);
            },
            error: function (response) {
                Swal.fire("Hay un problema: " + response.responseText);
            },
        });
    }
}

function CheckNullUndefined(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
  }

function getinfodoc(){
    var corr = $('#valcorr').val();
    let salida = false;
    $.ajax({
        url: "getdatadocbycorr2/" + btoa(corr),
        method: "GET",
        async: false,
        success: function (response) {
            salida = true;
            //console.log(response);
            $('#logodocfinal').attr('src', '../assets/img/logo/' + response[0].logo);
            $('#addressdcfinal').empty();
            $('#addressdcfinal').html('' + response[0].country_name.toUpperCase() + ', ' + response[0].department_name + ', ' + response[0].municipality_name + '</br>' + response[0].address);
            $('#phonedocfinal').empty();
            $('#phonedocfinal').html('' + ((CheckNullUndefined(response[0].phone_fijo)==true) ? '' : 'PBX: +503 ' + response[0].phone_fijo) + ' ' + ((CheckNullUndefined(response[0].phone)==true) ? '' : 'Móvil: +503 ' + response[0].phone));
            $('#emaildocfinal').empty();
            $('#emaildocfinal').html(response[0].email);
            $('#name_client').empty();
            if(response[0].tpersona == 'J'){
                $('#name_client').html(response[0].name_contribuyente);
            }else if (response[0].tpersona == 'N'){
                $('#name_client').html(response[0].client_firstname + ' ' + response[0].client_secondname);
            }
            $('#date_doc').empty();
            var dateformat = response[0].date.split('-');
            $('#date_doc').html(dateformat[2] + '/' + dateformat[1] + '/' + dateformat[0]);
            $('#address_doc').empty();
            $('#address_doc').html(response[0].address);
            $('#duinit').empty();
            $('#duinit').html(response[0].nit);
            $('#municipio_name').empty();
            $('#municipio_name').html(response[0].municipality_name);
            $('#giro_name').empty();
            $('#giro_name').html(response[0].giro);
            $('#name_type_documents_details').empty();
            $('#name_type_documents_details').html(response[0].document_name);
            $('#corr_details').empty();
            $('#corr_details').html('USD' + response[0].corr + '00000');
            $('#NCR_details').empty();
            $('#NCR_details').html('NCR: ' + response[0].NCR);
            $('#NIT_details').empty();
            $('#NIT_details').html('NIT: ' + response[0].NIT);
            $('#departamento_name').empty();
            $('#departamento_name').html(response[0].department_name);
            $('#forma_pago_name').empty();
            var forma_name;
            switch(response[0].waytopay){
                case "1":
                    forma_name='CONTADO';
                    break;
                case "2":
                    forma_name='CREDITO';
                    break;
                case "3":
                    forma_name='OTRO';
                    break;
            }
            $('#forma_pago_name').html(forma_name);
            $('#acuenta_de').empty();
            $('#acuenta_de').html(response[0].acuenta);
            var div_copy = $('#tblproduct').clone();
                div_copy.removeClass();
                div_copy.addClass('table_details');
                div_copy.find('.fadeIn').removeClass();
                div_copy.children().val("");
                div_copy.find('.quitar_documents').remove();
                div_copy.find('.bg-secondary').removeClass();
                div_copy.find('.text-white').removeClass();
                div_copy.find('thead').addClass('head_details');
                div_copy.find('tfoot').addClass('tfoot_details');
                div_copy.find('th').addClass('th_details');
                div_copy.find('td').addClass('td_details');
                $('#details_products_documents').empty();
                $('#details_products_documents').append(div_copy);
                //$(".quitar_documents").empty();
                //$("#quitar_documents").remove();
        },
    });
    return salida;
}

function creardocuments() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "Crear Documento?",
            text: "Es seguro de guardar la información",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Si, Crear!",
            cancelButtonText: "No, espera!",
            reverseButtons: true,
            showLoaderOnConfirm: true, // Agrega un ícono de espera en el botón de confirmación
            preConfirm: () => {
                return new Promise((resolve) => {
                    var corr = $('#valcorr').val();
                    var totalamount = $('#ventatotallhidden').val();
                    totalamount = 0 + totalamount;

                    $.ajax({
                        url: "createdocument/" + btoa(corr) + '/' + totalamount,
                        method: "GET",
                        success: function (response) {
                            console.log(response);
                            if (response.res == 1) {
                                resolve(response); // Resuelve la promesa si la solicitud es exitosa
                            } else if (response.res == 0) {
                                reject("Algo salió mal"); // Rechaza la promesa si hay un problema
                            }
                        },
                    });
                });
            },
        })
        .then((result) => {
            if (result.value) {
                Swal.fire({
                    title: "DTE Creado correctamente",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "index";
                    }
                });
            }
        })
        .catch((error) => {
            swalWithBootstrapButtons.fire(
                "Problemas!",
                "Algo sucedió y el documento no fue creado, favor comunicarse con el administrador.",
                "success"
            );
        });
}


function agregarfacdetails(corr) {
    var typedoc = $('#typedocument').val()
    $.ajax({
        url: "getdetailsdoc/" + btoa(corr),
        method: "GET",
        async: false,
        success: function (response) {

            let totaltemptotal = 0;
            let totalsumas = 0;
            let ivarete13total = 0;
            let rentatotal = 0;
            let ivaretetotal = 0;
            let nosujetatotal = 0;
            let exempttotal = 0;
            let pricesaletotal = 0;
            let preciounitario = 0;
            let preciogravadas = 0;
            $.each(response, function (index, value) {

                if(typedoc=='6' || typedoc=='8'){
                    ivarete13total += parseFloat(0.00);
                    preciounitario = parseFloat(parseFloat(value.priceunit)+(value.detained13/value.amountp));
                    preciogravadas = parseFloat(parseFloat(value.pricesale)+parseFloat(value.detained13));
                }else{
                    ivarete13total += parseFloat(value.detained13);
                    preciounitario = parseFloat(value.priceunit);
                    preciogravadas = parseFloat(value.pricesale);
                }
                var totaltemp = (parseFloat(value.nosujeta) + parseFloat(value.exempt) + parseFloat(preciogravadas));
                totalsumas += totaltemp;
                rentatotal += parseFloat(value.renta);
                ivaretetotal += parseFloat(value.detained);
                nosujetatotal += parseFloat(value.nosujeta);
                exempttotal += parseFloat(value.exempt);
                pricesaletotal += parseFloat(value.pricesale);
                totaltemptotal += (parseFloat(value.nosujeta) + parseFloat(value.exempt) + parseFloat(value.pricesale))
                + (parseFloat(value.detained13) - (parseFloat(value.renta) + (parseFloat(value.detained))));
                var sumasl = 0;
                var iva13l = 0;
                var renta10l = 0;
                var ivaretenidol = 0;
                var ventasnosujetasl = 0;
                var ventasexentasl = 0;
                var ventatotall = 0;
                var row =
                    '<tr id="pro' +
                    value.id +
                    '"><td>' +
                    value.amountp +
                    "</td><td>" +
                    value.product_name +
                    "</td><td>" +
                    preciounitario.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    parseFloat(value.nosujeta).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    parseFloat(value.exempt).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    "</td><td>" +
                    preciogravadas.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    '</td><td class="text-center">' +
                    totaltemp.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    }) +
                    '</td><td class="quitar_documents"><button class="btn rounded-pill btn-icon btn-danger" type="button" onclick="eliminarpro(' +
                    value.id +
                    ')"><span class="ti ti-trash"></span></button></td></tr>';
                $("#tblproduct tbody").append(row);
                sumasl = totalsumas;
                $("#sumasl").html(
                    sumasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#sumas").val(sumasl);
                iva13l = ivarete13total;
                $("#13ival").html(
                    iva13l.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#13iva").val(iva13l);
                renta10l = rentatotal;
                $("#10rental").html(
                    renta10l.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#rentaretenido").val(renta10l);
                ivaretenidol =  ivaretetotal;
                $("#ivaretenidol").html(
                    ivaretenidol.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ivaretenido").val(ivaretenidol);
                ventasnosujetasl =  nosujetatotal;
                $("#ventasnosujetasl").html(
                    ventasnosujetasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ventasnosujetas").val(ventasnosujetasl);
                ventasexentasl = exempttotal;
                $("#ventasexentasl").html(
                    ventasexentasl.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ventasexentas").val(ventasexentasl);
                ventatotall = totaltemptotal;
                $("#ventatotall").html(
                    ventatotall.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })
                );
                $("#ventatotallhidden").val(ventatotall);
                $("#ventatotal").val(ventatotall);
            });
        },
        failure: function (response) {
            Swal.fire("Hay un problema: " + response.responseText);
        },
        error: function (response) {
            Swal.fire("Hay un problema: " + response.responseText);
        },
    });
}

(function () {
    // Icons Wizard
    // --------------------------------------------------------------------
    const wizardIcons = document.querySelector(".wizard-icons-example");

    if (typeof wizardIcons !== undefined && wizardIcons !== null) {
        const wizardIconsBtnNextList = [].slice.call(
                wizardIcons.querySelectorAll(".btn-next")
            ),
            wizardIconsBtnPrevList = [].slice.call(
                wizardIcons.querySelectorAll(".btn-prev")
            ),
            wizardIconsBtnSubmit = wizardIcons.querySelector(".btn-submit");

        const iconsStepper = new Stepper(wizardIcons, {
            linear: false,
        });
        if (wizardIconsBtnNextList) {
            wizardIconsBtnNextList.forEach((wizardIconsBtnNext) => {
                wizardIconsBtnNext.addEventListener("click", (event) => {
                    var id = $(wizardIconsBtnNext).attr("id");
                    switch (id) {
                        case "step1":
                            var create = createcorrsale();
                            if (create) {
                                iconsStepper.next();
                            }
                            break;
                        case "step2":
                            iconsStepper.to(3);
                            break;
                        case "step3":
                            var createdoc = getinfodoc();
                            if(createdoc){
                                iconsStepper.to(4);
                            }
                            break;

                    }
                });
            });
        }
        if (wizardIconsBtnPrevList) {
            wizardIconsBtnPrevList.forEach((wizardIconsBtnPrev) => {
                wizardIconsBtnPrev.addEventListener("click", (event) => {
                    iconsStepper.previous();
                });
            });
        }
        if (wizardIconsBtnSubmit) {
            wizardIconsBtnSubmit.addEventListener("click", (event) => {
                creardocuments();
            });
        }
    }
})();
