<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Repositories\ToDo\ToDoRepositoryInterface;
use App\Repositories\Users\UserRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ToDoController extends Controller
{
    protected $toDoRepository;
    protected $userRepository;
    protected $responseHelper;

    public function __construct(UserRepositoryInterface $userRepository, ToDoRepositoryInterface $toDoRepository, ResponseHelper $responseHelper)
    {
        $this->toDoRepository = $toDoRepository;
        $this->userRepository = $userRepository;
        $this->responseHelper = $responseHelper;
    }

    /**
     * List to do
     *
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function index(Request $request) {
        try {
            $data = $this->toDoRepository->getList(Auth::id());
            foreach ($data as $value) {
                if(isset($value->created_at)) {
                    $date = explode(' ',$value->created_at);
                    $value->created_at = $date[0];
                }
            }
            return $this->responseHelper->success($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function getTaskById(Request $request, $id) {
        try {
            $data = $this->toDoRepository->find($id);
            if(empty($data) || $data->user_id != Auth::id()) {
                return $this->responseHelper->notFound("Not found");
            }
            return $this->responseHelper->success($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Add new to do
     *
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function add(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'status' => 'required|numeric|between:0,3',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        $data = $request->all();
        $data["user_id"] = Auth::id();
        switch ($request['status']) {
            case 0:
                $data["status"] = "対応しない";
                break;
            case 1:
                $data["status"] = "未対応";
                break;
            case 2:
                $data["status"] = "対応中";;
                break;
            case 3:
                $data["status"] = "完了";;
                break;
            default:
                break;
        }
        try {
            $item = $this->toDoRepository->create($data);
            return $this->responseHelper->success($item);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Delete to do
     *
     * @param Request $request
     * @param $id
     * @return \App\Helpers\JsonResponse|void
     */
    public function delete(Request $request, $id) {
        $todo = $this->toDoRepository->find($id);
        if(empty($todo) || $todo->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        try {
            $this->toDoRepository->delete($todo->id);
            return $this->responseHelper->success($todo);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Update to do
     *
     * @param Request $request
     * @param $id
     * @return \App\Helpers\JsonResponse
     */
    public function update(Request $request, $id) {
        $todo = $this->toDoRepository->find($id);
        if(empty($todo) || $todo->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'status' => 'numeric|between:0,3',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        $data = $request->all();
        switch ($request['status']) {
            case 0:
                $data["status"] = "対応しない";
                break;
            case 1:
                $data["status"] = "未対応";
                break;
            case 2:
                $data["status"] = "対応中";;
                break;
            case 3:
                $data["status"] = "完了";;
                break;
            default:
                break;
        }
        try {
            $item = $this->toDoRepository->update($data, $todo->id);
            return $this->responseHelper->success($item);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Get reminder
     *
     * @param Request $request
     * @param $id
     * @return \App\Helpers\JsonResponse
     */
    public function getReminder(Request $request, $id) {
        $todo = $this->toDoRepository->find($id);
        if(empty($todo) || $todo->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        try {
            $data["start"] = $todo->begin;
            $data["end"] = $todo->end;
            return $this->responseHelper->success($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Update reminder
     *
     * @param Request $request
     * @param $id
     * @return \App\Helpers\JsonResponse
     */
    public function updateReminder(Request $request, $id) {
        $todo = $this->toDoRepository->find($id);
        if(empty($todo) || $todo->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        $validator = Validator::make($request->all(), [
            'begin' => 'date_format:Y-m-d H:i:s',
            'end' => 'date_format:Y-m-d H:i:s',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        try {
            $item = $this->toDoRepository->update($request->all(), $todo->id);
            return $this->responseHelper->success($item);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }
}
