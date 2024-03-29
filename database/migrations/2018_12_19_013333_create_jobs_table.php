<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code');
            $table->string('title');

            //$table->integer('question_id')->unsigned()->nullable();
            $table->integer('category_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->integer('account_manager_id')->unsigned();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');

            $table->foreign('account_manager_id')->references('id')->on('account_managers')->onDelete('cascade');

            //$table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->unique(['code']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}
