class CreateOauthTables < ActiveRecord::Migration
  def change
    create_table :oauth_tables do |t|
      t.integer :user_id
      t.string :token
      t.string :secret

      t.timestamps
    end
  end
end
