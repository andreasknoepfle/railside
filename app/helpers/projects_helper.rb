module ProjectsHelper
  def dir_id name
    name.gsub('/','_').gsub(/\W+/,'0')
  end
end
