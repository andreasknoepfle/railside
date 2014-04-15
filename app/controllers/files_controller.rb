class FilesController < ApplicationController
  def edit
    f = File.open(params[:path], "r")

    @mode = ModeMapper.get params[:path]

    # read file.... pls improve this
    @file = ""
    f.each_line { |line|
      @file += line
    }
    f.close
  end

  def update
    f = File.open(params[:path], "w") { |file| file.write(params[:content]) }
    render :json => true
  end

end
