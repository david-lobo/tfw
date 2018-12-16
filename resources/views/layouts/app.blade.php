{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">-->
        <!-- Scripts -->
        <script>
            window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
        <script src="https://use.fontawesome.com/9712be8772.js"></script>
    </head>
    <body class="{{ str_replace('.', '-', $data['route'] ?? '') }}">
        <div id="main">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="/"><img class="logo bg-light" alt="TFW" src="{{ asset('images/tfw-logo.png') }}"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        @if (!Auth::guest())
                        @if (!empty($menu))
                        <ul class="navbar-nav mr-auto">
                            @foreach ($menu as $item)
                            <li class="nav-item">
                                <a class="nav-link" href="{{ $item['url'] }}">{{ $item['text'] }}<span class="sr-only"></span></a>
                            </li>
                            @endforeach
                            @role('Admin')
                            @if (!empty($manageMenu))
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Manage</a>
                                <div class="dropdown-menu">
                                    @foreach ($manageMenu as $manageItem)
                                    <a class="dropdown-item {{ $manageItem['active'] ? 'active' : ''}}" href="{{ $manageItem['url'] }}">{{ $manageItem['text'] }}</a>
                                    @endforeach
                                </div>
                            </li>
                            @endif
                            @endrole

                        </ul>
                        @endif
                        @endif
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                @if (Auth::guest())
                                Sign In
                                @else
                                {{ Auth::user()->name }}
                                @endif
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    @if (Auth::guest())
                                    <a class="dropdown-item" href="{{ route('login') }}">Login</a>
                                    <a class="dropdown-item" href="{{ route('register') }}">Register</a>
                                    @else
                                    @role('Admin')
                                    <a class="dropdown-item" href="/users">Admin</a>
                                    @endrole
                                    <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
                                    @endif
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav class="d-none navbar navbar-default navbar-static-top">
                <div class="container">
                    <div class="navbar-header">
                        <!-- Collapsed Hamburger -->
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        </button>
                        <!-- Branding Image -->
                        <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="app-navbar-collapse">
                        <!-- Left Side Of Navbar -->
                        <ul class="nav navbar-nav">
                            <li><a href="{{ url('/') }}">Home</a></li>
                            @if (!Auth::guest())
                            <li><a href="{{ route('posts.create') }}">New Article</a></li>
                            @endif
                        </ul>
                        <!-- Right Side Of Navbar -->
                        <ul class="nav navbar-nav navbar-right bg-dark">
                            <!-- Authentication Links -->
                            @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                            @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        @role('Admin')
                                        <a href="#"><i class="fa fa-btn fa-unlock"></i>Admin</a>
                                        @endrole
                                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        Logout
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                            @endif
                        </ul>
                    </div>
                </div>
            </nav>
            @if(Session::has('flash_message'))
            <div class="container">
                <div class="alert alert-success"><em> {!! session('flash_message') !!}</em>
                </div>
            </div>
            @endif
            @if (count($errors) > 0)
            <div class="container">
                <div class="row justify-content-center mt-3">
                    <div class="col-md-8 col-md-offset-2">
                        @include ('errors.list') {{-- Including error file --}}
                    </div>
                </div>
            </div>
            @endif
            <div class="container">

                @yield('content')
                <div class="test-btns" style="display: none">
                    <button id="testDelete">Delete</button>
                    <button id="testEdit">Edit</button>
                    <button id="testAdd">Add</button>
                    <button id="testBuild">Build</button>
                </div>
            </div>

            <nav class="nav-bottom navbar fixed-bottom navbar-light bg-light text-center">
                <div class="checklist-actionsXXX my-3">
                </div>
            </nav>


        </div>
        <script>
        let config = {};
        @if (isset($data))
        config = {!! json_encode($data, JSON_HEX_TAG) !!};
        @endif
        /*config.endpoints = {
            question: "/d5-api/questions",
            question_all: "/d5-api/questions/all",
            check: "/d5-api/checks",
            check_all: "/d5-api/checks/all",
            category: "/d5-api/categories",
            category_all: "/d5-api/categories/all",
            item: "/d5-api/items"
        };*/

        //config.forms = [];
        config.page = null;
        /*config.data = {
            question: {id: 4}
        };*/

        //config.categories = [];

        const capitalize = (s) => {
          if (typeof s !== 'string') return ''
          return s.charAt(0).toUpperCase() + s.slice(1)
        }

        </script>
        <script src="{{ asset('js/app.js') }}"></script>
        <!--<script src="{{ asset('js/myapp.js') }}"></script>-->
    </body>
</html>
