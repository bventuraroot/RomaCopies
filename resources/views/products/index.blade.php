@php
    $configData = Helper::appClasses();
    use Milon\Barcode\DNS1D;
@endphp

@extends('layouts/layoutMaster')

@section('vendor-style')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/select2/select2.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/formvalidation/dist/css/formValidation.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/flatpickr/flatpickr.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.css') }}" />
    <link rel="stylesheet"
        href="{{ asset('assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/jquery-timepicker/jquery-timepicker.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/pickr/pickr-themes.css') }}" />
@endsection

@section('vendor-script')
    <script src="{{ asset('assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/select2/select2.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/cleavejs/cleave.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/cleavejs/cleave-phone.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/moment/moment.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/flatpickr/flatpickr.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/bootstrap-datepicker/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/jquery-timepicker/jquery-timepicker.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/pickr/pickr.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
@endsection

@section('page-script')
    <script src="{{ asset('assets/js/app-product-list.js') }}"></script>
    <script src="{{ asset('assets/js/forms-product.js') }}"></script>
    <script>
        $(document).ready(function() {
            var codeInput = $('#code');
            var codeInputEdit = $('#codeedit');
            var barcodeDiv = $('#barcode');
            var barcodeDivEdit = $('#barcodeedit');

            if (!codeInput.length || !barcodeDiv.length) {
                console.error('No se encontraron los elementos necesarios');
                return;
            }

            codeInput.on('input', function() {
                var code = $(this).val();
                if (!code) {
                    barcodeDiv.html('');
                    return;
                }
                var url = '{{ url("barcode") }}/' + code;
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(data) {
                        if (data.error) {
                            barcodeDiv.html('<div class="alert alert-danger">Error al generar el código de barras</div>');
                        } else {
                            barcodeDiv.html(data.html);
                        }
                    },
                    error: function() {
                        barcodeDiv.html('<div class="alert alert-danger">Error al generar el código de barras</div>');
                    }
                });
            });

            codeInputEdit.on('input', function() {
                var code = $(this).val();
                if (!code) {
                    barcodeDivEdit.html('');
                    return;
                }
                var url = '{{ url("barcode") }}/' + code;
                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function(data) {
                        if (data.error) {
                            barcodeDivEdit.html('<div class="alert alert-danger">Error al generar el código de barras</div>');
                        } else {
                            barcodeDivEdit.html(data.html);
                        }
                    },
                    error: function() {
                        barcodeDivEdit.html('<div class="alert alert-danger">Error al generar el código de barras</div>');
                    }
                });
            });

            $('#name').on('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
            $('#nameedit').on('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
            $('#codeedit').on('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        });

        var select2marcaredit = $('.select2marcaredit');

        if (select2marcaredit.length) {
            var $this = select2marcaredit;
            $this.wrap('<div class="position-relative"></div>').select2({
                placeholder: 'Seleccionar Marca',
                dropdownParent: $this.parent()
            });
        }

        var select2category = $('.select2category');

        if (select2category.length) {
            var $this = select2category;
            $this.wrap('<div class="position-relative"></div>').select2({
                placeholder: 'Seleccionar Categoría',
                dropdownParent: $this.parent()
            });
        }

        var select2categoryedit = $('.select2categoryedit');

        if (select2categoryedit.length) {
            var $this = select2categoryedit;
            $this.wrap('<div class="position-relative"></div>').select2({
                placeholder: 'Seleccionar Categoría',
                dropdownParent: $this.parent()
            });
        }
    </script>
@endsection

@section('title', 'Productos')

@section('content')
    <div class="card">
        <div class="card-header border-bottom">
            <h5 class="mb-3 card-title">Productos</h5>
            <div class="gap-3 pb-2 d-flex justify-content-between align-items-center row gap-md-0">
                <div class="col-md-4 companies"></div>
            </div>
        </div>
        <div class="card-datatable table-responsive">
            <table class="table datatables-products border-top">
                <thead>
                    <tr>
                        <th>Ver</th>
                        <th>IMAGEN</th>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>PROVEEDOR</th>
                        <th>C. FISCAL</th>
                        <th>TIPO</th>
                        <th>CATEGORIA</th>
                        <th>ESTADO</th>
                        <th>DESCRIPCION</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    @isset($products)
                        @forelse($products as $product)
                            <tr>
                                <td></td>
                                <td><img src="{{ asset('assets/img/products/' . $product->image) }}" alt="image" width="150px">
                                <td>{{ $product->code }}</td>
                                <td>{{ $product->name }}</td>
                                <td>$ {{ $product->price }}</td>
                                <td>{{ $product->nameprovider }}</td>
                                <td>{{ $product->cfiscal }}</td>
                                <td>{{ $product->type }}</td>
                                <td>{{ $product->category ?? 'Sin categoría' }}</td>
                                <td>
                                    @if($product->state == 1)
                                        <span class="badge bg-label-success">Activo</span>
                                    @else
                                        <span class="badge bg-label-danger">Inactivo</span>
                                    @endif
                                </td>
                                <td>{{ $product->description }}</td>
                                <td><div class="d-flex align-items-center">
                                    <a href="javascript: editproduct({{ $product->id }});" class="dropdown-item"><i
                                        class="ti ti-edit ti-sm me-2"></i>Editar</a>
                                    <a href="javascript:;" class="text-body dropdown-toggle hide-arrow"
                                        data-bs-toggle="dropdown"><i class="mx-1 ti ti-dots-vertical ti-sm"></i></a>
                                    <div class="m-0 dropdown-menu dropdown-menu-end">
                                        @if($product->state == 1)
                                            <a href="javascript:toggleState({{ $product->id }}, 0);" class="dropdown-item"><i
                                                class="ti ti-toggle-left ti-sm me-2"></i>Desactivar</a>
                                        @else
                                            <a href="javascript:toggleState({{ $product->id }}, 1);" class="dropdown-item"><i
                                                class="ti ti-toggle-right ti-sm me-2"></i>Activar</a>
                                        @endif
                                        <a href="javascript:deleteproduct({{ $product->id }});" class="dropdown-item"><i
                                                class="ti ti-eraser ti-sm me-2"></i>Eliminar</a>
                                    </div>
                                </div></td>
                            </tr>
                            @empty
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>No hay datos</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            @endforelse
                        @endisset
                    </tbody>
                </table>
            </div>

            <!-- Add product Modal -->
<div class="modal fade" id="addProductModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="p-3 modal-content p-md-5">
        <button type="button" class="btn-close btn-pinned" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-body">
          <div class="mb-4 text-center">
            <h3 class="mb-2">Crear nuevo producto</h3>
          </div>
          <form id="addproductForm" class="row" action="{{Route('product.store')}}" method="POST" enctype="multipart/form-data">
            @csrf @method('POST')
            <input type="hidden" name="iduser" id="iduser" value="{{Auth::user()->id}}">
            <div class="mb-3 col-6">
                <label class="form-label" for="code">Código</label>
                <input type="text" id="code" name="code" class="form-control" placeholder="Codigo del producto" autofocus required/>
            </div>
            <div class="mb-3 col-6">
                <div id="barcode" style="max-width: 200px; margin: 0 auto;"></div>
            </div>
            <div class="mb-3 col-12">
              <label class="form-label" for="name">Nombre Producto</label>
              <input type="text" id="name" name="name" class="form-control" placeholder="Nombre del producto" required/>
            </div>
            <div class="mb-3 col-12">
                <label class="form-label" for="description">Descripcion</label>
                <!--<input type="text" id="description" style="height: 130%" class="form-control" placeholder="Descripcion" aria-label="Descripcion" name="description" />-->
                <textarea id="description" class="form-control" aria-label="Descripcion" name="description" rows="3" cols="46"></textarea>
            </div>
            <div class="mb-3 col-12">
                <label for="marca" class="form-label">Marca</label>
                <select class="select2marca form-select" id="marca" name="marca"
                    aria-label="Seleccionar opcion">
                </select>
            </div>
            <div class="mb-3 col-12">
                <label for="provider" class="form-label">Proveedor</label>
                <select class="select2provider form-select" id="provider" name="provider"
                    aria-label="Seleccionar opcion">
                </select>
            </div>
            <div class="mb-3 col-12">
                <label for="category" class="form-label">Categoría</label>
                <select class="select2category form-select" id="category" name="category" aria-label="Seleccionar categoría">
                    <option value="">Seleccione una categoría</option>
                    <option value="Papeleria">Papelería</option>
                    <option value="Cuadernos y Libretas">Cuadernos y Libretas</option>
                    <option value="Lapices y Boligrafos">Lápices y Bolígrafos</option>
                    <option value="Marcadores y Resaltadores">Marcadores y Resaltadores</option>
                    <option value="Tijeras y Cutter">Tijeras y Cutter</option>
                    <option value="Pegamentos y Adhesivos">Pegamentos y Adhesivos</option>
                    <option value="Reglas y Escuadras">Reglas y Escuadras</option>
                    <option value="Compases y Transportadores">Compases y Transportadores</option>
                    <option value="Cartulinas y Papeles">Cartulinas y Papeles</option>
                    <option value="Carpetas y Organizadores">Carpetas y Organizadores</option>
                    <option value="Calculadoras">Calculadoras</option>
                    <option value="Mochilas y Loncheras">Mochilas y Loncheras</option>
                    <option value="Arte y Manualidades">Arte y Manualidades</option>
                    <option value="Juguetes Educativos">Juguetes Educativos</option>
                    <option value="Utiles de Oficina">Útiles de Oficina</option>
                    <option value="Material de Limpieza">Material de Limpieza</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label for="cfiscal" class="form-label">Clasificación Fiscal</label>
                <select class="select2cfiscal form-select" id="cfiscal" name="cfiscal"
                    aria-label="Seleccionar opcion">
                    <option selected>Seleccione</option>
                    <option value="gravado">Gravado</option>
                    <option value="exento">Exento</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label for="type" class="form-label">Tipo</label>
                <select class="select2type form-select" id="type" name="type" aria-label="Seleccionar opcion">
                    <option selected>Seleccione</option>
                    <option value="directo">Directo</option>
                    <option value="tercero">Tercero</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label class="form-label" for="price">Precio</label>
                <input type="text" id="price" class="form-control" placeholder="$"
                    aria-label="Precio $" name="price" />
            </div>
            <div class="mb-3 col-12">
                <label for="image" class="form-label">Imagen</label>
                <input class="form-control" type="file" id="image" name="image">
            </div>
            <div class="text-center col-12 demo-vertical-spacing">
              <button type="submit" class="btn btn-primary me-sm-3 me-1">Crear</button>
              <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Descartar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

             <!-- Add update Modal -->
<div class="modal fade" id="updateProductModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="p-3 modal-content p-md-5">
        <button type="button" class="btn-close btn-pinned" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-body">
          <div class="mb-4 text-center">
            <h3 class="mb-2">Editar producto</h3>
          </div>
          <form id="addproductForm" class="row" action="{{Route('product.update')}}" method="POST" enctype="multipart/form-data">
            @csrf @method('PATCH')
            <input type="hidden" name="iduser" id="iduser" value="{{Auth::user()->id}}">
            <input type="hidden" name="idedit" id="idedit">
            <div class="mb-3 col-6">
                <label class="form-label" for="codeedit">Código</label>
                <input type="text" id="codeedit" name="codeedit" class="form-control" placeholder="Codigo del producto" autofocus required/>
            </div>
            <div class="mb-3 col-6">
                <div id="barcodeedit" style="max-width: 200px; margin: 0 auto;"></div>
            </div>
            <div class="mb-3 col-12">
              <label class="form-label" for="nameedit">Nombre Producto</label>
              <input type="text" id="nameedit" name="nameedit" class="form-control" placeholder="Nombre del producto" autofocus required/>
            </div>
            <div class="mb-3 col-12">
                <label class="form-label" for="descriptionedit">Descripcion</label>
                <!--<input type="text" id="descriptionedit" class="form-control" placeholder="Descripcion" aria-label="Descripcion" name="descriptionedit" />-->
                <textarea id="descriptionedit" class="form-control" aria-label="Descripcion" name="descriptionedit" rows="3" cols="46"></textarea>
            </div>
            <div class="mb-3 col-12">
                <label for="marcaedit" class="form-label">Marca</label>
                <select class="select2marcaredit form-select" id="marcaredit" name="marcaredit"
                    aria-label="Seleccionar opcion">
                </select>
            </div>
            <div class="mb-3 col-12">
                <label for="provideredit" class="form-label">Proveedor</label>
                <select class="select2provideredit form-select" id="provideredit" name="provideredit"
                    aria-label="Seleccionar opcion">
                </select>
            </div>
            <div class="mb-3 col-12">
                <label for="categoryedit" class="form-label">Categoría</label>
                <select class="select2categoryedit form-select" id="categoryedit" name="categoryedit" aria-label="Seleccionar categoría">
                    <option value="">Seleccione una categoría</option>
                    <option value="Papeleria">Papelería</option>
                    <option value="Cuadernos y Libretas">Cuadernos y Libretas</option>
                    <option value="Lapices y Boligrafos">Lápices y Bolígrafos</option>
                    <option value="Marcadores y Resaltadores">Marcadores y Resaltadores</option>
                    <option value="Tijeras y Cutter">Tijeras y Cutter</option>
                    <option value="Pegamentos y Adhesivos">Pegamentos y Adhesivos</option>
                    <option value="Reglas y Escuadras">Reglas y Escuadras</option>
                    <option value="Compases y Transportadores">Compases y Transportadores</option>
                    <option value="Cartulinas y Papeles">Cartulinas y Papeles</option>
                    <option value="Carpetas y Organizadores">Carpetas y Organizadores</option>
                    <option value="Calculadoras">Calculadoras</option>
                    <option value="Mochilas y Loncheras">Mochilas y Loncheras</option>
                    <option value="Arte y Manualidades">Arte y Manualidades</option>
                    <option value="Juguetes Educativos">Juguetes Educativos</option>
                    <option value="Utiles de Oficina">Útiles de Oficina</option>
                    <option value="Material de Limpieza">Material de Limpieza</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label for="cfiscaledit" class="form-label">Clasificación Fiscal</label>
                <select class="select2cfiscaledit form-select" id="cfiscaledit" name="cfiscaledit"
                    aria-label="Seleccionar opcion">
                    <option selected>Seleccione</option>
                    <option value="gravado">Gravado</option>
                    <option value="exento">Exento</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label for="typeedit" class="form-label">Tipo</label>
                <select class="select2typeedit form-select" id="typeedit" name="typeedit"
                    aria-label="Seleccionar opcion">
                    <option selected>Seleccione</option>
                    <option value="directo">Directo</option>
                    <option value="tercero">Tercero</option>
                </select>
            </div>
            <div class="mb-3 col-6">
                <label class="form-label" for="priceedit">Precio</label>
                <input type="text" id="priceedit" class="form-control" placeholder="$" aria-label="Precio $" name="priceedit" disabled/>
            </div>
            <div class="mb-3 col-6" id="imageview">
            </div>
            <div class="mb-3 col-12">
                <label for="imageedit" class="form-label">Imagen</label>
                <input class="form-control" type="file" id="image" name="image">
            </div>
            <div class="text-center col-12 demo-vertical-spacing">
              <button type="submit" class="btn btn-primary me-sm-3 me-1">Guardar</button>
              <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Descartar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    @endsection
