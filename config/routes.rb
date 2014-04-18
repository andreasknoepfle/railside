Railside::Application.routes.draw do
  resources :projects do
    member do
      get 'files'
    end
  end
  resource :file do 
    get 'listen'
  end
  root to: "projects#index"
end
