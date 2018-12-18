@extends('layouts.pdf')

@section('content')
@foreach ($data['checklist']['checks'] as $department => $checklist)
@if ($loop->last)
<div class="pdf-page">
@else
<div class="pdf-page pdf-new-page">
@endif
<table class="layout">
  <tbody>
      <tr>
        <td width="50%">
         <table width="100%">
          <tbody>
              <tr>
                <td width="50%">
                  Job No
                </td>
                <td width="50%">
                  {{ $data['job']['code'] }}
                </td>
              </tr>
              <tr>
                <td>
                  Client
                </td>
                <td>
                  {{ $data['job']['client']['title'] }}
                </td>
              </tr>
              <tr>
                <td>
                  Title
                </td>
                <td>
                  {{ $data['job']['title'] }}
                </td>
              </tr>
              <tr>
                <td>
                  Account Manager
                </td>
                <td>
                  {{ $data['job']['account_manager']['title'] }}
                </td>
              </tr>
              <tr>
                <td>
                  Date
                </td>
                <td>
                  {{ $data['job']['created_at'] }}
                </td>
              </tr>
          </tbody>
        </table>
        </td>
        <td width="50%" align="right">
          <img class="logo" alt="logo" src="{{ $data['tfwLogo'] }}">
        </td>
      </tr>
  </tbody>
</table>
<table class="layout checklist">
  <thead>
    <tr>
      <th class="department" align="left" colspan="2">Department: {{ $department }}</th>
    </tr>
  </thead>
  <tbody>
      @foreach ($checklist as $check)
      <tr>
        <td>{{ $check['content'] }}</td>
        <td><td><div class="checkbox"> </div></td></td>
      </tr>
      @endforeach
  </tbody>
</table>
<hr>
<table class="notes">
  <thead>
    <tr>
      <th class="notes" align="left">Notes: </th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      @if (!empty($data['checklist']['notes']))
      @if (!empty($checklist[0]))
      @isset($data['checklist']['notes'][$checklist[0]['department']['id']]['content'])
      {{ $data['checklist']['notes'][$checklist[0]['department']['id']]['content'] }}
      @endisset
      @endif
      @endif
    </td>
  </tr>
  </tbody>
</table>
</div>
@endforeach
@endsection
