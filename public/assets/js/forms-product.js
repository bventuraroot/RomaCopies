/**
 * Form Picker
 */

'use strict';
$(document).ready(function (){

    $("#name").on("keyup", function () {
        var valor = $(this).val();
        $(this).val(valor.toUpperCase());
    });

    $("#name-edit").on("keyup", function () {
        var valor = $(this).val();
        $(this).val(valor.toUpperCase());
    });

    //Get providers avaibles
    var iduser = $('#iduser').val();
    $.ajax({
        url: "/provider/getproviders",
        method: "GET",
        success: function(response){
            //console.log(response);
            $('#provider').append('<option value="0">Seleccione</option>');
            $.each(response, function(index, value) {
                $('#provider').append('<option value="'+value.id+'">'+value.razonsocial.toUpperCase()+'</option>');
                $('#provideredit').append('<option value="'+value.id+'">'+value.razonsocial.toUpperCase()+'</option>');
              });
        }
    });
    //Get marcas avaibles
    $.ajax({
        url: "/marcas/getmarcas",
        method: "GET",
        success: function(response){
            //console.log(response);
            $('#marca').append('<option value="0">Seleccione</option>');
            $.each(response, function(index, value) {
                $('#marca').append('<option value="'+value.id+'">'+value.name.toUpperCase()+'</option>');
                $('#marcaredit').append('<option value="'+value.id+'">'+value.name.toUpperCase()+'</option>');
              });
        }
    });
});

   function editproduct(id){
    //Get data edit Products
    $.ajax({
        url: "getproductid/"+btoa(id),
        method: "GET",
        success: function(response){
            console.log(response);
            $.each(response[0], function(index, value) {
                    $('#'+index+'edit').val(value);
                    if(index=='image'){
                        $('#imageview').html("<img src='http://inetv4.test/assets/img/products/"+value+"' alt='image' width='180px'><input type='hidden' name='imageeditoriginal' id='imageeditoriginal'/>");
                        $('#imageeditoriginal').val(value);
                    }
                    if(index=='provider_id'){
                        $("#provideredit option[value='"+ value  +"']").attr("selected", true);
                    }
                    if(index=='cfiscal'){
                        $("#cfiscaledit option[value='"+ value  +"']").attr("selected", true);
                    }
                    if(index=='type'){
                        $("#typeedit option[value='"+ value  +"']").attr("selected", true);
                    }
                    if(index=='category'){
                        $("#categoryedit option[value='"+ value  +"']").attr("selected", true);
                    }

              });
              $("#updateProductModal").modal("show");
        }
    });
   }

   function toggleState(id, newState){
    var stateText = newState == 1 ? 'activar' : 'desactivar';
    var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Cambiar estado?',
        text: '¿Está seguro que desea ' + stateText + ' este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, ' + stateText + '!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
      }).then(function(result) {
        if (result.isConfirmed) {
            $.ajax({
                url: "toggleState/"+btoa(id),
                method: "POST",
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    state: newState
                },
                success: function(response){
                        if(response.res==1){
                            Swal.fire({
                                title: 'Estado actualizado',
                                text: 'Producto ' + stateText + 'do correctamente',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              }).then(function(result) {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  location.reload();
                                }
                              })

                        }else if(response.res==0){
                            swalWithBootstrapButtons.fire(
                                'Problemas!',
                                'Algo sucedió y no pudo cambiar el estado del producto, favor comunicarse con el administrador.',
                                'error'
                              )
                        }
            }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No hemos hecho ninguna acción :)',
            'info'
          )
        }
      })
   }

   function deleteproduct(id){
    var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Eliminar?',
        text: "Esta accion no tiene retorno",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminarlo!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
      }).then(function(result) {
        if (result.isConfirmed) {
            $.ajax({
                url: "destroy/"+btoa(id),
                method: "GET",
                success: function(response){
                        if(response.res==1){
                            Swal.fire({
                                title: 'Eliminado',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              }).then(function(result) {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  location.reload();
                                }
                              })

                        }else if(response.res==0){
                            swalWithBootstrapButtons.fire(
                                'Problemas!',
                                'Algo sucedió y no pudo eliminar el cliente, favor comunicarse con el administrador.',
                                'success'
                              )
                        }
            }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No hemos hecho ninguna acción :)',
            'error'
          )
        }
      })
   }

