<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>崇光科技</title>

    <link href="{{asset('vendor/inspinia/Static_Seed_Project/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('vendor/inspinia/Static_Seed_Project/font-awesome/css/font-awesome.css')}}" rel="stylesheet">

    <link href="{{asset('vendor/inspinia/Static_Seed_Project/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('vendor/inspinia/Static_Seed_Project/css/style.css')}}" rel="stylesheet">

</head>

<body>

<div id="wrapper">

    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">{{ Auth::user()->name }}</strong>
                             </span> <span class="text-muted text-xs block">Art Director <b class="caret"></b></span> </span> </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li>
                                <a href="{{ url('/logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    <i class="fa fa-sign-out"></i> Log out
                                </a>

                                <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </div>
                    <div class="logo-element">
                        IN+
                    </div>
                </li>
                <li class="active">
                    <a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">Main view</span></a>
                </li>
                <li>
                    <a href="minor.html"><i class="fa fa-th-large"></i> <span class="nav-label">Minor view</span> </a>
                </li>
            </ul>

        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                    <form role="search" class="navbar-form-custom" method="post" action="#">
                        <div class="form-group">
                            <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                        </div>
                    </form>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <a href="{{ url('/logout') }}"
                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>

                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>

            </nav>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-xs-12">
                    @if (count($errors->all()) > 0)
                        <div class="alert alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>错误</h4>
                            请检查下面的错误
                            @foreach ($errors->all() as $m)
                                <p>{{ $m }}</p>
                            @endforeach
                        </div>
                    @endif
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>成功</h4>
                            @if(is_array($message))
                                @foreach ($message as $m)
                                    <p>{{ $m }}</p>
                                @endforeach
                            @else
                                {{ $message }}
                            @endif
                        </div>
                    @endif

                    @if ($message = Session::get('error'))
                        <div class="alert alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>错误</h4>
                            @if(is_array($message))
                                @foreach ($message as $m)
                                    <p>{{ $m }}</p>
                                @endforeach
                            @else
                                {{ $message }}
                            @endif
                        </div>
                    @endif

                    @if ($message = Session::get('warning'))
                        <div class="alert alert-warning alert-block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>注意</h4>
                            @if(is_array($message))
                                @foreach ($message as $m)
                                    <p>{{ $m }}</p>
                                @endforeach
                            @else
                                {{ $message }}
                            @endif
                        </div>
                    @endif

                    @if ($message = Session::get('info'))
                        <div class="alert alert-info alert-block">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <h4>提示</h4>
                            @if(is_array($message))
                                @foreach ($message as $m)
                                    <p>{{ $m }}</p>
                                @endforeach
                            @else
                                {{ $message }}
                            @endif
                        </div>
                    @endif
                </div>
            </div>
            <div class="row">
                @yield('content')
            </div>
        </div>
        <div class="footer">
            <div>
                <strong>Copyright</strong> 天津崇光科技有限公司 &copy; 2014-2017
            </div>
        </div>

    </div>
</div>

<!-- Mainly scripts -->
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/jquery-2.1.1.js')}}"></script>
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/bootstrap.min.js')}}"></script>
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/plugins/metisMenu/jquery.metisMenu.js')}}"></script>
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>

<!-- Custom and plugin javascript -->
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/inspinia.js')}}"></script>
<script src="{{asset('vendor/inspinia/Static_Seed_Project/js/plugins/pace/pace.min.js')}}"></script>


</body>

</html>
