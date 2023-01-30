<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_volunteers', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('designation');
            $table->longText('image_url')->nullable();
            $table->longText('description')->nullable();
            $table->boolean('delete_status')->default(false);
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
        Schema::dropIfExists('student_volunteers');
    }
};
