<?php

use Illuminate\Database\Seeder;
use App\Job;
use App\Question;
use App\Category;
use App\Client;
use App\AccountManager;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jobs')->delete();
        $categoryPackaging = Category::where('alias', '=', str_slug('Packaging - FBB'))->firstOrFail();
        $categoryBoxes = Category::where('alias', '=', str_slug('Boxes'))->firstOrFail();
        $categoryEnvelopes = Category::where('alias', '=', str_slug('Envelopes'))->firstOrFail();
        $isJobDieCut = Question::where('alias', '=', str_slug('Is the job die cut?'))->firstOrFail();
        $isJobCustom = Question::where('alias', '=', str_slug('Is the job a custom process'))->firstOrFail();
        $client = Client::where('alias', '=', str_slug('Acme'))->firstOrFail();

        $accountManager = AccountManager::where('alias', '=', str_slug('Scrooge McDuck'))->firstOrFail();

        DB::table('jobs')->insert(array(
            array(
                'code' => 'LOBOA4ENV01',
                'title'=> 'Lobo A4 Envelopes',
                'question_id' => $isJobDieCut->id,
                'category_id' => $categoryEnvelopes->id,
                'client_id' => $client->id,
                'account_manager_id' => $accountManager->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'code' => 'LOBOBOX01',
                'title'=> 'Lobo Custom Box',
                'question_id' => $isJobDieCut->id,
                'category_id' => $categoryBoxes->id,
                'client_id' => $client->id,
                'account_manager_id' => $accountManager->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
            array(
                'code' => 'LOBOPACK01',
                'title'=> 'Lobo Packaging',
                'question_id' => $isJobCustom->id,
                'category_id' => $categoryPackaging->id,
                'client_id' => $client->id,
                'account_manager_id' => $accountManager->id,
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
            ),
        ));
    }
}
