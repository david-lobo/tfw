<?php $disabledAttr = isset($disabled) ? 'disabled="disabled" ' : ''; ?>

@foreach ($buttons as $button)
    @if ($button === 'add')
    <button <?php echo $disabledAttr; ?> data-action="add" type="button" class="btn btn-secondary add ml-1"><i class="fa fa-plus-circle pr-1" aria-hidden="true"></i>Add</button>
    @elseif ($button === 'edit')
    <button <?php echo $disabledAttr; ?> data-action="update" type="button" class="btn btn-secondary edit ml-1"><i class="fa fa-pencil-square-o pr-1" aria-hidden="true"></i>Edit</button>
    @elseif ($button === 'delete')
    <button <?php echo $disabledAttr; ?> data-action="delete" type="button" class="btn btn-secondary delete ml-1"><i class="fa fa-minus-circle pr-1" aria-hidden="true"></i>Delete</button>
    @endif
@endforeach
