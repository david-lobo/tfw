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
            'email' => 'admin@tfw.co.uk',
            'name' => 'Admin',
            'password' => 'w00lw1ch'
        ]);

        $role_r = Role::where('name', '=', 'Admin')->firstOrFail();
        $user->assignRole($role_r);

        $user = User::create([
            'email' => 'david@davidlobo.co.uk',
            'name' => 'David Lobo',
            'password' => 'w00lw1ch'
        ]);

        $role_r = Role::where('name', '=', 'Subscriber')->firstOrFail();
        $user->assignRole($role_r);

        $user = User::create([
            'email' => 'alex@tfw.co.uk',
            'name' => 'Alex',
            'password' => 'w00lw1ch'
        ]);

        $role_r = Role::where('name', '=', 'Subscriber')->firstOrFail();
        $user->assignRole($role_r);
    }
}
