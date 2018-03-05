SHELL:=/bin/bash

export AWS_PROFILE=vova

build:
	npm install
	gulp minify

deploy:
	aws s3 rm s3://flashcardsbot.com/index.html --region eu-central-1
	aws s3 rm s3://flashcardsbot.com/assets/ --recursive --region eu-central-1
	aws s3 cp ./app s3://flashcardsbot.com/ --recursive --region eu-central-1
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id EN9J0IUTM037 --paths '/*'