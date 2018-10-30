@extends('layouts.app')

@section('title', '| Users')

@section('content')
            <div id="app" class="pb-5">
            <div class="row">
                <div class="col-xs-12 col-md-7 categories">
                    <h3 class="my-3">Categories</h3>

                    <div class="row">
                      @can('Manage')
                        <div class="col-12 py-3 text-right crud">
                            <button type="button" class="btn btn-secondary add" data-toggle2="modal" data-target2="#categoryModal" data-action="add" data-entity="category"><i class="fa fa-plus-circle pr-1" aria-hidden="true"></i>Add</button>
                            <button type="button" class="btn btn-secondary edit" data-toggle="modal" data-target="#categoryModal" data-action="edit" data-entity="category"><i class="fa fa-pencil-square-o pr-1" aria-hidden="true"></i>Edit</button>
                            <button type="button" class="btn btn-danger delete" data-action="delete" data-entity="category"><i class="fa fa-minus-circle pr-1" aria-hidden="true"></i>Delete</button>
                        </div>
                        @endcan
                        <div class="col-12">
                            <div id="categories"></div>
                        </div>
                    </div>

                </div>
                <div class="col-xs-12 col-md-5 items">
                    <h3 class="my-3">Items</h3>
                    <div class="row">
                      @can('Manage')
                        <div class="col-12 py-3 text-right crud">
                            <button type="button" class="btn btn-secondary add" data-action="add" data-entity="item"><i class="fa fa-plus-circle pr-1" aria-hidden="true"></i>Add</button>
                            <button type="button" class="btn btn-secondary edit" data-action="edit" data-entity="item"><i class="fa fa-pencil-square-o pr-1" aria-hidden="true"></i>Edit</button>
                            <button type="button" class="btn btn-danger delete" data-action="delete" data-entity="item"><i class="fa fa-minus-circle pr-1" aria-hidden="true"></i>Delete</button>
                        </div>
                        @endcan
                        <div class="col-12">
                            <div id="items"></div>
                        </div>
                    </div>
                </div>
            </div>



            <!--<div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="categoryModalLabel">New Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <input type="hidden" name="action" value="" />
          <div class="form-group title" data-validation-name="title">
            <label for="category-title" class="col-form-label">Title:</label>
            <input name="title" type="text" class="form-control" id="category-title">
          </div>
          <div class="form-group parent_id" data-validation-name="parent_id">
            <label for="category-parent">Parent Category</label>
            <select name="parent" multiple class="form-control categories-select" id="category-parent" data-live-search="true">
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary save">Save</button>

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>-->

@verbatim
<script id="mustacheTemplate_successContent" type="text/template">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
</svg>
<p class="success my-3">{{title}}</p>
<p class="message">{{message}}</p>
</script>
<script id="mustacheTemplate_errorContent" type="text/template">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
  <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
  <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
  <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
</svg>
<p class="error my-3">{{title}}</p>
<p class="message ">{{message}}</p>
</script>
<script id="mustacheTemplate_categoryForm" type="text/template">
<form>
    <input type="hidden" name="action" value="{{action}}" />
    <input type="hidden" name="type" value="{{type}}" />
  <div class="form-group title" data-validation-name="title">
    <label for="category-title" class="col-form-label">Title:</label>
    <input name="title" type="text" class="form-control" id="category-title">
  </div>
  <div class="form-group {{category_select_id}}" data-validation-name="{{category_select_id}}">
    <label for="category-select">{{category_select_label}}</label>
    <select name="parent" multiple class="form-control categories-select" id="category-select" data-live-search="true">
    </select>
  </div>
</form>
</script>
@endverbatim
@endsection
