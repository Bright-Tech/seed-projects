<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>INSPINIA | Login</title>

    <link href="{{asset('vendor/inspinia/Static_Full_Version/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('vendor/inspinia/Static_Full_Version/font-awesome/css/font-awesome.css')}}" rel="stylesheet">

    <link href="{{asset('vendor/inspinia/Static_Full_Version/css/animate.css')}}" rel="stylesheet">
    <link href="{{asset('vendor/inspinia/Static_Full_Version/css/style.css')}}" rel="stylesheet">
</head>
<body class="gray-bg">

<div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
        <div>
            <h1 class="logo-name">IN+</h1>
        </div>

        <h3>Welcome to Bright-tech</h3>

        <form class="m-t" role="form" method="POST" action="{{ url('/login') }}">
            {{ csrf_field() }}

            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" placeholder="Username" required autofocus>
                @if ($errors->has('name'))
                    <span class="help-block">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                <input id="password" type="password" class="form-control" name="password"  placeholder="Password" required>
                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group">
                <div class="">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="remember"> Remember Me
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
        </form>
        <p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
    </div>
</div>

<!-- Mainly scripts -->
<script src="{{asset('vendor/inspinia/Static_Full_Version/js/jquery-2.1.1.js')}}"></script>
<script src="{{asset('vendor/inspinia/Static_Full_Version/js/bootstrap.min.js')}}"></script>

</body>

</html>

