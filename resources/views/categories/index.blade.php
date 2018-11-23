@extends('layouts.app')

@section('title', '| Users')

@section('content')
<div id="app" class="pb-5 categories-page">
    <div class="row">
        <div class="col-xs-12 col-md-12 categories">
            <h3 class="my-3">Categories</h3>
            <div class="row">
                @can('Manage')
                <div class="col-9">
                </div>
                <div class="col-3 d-flex justify-content-end toolbar">
                @component('layouts/components/toolbar-buttons', ['buttons' => ['add']])
                @endcomponent
                </div>
            </div>
            @endcan
            <div class="row mt-3">
                <div class="col-12">
                    <table id="categoryGrid"></table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
