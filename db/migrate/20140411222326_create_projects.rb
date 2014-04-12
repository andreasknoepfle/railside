class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :path
      t.string :name

      t.timestamps
    end
  end
end
