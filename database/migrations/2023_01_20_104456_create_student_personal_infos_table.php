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
        Schema::create('student_personal_infos', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('age');
            $table->text('qualification');
            $table->text('contact_number');
            $table->text('email')->nullable();
            $table->longText('step2Choice')->nullable();
            $table->longText('prefferedCountry')->nullable();
            $table->longText('university')->nullable();
            $table->longText('step4Choice')->nullable();
            $table->longText('passportFrontDocURL')->nullable();
            $table->longText('tempDoc1URL')->nullable();
            $table->longText('tempDoc2URL')->nullable();
            $table->longText('tempDoc3URL')->nullable();
            $table->longText('tempDoc4URL')->nullable();
            $table->longText('tempDoc5URL')->nullable();
            $table->longText('passportBackDocURL')->nullable();
            $table->longText('plusTwoDocURL')->nullable();
            $table->longText('degreeConsolDocURL')->nullable();
            $table->longText('degreeTranscDocURL')->nullable();
            $table->longText('degreeCertDocURL')->nullable();
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
        Schema::dropIfExists('student_personal_infos');
    }
};
