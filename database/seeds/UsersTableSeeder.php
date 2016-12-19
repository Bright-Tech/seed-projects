<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $model = new User();
        $model->name = 'admin';
        $model->email = 'example@123.com';
        $model->password = bcrypt('password');
        $model->save();
    }
}
