<?php


namespace App\Http\Controllers;


class HomeController extends Controller
{
    /**
     * 加载初始页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('home');
    }
}