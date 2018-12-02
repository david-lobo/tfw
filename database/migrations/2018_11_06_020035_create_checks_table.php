<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChecksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checks', function (Blueprint $table) {
            $table->increments('id');
            $table->text('content');
            $table->string('alias');
            $table->integer('priority')->unsigned()->default(1);
            $table->integer('question_id')->unsigned();
            $table->integer('department_id')->unsigned();
            $table->unsignedTinyInteger('answer')->default(0);
            $table->timestamps();

            $table->unique(['alias']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('checks');
    }
}
