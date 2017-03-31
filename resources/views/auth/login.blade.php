<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login</title>

    <link href="{{asset('/css/app.css')}}" rel="stylesheet">
</head>
<body class="gray-bg">

<div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
        <div style="margin-top: 40%;">
            <h2 class="">崇光内容管理系统</h2>
        </div>

        <h3>Welcome to Bright-Tech CMS</h3>

        <form class="m-t" role="form" method="POST" action="{{ url('/admin/login') }}">
            {{ csrf_field() }}

            <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                <input id="name" type="text" class="form-control" name="name" value="{{ old('username') }}" placeholder="Username" required autofocus>
                @if ($errors->has('username'))
                    <span class="help-block">
                        <strong>{{ $errors->first('username') }}</strong>
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
        <p class="m-t"> <small>天津崇光科技有限公司 &copy; 2014</small> </p>
    </div>
</div>

<!-- Mainly scripts -->
<script src="{{asset('/js/app.js')}}"></script>

</body>

</html>

