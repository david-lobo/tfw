@extends('layouts.app')

@section('title', '| Users')

@section('content')
<div id="app" class="pb-5 questions-page">
    <div class="row">
        <div class="col-xs-12 col-md-12 questions">
            {{ Breadcrumbs::render('subquestions', $data['question']) }}
            <h3 class="my-3">Sub-Questions: {{ $data['question']['id']}}</h3>
            <h5 class="my-3">{{ $data['question']['content'] }}</h5>

            <div class="row toolbar">
                @can('Manage')
                <div class="col-3 d-flex justify-content-start">
                    <button data-action="check" type="button" class="btn btn-primary check"><i class="fa fa-list pr-1" aria-hidden="true"></i>Checks</button>
                </div>
                <div class="col-9 d-flex justify-content-end">
                @component('layouts/components/toolbar-buttons', ['buttons' => ['add', 'edit', 'delete']])
                @endcomponent
                </div>

            </div>
            @endcan
            <div class="row mt-3">
                <div class="col-12">
                    <div id="questions"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
