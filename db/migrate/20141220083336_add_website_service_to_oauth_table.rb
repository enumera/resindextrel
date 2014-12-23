class AddWebsiteServiceToOauthTable < ActiveRecord::Migration
  def change
    add_column :oauth_tables, :website_service, :string
  end
end
