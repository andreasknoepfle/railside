Railside::Application.routes.draw do
  resources :projects do
    member do
      get 'files'
    end
  end
  resource :file
end
