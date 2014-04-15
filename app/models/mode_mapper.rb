class ModeMapper
  
  # Map if mime is not properly set 
  MAPPINGS = { 
    "application/x-ruby" => "text/x-ruby",
    "rdoc" => "markdown",
    "coffee" => "coffeescript",
    "scss" => "sass",
    "application/x-yaml" => "yaml"
    }
    
  BASENAME_MAPPINGS = {
    "Gemfile" => "ruby" ,
    "Capfile" => "ruby" 
  }
  
  def self.get path
    # Set editors mode
    
    mime =  MimeMagic.by_path(path) 
    base = BASENAME_MAPPINGS[File.basename(path)]
    return base if base 
    if mime
      mode = mime.type
    else
      mode = File.extname(path)
      mode.slice!(0) unless mode.empty?
    end
    mode = MAPPINGS[mode] if MAPPINGS[mode]    
    mode
  end
  
end