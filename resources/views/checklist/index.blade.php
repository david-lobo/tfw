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
      <div class="accordion" id="checkListAccordion">
        <div class="card">
          <div class="card-header" id="headingOneCLA">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOneCLA" aria-expanded="true" aria-controls="collapseOneCLA">
              <i class="fa fa-file-text-o"></i> View Checklist
              </button>
            </h5>
          </div>
          <div id="collapseOneCLA" class="collapse show" aria-labelledby="headingOneCLA" data-parent="#checkListAccordion">
            <div class="card-body">
              <ul class="nav nav-tabs" id="viewTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="detailsTab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected="true">Job</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" id="answersTab" data-toggle="tab" href="#answers" role="tab" aria-controls="answers" aria-selected="true">Answers</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="notesTab" data-toggle="tab" href="#notes" role="tab" aria-controls="notes" aria-selected="false">Notes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="printTab" data-toggle="tab" href="#print" role="tab" aria-controls="print" aria-selected="false">Print</a>
                </li>
              </ul>
              <div class="tab-content" id="viewTabContent">
                <div class="tab-pane fade show active mt-3 col-xl-6 pl-0" id="details" role="tabpanel" aria-labelledby="detailsTab">
                  <div class="details">
                  </div>
                </div>
                <div class="tab-pane fade show mt-3 col-xl-6 pl-0" id="answers" role="tabpanel" aria-labelledby="answersTab">
                  <div class="summary">
                  </div>
                </div>
                <div class="tab-pane fade mt-3 col-xl-6 pl-0" id="notes" role="tabpanel" aria-labelledby="notesTab">
                  <div id="accordion">
                  </div>
                </div>
                <div class="tab-pane fade col-xl-6" id="print" role="tabpanel" aria-labelledby="printTab">
                  <div class="checklist-actions my-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwoCLA">
            <h5 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwoCLA" aria-expanded="false" aria-controls="collapseTwoCLA">
              <i class="fa fa-pencil-square-o"></i>  Edit Checklist
              </button>
            </h5>
          </div>
          <div id="collapseTwoCLA" class="collapse" aria-labelledby="headingTwoCLA" data-parent="#checkListAccordion">
            <div class="card-body">
              <ul class="nav nav-tabs" id="editTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="mainQuestionsTab" data-toggle="tab" href="#mainQuestions" role="tab" aria-controls="mainQuestions" aria-selected="true">Main Questions</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="subQuestionsTab" data-toggle="tab" href="#subQuestions" role="tab" aria-controls="subQuestions" aria-selected="false">Sub-Questions</a>
                </li>
              </ul>
              <div class="tab-content mt-3" id="editTabContent">
                <div class="tab-pane fade show active" id="mainQuestions" role="tabpanel" aria-labelledby="mainQuestionsTab">
                  <table id="questionGrid"></table>
                </div>
                <div class="tab-pane fade mt-3" id="subQuestions" role="tabpanel" aria-labelledby="subQuestionsTab">
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
      </div>
    </div>
  </div>
  <hr class="my-5">
  <div class="row">
    <div class="col-12">
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
