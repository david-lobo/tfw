<?php

use Illuminate\Database\Seeder;
use App\Category;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('model_has_permissions')->delete();
        DB::table('model_has_roles')->delete();
        DB::table('role_has_permissions')->delete();
        DB::table('permissions')->delete();
        DB::table('roles')->delete();

        $permissionAdmin = new Permission();
        $permissionAdmin->name = 'Administer roles & permissions';
        $permissionAdmin->save();

        $permissionView = new Permission();
        $permissionView->name = 'View';
        $permissionView->save();

        $permissionManage = new Permission();
        $permissionManage->name = 'Manage';
        $permissionManage->save();

        $roleAdmin = new Role();
        $roleAdmin->name = 'Admin';
        $roleAdmin->save();

        $roleSubscriber = new Role();
        $roleSubscriber->name = 'Subscriber';
        $roleSubscriber->save();

        $roleAdmin->givePermissionTo($permissionAdmin);
        $roleAdmin->givePermissionTo($permissionView);
        $roleAdmin->givePermissionTo($permissionManage);

        $roleSubscriber->givePermissionTo($permissionView);
    }
}
