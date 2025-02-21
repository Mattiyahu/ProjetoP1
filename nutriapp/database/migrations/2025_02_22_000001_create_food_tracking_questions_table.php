<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('food_tracking_questions', function (Blueprint $table) {
            $table->id();
            $table->string('question_text');
            $table->string('question_type'); // text, select, textarea
            $table->string('category'); // meal_tracking, emotional, hydration
            $table->json('answer_options')->nullable(); // For select type questions
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('food_tracking_questions');
    }
};
