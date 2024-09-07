build-local: 
	@echo "Building local preview..."
	@bundle install
	@echo "Done"

deploy-local: build-local
	@echo "Deploying local preview..."
	@bundle exec jekyll serve --port 4001
