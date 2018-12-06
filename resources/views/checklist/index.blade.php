@extends('layouts.app')

@section('title', '| Users')

@section('content')

<div id="app" class="pb-5 checks-page">
    <div class="row">
        <div class="col-xs-12 col-md-12">
        {{ Breadcrumbs::render('checklist', $data['job']) }}
        </div>
    </div>
    <div class="row">
        <div class="col-7 checks">
            <div class="row mt-3">
                <div class="col-12">
                    <h4 class="mb-3">Main Questions</h4>
                    <table id="questionGrid"></table>
                </div>
            </div>
        </div>
        <div class="col-5 mt-3 notes">
            <h4 class="my-3">Checklist detail</h4>
            <div class="summary">
            </div>
            <h4 class="my-3">Notes</h4>
            <div id="accordion">
            </div>


        </div>
</div>

</div>



      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Questions</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="wizard">
                </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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


<script id="mustacheTemplate_notes_card" type="text/template">
  <div class="card">
    <div class="card-header" id="heading{{ department.id }}">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse{{ department.id }}" aria-expanded="true" aria-controls="collapse{{ department.id }}">
          {{ department.title }}
        </button>
      </h5>
    </div>

    <div id="collapse{{ department.id }}" class="collapse" aria-labelledby="heading{{ department.id }}" data-parent="#accordion">
      <div class="card-body">
        <form class="save-form d-inline" method="{{ save_form_method }}">
            <input type="hidden" name="note_id" value="{{ note.id }}" />
            <input type="hidden" name="department_id" value="{{ department.id }}" />
            <input type="hidden" name="job_id" value="{{ job.id }}" />
          <div class="form-group">
            <textarea name="content" class="form-control" id="exampleFormControlTextarea1" rows="3">{{ note.content }}</textarea>
          </div>


        <button data-action="save" type="submit" class="btn btn-secondary save ml-1 d-none"><i class="fa fa-pencil-square-o pr-1" aria-hidden="true"></i>Save</button>
        </form>
        <form class="delete-form d-inline d-none" method="DELETE">
            <input type="hidden" name="note_id" value="{{ note.id }}" />
        <button data-action="delete" type="submit" class="btn btn-secondary delete ml-1 d-none"><i class="fa fa-minus-circle pr-1" aria-hidden="true"></i>Delete</button>
        </form>
      </div>
    </div>
  </div>
</script>
@endverbatim
@endsection
