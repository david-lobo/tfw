@extends('layouts.app')

@section('title', '| Users')

@section('content')
<div id="app" class="pb-5 checks-page">
    <div class="row">
        <div class="col-xs-12 col-md-12 checks">
            <h3 class="my-3">Checklist</h3>

            <div class="row">

            <div class="row mt-3">
                <div class="col-12">
                    <table id="questionGrid"></table>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5 wizard">
<div id="smartwizardWrapper" style="display: none;">
</div>
<div id="smartwizard">
    <!--<ul>
        <li><a href="#step-1">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-2">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-3">Step Title<br /><small>Step description</small></a></li>
        <li><a href="#step-4">Step Title<br /><small>Step description</small></a></li>
    </ul>

    <div>
        <div id="step-1" class="">
            Step Content
        </div>
        <div id="step-2" class="">
            Step Content
        </div>
        <div id="step-3" class="">
            Step Content
        </div>
        <div id="step-4" class="">
            Step Content
        </div>
    </div>-->
</div>



            </div>
        </div>
    </div>
</div>
@verbatim
<script id="mustacheTemplate_wizard_item" type="text/template">
<li><a href="#{{step_id}}">{{step_title}}<br /><small>{{step_description}}</small></a></li>
</script>
<script id="mustacheTemplate_wizard_content" type="text/template">
<div id="{{step_id}}" class="">
    <p>{{step_content}}</p>
    <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="questions[{{question_id}}]" id="inlineRadio1" value="1">
  <label class="form-check-label" for="inlineRadio1">Yes</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="questions[{{question_id}}]" id="inlineRadio2" value="0">
  <label class="form-check-label" for="inlineRadio2">No</label>
</div>
<div class="invalid-feedback">
Please select yes or no
</div>
</div>
</script>
@endverbatim
@endsection
