json.extract! page_view, :id, :created_at, :updated_at
json.url page_view_url(page_view, format: :json)
