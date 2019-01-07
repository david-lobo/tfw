@extends('layouts.app')

@section('title', '| Users')

@section('content')
<div id="app" class="pb-5 checks-page">
    <div class="row">
        <div class="col-xs-12 col-md-12 checks">
            {{ Breadcrumbs::render('checks', $data['question']) }}
            <h3 class="my-3">Checks</h3>
            <h5 class="my-3">{{ $data['question']['content'] }}</h5>
            <div class="row">
                @can('Manage')
                <div class="col-9 grid-filters">
                    <!--<button class="gj-button-md" id="btnDestroy">Destroy</button>
                    <button class="gj-button-md" id="btnCreate">Create</button>-->
                    <form class="form-inline">
                         <select id="departmentDropdown" width="200" style="display:none;"></select>

                        <!--<input id="txtName" type="text" placeholder="Name..." class="form-control mb-2 mr-sm-2 mb-sm-0" />
                            <input id="txtPlaceOfBirth" type="text" placeholder="Place Of Birth..." class="form-control mb-2 mr-sm-2 mb-sm-0" />

                            <button id="btnSearch" type="button" class="btn btn-default">Search</button> &nbsp;
                            <button id="btnClear" type="button" class="btn btn-default">Clear</button>-->
                    </form>
                </div>
                <div class="col-3 d-flex justify-content-end toolbar">
                @component('layouts/components/toolbar-buttons', ['buttons' => ['add']])
                @endcomponent
                </div>
            </div>
            @endcan
            <div class="row mt-3">
                <div class="col-12">
                    <table id="checkGrid"></table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
