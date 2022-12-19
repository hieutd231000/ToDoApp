<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Repositories\Music\MusicRepositoryInterface;
use App\Repositories\ToDo\ToDoRepositoryInterface;
use App\Repositories\Users\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MusicController extends Controller
{
    protected $toDoRepository;
    protected $userRepository;
    protected $responseHelper;
    protected $musicRepository;

    public function __construct(UserRepositoryInterface $userRepository, MusicRepositoryInterface $musicRepository, ToDoRepositoryInterface $toDoRepository, ResponseHelper $responseHelper)
    {
        $this->toDoRepository = $toDoRepository;
        $this->userRepository = $userRepository;
        $this->responseHelper = $responseHelper;
        $this->musicRepository = $musicRepository;
    }

    /**
     * Get list music
     *
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function index(Request $request) {
        try {
            $data = $this->musicRepository->getList(Auth::id());
            return $this->responseHelper->success($data);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * Add new music
     *
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function add(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'link' => 'required|string|max:255',
            'category_id' => 'required|numeric|between:1,4',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        $data = $request->all();
        $data["user_id"] = Auth::id();
        try {
            $item = $this->musicRepository->create($data);
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
        $music = $this->musicRepository->find($id);
        if(empty($music) || $music->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        try {
            $this->musicRepository->delete($music->id);
            return $this->responseHelper->success($music);
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
        $music = $this->musicRepository->find($id);
        if(empty($music) || $music->user_id != Auth::id()) {
            return $this->responseHelper->notFound("Not found");
        }
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'link' => 'string|max:255',
            'artist' => 'string|max:255',
            'category_id' => 'numeric|between:1,4',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        try {
            $item = $this->musicRepository->update($request->all(), $music->id);
            return $this->responseHelper->success($item);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \App\Helpers\JsonResponse|void
     */
    public function getMusicById(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        try {
            $music = $this->musicRepository->find($request["id"]);
            if(empty($music) || $music->user_id != Auth::id()) {
                return $this->responseHelper->notFound("Not found");
            }
            return $this->responseHelper->success($music);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
            return $this->responseHelper->error();
        }

    }
}
