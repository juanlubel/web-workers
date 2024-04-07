dev: build push update

build:
	docker build -t registry.spu-labs.dev/webworkers .

push:
	docker push registry.spu-labs.dev/webworkers

update:
	ssh labs 'docker-compose -f /home/ubuntu/apps/juanlubel/docker-compose.yml pull webworker'
	ssh labs 'docker-compose -f /home/ubuntu/apps/juanlubel/docker-compose.yml up -d webworker'

compose:
	scp ./deploy/docker-compose.yml labs:/home/ubuntu/apps/juanlubel