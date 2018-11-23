<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
    body {
        font-size: 16px;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }

    table.layout {
        width: 100%;
    }
    .checkbox { width: 1em; height: 1em; border: 3px solid black;}
    table.checklist tr > td, table.checklist tr > th {
        padding-top: 0.5em; padding-bottom: 0.5em;
    }

    img.logo {
        width: 300px;
    }

    .department {
        text-transform: uppercase;
    }

    .checklist_view {
        background-color: darkgray;
    }

    .checklist_view .pdf-wrapper {
        width: 1160px;
        margin: 0 auto;
        background: white;
        padding: 30px;
        min-height: 1624px;
    }
    </style>
</head>
<body class="pdf {{ $data['route'] }}">
<div class="pdf-wrapper">
@yield('content')
</div>
</body>
</html>
