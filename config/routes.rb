Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "projects#index"
  resources :projects
  resources :page_views, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :page_views, only: :create
    end
  end
end
