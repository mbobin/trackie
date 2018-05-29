class CreatePageViews < ActiveRecord::Migration[5.2]
  def change
    create_table :page_views do |t|
      t.string :title
      t.string :path
      t.string :referrer
      t.references :project

      t.timestamps
    end
  end
end
