<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Repositories\Users\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;
    protected $responseHelper;

    /**
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository, ResponseHelper $responseHelper)
    {
        $this->userRepository = $userRepository;
        $this->responseHelper = $responseHelper;
    }

    /**
     * Check repository function
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return $this->userRepository->listAll();
    }

    /**
     * @param Request $request
     * @return \App\Helpers\JsonResponse
     */
    public function processSignup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        try {
            $this->userRepository->create($data);
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
    public function processLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()) {
            return $this->responseHelper->validation($validator->errors());
        }
        $user_data = array(
            'email' => $request->get("email"),
            'password' => $request->get("password"),
        );
        if(Auth::attempt($user_data)){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            return $this->responseHelper->success($success);
        }
        else{
            return $this->responseHelper->unAuthenticated();
        }
    }
}
