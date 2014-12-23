class OauthTable < ActiveRecord::Base
  attr_accessible :secret, :token, :user_id, :website_service

  has_one :user
end
