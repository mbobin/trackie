class Api::V1::PageViewsController < Api::V1::ApplicationController
  def create
    view = project.page_views.build(permitted_params)
    if view.save
      render json: {}, status: :created
    else
      render json: view.errors, status: :error
    end
  end

  private

    def project
      @project ||= Project.find_by!(token: params.dig(:page_view, :project_token))
    end

    def permitted_params
      params.require(:page_view).permit(:path, :referrer, :title)
    end
end
