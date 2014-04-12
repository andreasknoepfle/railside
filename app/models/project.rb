class Project < ActiveRecord::Base
  
  IGNORED = ".git"
  
  def root_hash
    Project.directory_hash(self.path)
  end
  
  def self.directory_hash(path = self.path,name = nil)
    data = {path: path, name: name}
    data[:files] = files = []
    data[:folders] = folders = []
    Dir.entries(path).sort.each do |entry|
      next if (entry == '..' || entry == '.')
      next if (IGNORED.include?(entry))
      next if (entry.start_with?".")
      full_path = File.join(path, entry)
      if File.directory?(full_path)
        folders << { name:entry , path: full_path, children: Dir.entries(full_path).any? }
      else
        files << { name: entry, path: full_path }
      end
    end
    return data
  end
end
