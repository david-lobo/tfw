@extends('layouts.pdf')

@section('content')
<h1>Customer List</h1>
<a href="{{ URL::to('/customers/pdf') }}">Export PDF</a>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    @foreach($data as $customer)
      <tr>
        <td>{{ $customer->id }}</td>
        <td>{{ $customer->name }}</td>
        <td>{{ $customer->email }}</td>
        <td>{{ $customer->phone }}</td>
      </tr>
    @endforeach
      <tr>
        <td colspan="4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a pretium nulla. Quisque vehicula congue quam, ut varius diam luctus ornare. Quisque varius dapibus lorem quis tincidunt. Nulla ac interdum tortor. Suspendisse sit amet ullamcorper mi. Sed vitae elementum purus. Aliquam erat volutpat. Maecenas viverra porttitor magna, vitae porta ipsum dapibus sit amet. Ut feugiat tempus ex, vel pulvinar lorem imperdiet auctor. Suspendisse suscipit nisl a felis porttitor, sit amet sagittis ipsum malesuada. Etiam sed fermentum massa, at suscipit magna. Donec eu posuere odio, id posuere eros. Morbi ultrices rhoncus est nec porta. Etiam et nunc ultricies, semper ligula vel, tempus nulla. Nunc tincidunt auctor dui, at tempor purus.</td>
      </tr>
  </tbody>
</table>
@endsection
