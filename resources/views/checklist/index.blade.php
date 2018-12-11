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
      <div class="col-12">

            <h4 class="my-3">Current Checklist</h4>
<ul class="nav nav-tabs" id="myTab1" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab1" data-toggle="tab" href="#home1" role="tab" aria-controls="home" aria-selected="true">Answers</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab1" data-toggle="tab" href="#profile1" role="tab" aria-controls="profile" aria-selected="false">Notes</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab1" data-toggle="tab" href="#contact1" role="tab" aria-controls="contact" aria-selected="false">Print</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent1">
  <div class="tab-pane fade show active mt-3 col-xl-6 pl-0" id="home1" role="tabpanel" aria-labelledby="home-tab">            <div class="summary">
            </div></div>
  <div class="tab-pane fade mt-3 col-xl-6 pl-0" id="profile1" role="tabpanel" aria-labelledby="profile-tab">                <div id="accordion">
            </div></div>
  <div class="tab-pane fade col-xl-6" id="contact1" role="tabpanel" aria-labelledby="contact-tab">
                    <div class="checklist-actions my-3">
                </div>

  </div>
</div>






          </div>
        </div>
<hr class="my-5">
    <div class="row">
      <div class="col-12">

<h4 class="my-3">Edit Checklist</h4>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Main Questions</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Sub-Questions</a>
  </li>
</ul>
<div class="tab-content mt-3" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
    <table id="questionGrid"></table>

  </div>
  <div class="tab-pane fade mt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
       <div class="wizard">
          <div class="alert alert-warning" role="alert">
            Please choose a main question first
          </div>
      </div>
  </div>
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

                <div class="wizardXXX">
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
