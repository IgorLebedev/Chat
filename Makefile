install:
	npm ci

build:
	npm build

start-server:
	npm start

start-frontend: 
	make -C frontend start

start:
	make start-frontend & make start-server