require 'test_helper'

class ImportancesControllerTest < ActionController::TestCase
  setup do
    @importance = importances(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:importances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create importance" do
    assert_difference('Importance.count') do
      post :create, importance: { importance_ref: @importance.importance_ref, importance_value: @importance.importance_value, user_id: @importance.user_id }
    end

    assert_redirected_to importance_path(assigns(:importance))
  end

  test "should show importance" do
    get :show, id: @importance
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @importance
    assert_response :success
  end

  test "should update importance" do
    put :update, id: @importance, importance: { importance_ref: @importance.importance_ref, importance_value: @importance.importance_value, user_id: @importance.user_id }
    assert_redirected_to importance_path(assigns(:importance))
  end

  test "should destroy importance" do
    assert_difference('Importance.count', -1) do
      delete :destroy, id: @importance
    end

    assert_redirected_to importances_path
  end
end
