<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {

            $table->foreignId('category_id')->after('id')->constrained('categories')->onDelete('cascade');


            $table->dropColumn('category');
        });
    }

    public function down()
    {
        Schema::table('products', function (Blueprint $table) {

            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');


            $table->string('category');
        });
    }
};
