<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
    body {
        font-size: 16px;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }

    .pdf-new-page {
        page-break-after: always;
    }

    hr {
        margin-top: 1.5em;
        margin-bottom: 1.5em;
    }

    table.layout {
        width: 100%;
    }
    .checkbox { width: 1em; height: 1em; border: 3px solid black;}
    table.checklist tr > td, table.checklist tr > th {
        padding-top: 0.5em; padding-bottom: 0.5em;
    }

    table.notes {
        width: 50%;
        color: #6c757d;
        text-align: justify;
    }

    img.logo {
        width: 300px;
    }

    .department {
        text-transform: uppercase;
    }

    .checklist-view {
        background-color: darkgray;
    }

    .checklist-view .pdf-wrapper {
        width: 1160px;
        margin: 0 auto;
        background: white;
        min-height: 1624px;
    }

    .checklist-view .pdf-wrapper .pdf-page {
        min-height: 1624px;
        border-bottom: 5px solid darkgray;
        padding: 30px;
    }
    </style>
</head>
<body class="pdf {{ str_replace('.', '-', $data['route']) }}">
<div class="pdf-wrapper">
@yield('content')
</div>
</body>
</html>
