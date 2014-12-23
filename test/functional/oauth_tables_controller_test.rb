require 'test_helper'

class OauthTablesControllerTest < ActionController::TestCase
  setup do
    @oauth_table = oauth_tables(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:oauth_tables)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create oauth_table" do
    assert_difference('OauthTable.count') do
      post :create, oauth_table: { secret: @oauth_table.secret, token: @oauth_table.token, user_id: @oauth_table.user_id }
    end

    assert_redirected_to oauth_table_path(assigns(:oauth_table))
  end

  test "should show oauth_table" do
    get :show, id: @oauth_table
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @oauth_table
    assert_response :success
  end

  test "should update oauth_table" do
    put :update, id: @oauth_table, oauth_table: { secret: @oauth_table.secret, token: @oauth_table.token, user_id: @oauth_table.user_id }
    assert_redirected_to oauth_table_path(assigns(:oauth_table))
  end

  test "should destroy oauth_table" do
    assert_difference('OauthTable.count', -1) do
      delete :destroy, id: @oauth_table
    end

    assert_redirected_to oauth_tables_path
  end
end
