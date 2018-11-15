<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\Store;
use App\Http\Requests\Task\Update;
use App\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all()->toJson();
    }

    public function store(Store $store)
    {
        $validated = $store->validated();

        Task::create(['title' => $validated['title'], 'body' => $validated['body']]);

        return response()->json(['message' => 'Task created!']);
    }

    public function show($id)
    {
        return Task::findOrFail($id)->toJson();
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();

        return response()->json('Task deleted!');
    }

    public function update(Update $update, $id)
    {
        Task::findOrFail($id)->update($update->all());

        return response()->json('Task updated');
    }
}
