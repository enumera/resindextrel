require 'test_helper'

class DifficultiesControllerTest < ActionController::TestCase
  setup do
    @difficulty = difficulties(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:difficulties)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create difficulty" do
    assert_difference('Difficulty.count') do
      post :create, difficulty: { difficulty_ref: @difficulty.difficulty_ref, difficulty_value: @difficulty.difficulty_value, user_id: @difficulty.user_id }
    end

    assert_redirected_to difficulty_path(assigns(:difficulty))
  end

  test "should show difficulty" do
    get :show, id: @difficulty
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @difficulty
    assert_response :success
  end

  test "should update difficulty" do
    put :update, id: @difficulty, difficulty: { difficulty_ref: @difficulty.difficulty_ref, difficulty_value: @difficulty.difficulty_value, user_id: @difficulty.user_id }
    assert_redirected_to difficulty_path(assigns(:difficulty))
  end

  test "should destroy difficulty" do
    assert_difference('Difficulty.count', -1) do
      delete :destroy, id: @difficulty
    end

    assert_redirected_to difficulties_path
  end
end
