<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $user = User::create([
            'email' => 'admin@dotfive.co.uk',
            'name' => 'Admin',
            'password' => 'test123'
        ]);

        $role_r = Role::where('name', '=', 'Admin')->firstOrFail();
        $user->assignRole($role_r);

        $user = User::create([
            'email' => 'mark@dotfive.co.uk',
            'name' => 'Mark',
            'password' => 'test123'
        ]);

        $role_r = Role::where('name', '=', 'Admin')->firstOrFail();
        $user->assignRole($role_r);

        $user = User::create([
            'email' => 'sandy@dotfive.co.uk',
            'name' => 'Sandy',
            'password' => 'test123'
        ]);

        $role_r = Role::where('name', '=', 'Admin')->firstOrFail();
        $user->assignRole($role_r);
    }
}
