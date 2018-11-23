@extends('layouts.pdf')

@section('content')
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
                  .........
                </td>
              </tr>
              <tr>
                <td>
                  Client
                </td>
                <td>
                  .........
                </td>
              </tr>
              <tr>
                <td>
                  Title
                </td>
                <td>
                  .........
                </td>
              </tr>
              <tr>
                <td>
                  Account Manager
                </td>
                <td>
                  .........
                </td>
              </tr>
              <tr>
                <td>
                  Date
                </td>
                <td>
                  .........
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
      <th class="department" align="left" colspan="2">Department: Production</th>
    </tr>
  </thead>
  <tbody>

      <tr>
        <td>Confirm cutter laydown with finishing manager and brief repro</td>
        <td><td><div class="checkbox"> </div></td></td>
      </tr>

      <tr>
        <td>Cut out epson, check over for potential issues and give to repro to double check</td>
        <td><td><div class="checkbox"> </div></td></td>
      </tr>

      <tr>
        <td>Ensure job goes to finisher with prototype, PO, Epson with cutter and previous (if applicable)</td>
        <td><td><div class="checkbox"> </div></td></td>
      </tr>

  </tbody>
</table>

@endsection
