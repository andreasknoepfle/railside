require 'rails/sse'

class FilesController < ApplicationController
  include ActionController::Live
  include Rails::SSE

  def edit
    f = File.open(params[:path], "r")

    @mode = ModeMapper.get params[:path]

    # read file.... pls improve this
    @file = ""
    f.each_line { |line|
      @file += line
    }
    f.close
    respond_to do |format|
      format.js
    end
  end

  def update
    f = File.open(params[:path], "w") { |file| file.write(params[:content]) }
    render :json => true
  end

  def listen

    stream do |channel|
      listener = Listen.to(params[:path]) do |modified, added, removed|
        channel.post({added: added, modified: modified, removed: removed })
      end
      listener.run
      while channel.ping! do
        sleep 1
      end
      # ????? TODO Cleanup
      listener.stop
    end
  end

end
