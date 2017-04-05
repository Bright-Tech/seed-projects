<nav class="navbar-default navbar-static-side" role="navigation">

    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <div class="pull-left" style="margin-right: 10%">
                            <img src="{{asset('assets/img/portrait.png')}}" class="img-circle"
                                 style="max-width: 45px; height: auto;"
                                 alt="User Image">
                        </div>
                        <span class="clear"> <span class="block m-t-xs"> <strong
                                        class="font-bold">{{ Auth::user()->name }}</strong>
                             </span> <small class="text-muted text-xs block"><i class="fa fa-circle text-success"></i> Online</small> </span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li>
                            <a href="{{ url('/logout') }}"
                               onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                <i class="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="logo-element">
                    <div class="dropdown ">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            Bright
                        </a>
                        <ul class="dropdown-menu animated fadeInRight">
                            <li class="text-danger">
                                <a href="{{ url('/logout') }}"
                                   onclick="event.preventDefault();
                                                 document.getElementById('logout-form-web').submit();">
                                    <i class="fa fa-sign-out"></i> Log out
                                </a>

                                <form id="logout-form-web" action="{{ url('/logout') }}" method="POST"
                                      style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>

            </li>

            <li class="{{ Request::is('/') ? 'active' : '' }}">
                <a href="{{ url('/') }}">
                    <i class="fa fa-dashboard"></i>
                    <span class="nav-label"> 控制台 </span>
                </a>
            </li>
            <li>
                <a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">人力资源</span> <span
                            class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="{{ Request::is('staff') ? 'active' : '' }}">
                        <a href="{{ url('staff') }}">
                            <i class="fa fa-group"></i>
                            <span class="nav-label"> 员工管理 </span>
                        </a>
                    </li>
                    <li class="{{ Request::is('department') ? 'active' : '' }}">
                        <a href="{{ url('department') }}">
                            <i class="fa fa-home"></i>
                            <span class="nav-label"> 部门管理 </span>
                        </a>
                    </li>


                </ul>
            </li>
            <li>
                <a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">客户关系</span> <span
                            class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li><a href="{{ url('client') }}">客户管理</a></li>
                    <li><a href="dashboard_2.html">合同管理</a></li>

                </ul>
            </li>
            <li>
                <a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">系统设置</span> <span
                            class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="{{ Request::is('user') ? 'active' : '' }}">
                        <a href="{{ url('user') }}">
                            <i class="fa fa-user"></i>
                            <span class="nav-label"> 管理员管理 </span>
                        </a>
                    </li>

                </ul>
            </li>


        </ul>

    </div>
</nav>

