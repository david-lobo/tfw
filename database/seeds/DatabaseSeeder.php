<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Disable all mass assignment restrictions
        Model::unguard();

        $this->call(CategoriesTableSeeder::class);
        $this->call(DepartmentsTableSeeder::class);
        $this->call(QuestionsTableSeeder::class);
        $this->call(ChecksTableSeeder::class);
        $this->call(JobsTableSeeder::class);
        $this->call(JobQuestionTableSeeder::class);
        $this->call(NotesTableSeeder::class);
        //$this->call(CustomersTableSeeder::class);
        //$this->call(CategoriesTableSeeder::class);
       // $this->call(ItemsTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserTableSeeder::class);
        // Re enable all mass assignment restrictions
        Model::reguard();
    }
}
