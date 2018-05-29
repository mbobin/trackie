class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :token, index: {  unique: true }

      t.timestamps
    end
  end
end
