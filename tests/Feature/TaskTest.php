<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskTest extends TestCase
{
    /**
     * @test
     */
    public function 一覧を取得()
    {
        $tasks = Task::factory()->count(10)->create();
        dd($tasks);
        //$response = $this->getJson('api/tasks');
        //$response = $this->get('/');
        $response->assertOK();
    }
}
//./vendor/bin/phpunit tests/Feature/TaskTest.php