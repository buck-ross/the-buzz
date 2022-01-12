#############################################################
# This dockerfile will allow you to build a container image
# which can be easily run on Heroku.
# It works in 2 stages: first, it imports all of the code
# from your project & compiles it in the "builder" stage, and
# then it moves the compiled packages into the release stage.
#
# You can create a new image from this dockerfile by running
# > heroku container:push web && heroku container:release web
#
#############################################################

# Create an intermediary image to run the build scripts:
FROM node:16.3.0-alpine AS builder

# Import all necessary files for the project:
COPY ./database /opt/database
COPY ./backend /opt/backend
COPY ./web /opt/web

# Build the project:
RUN cd /opt/web && \
	npm install && \
	npm run build-prod && \
	cd /opt/database && \
	npm install --only=production && \
	cd /opt/backend && \
	npm install --only=production && \
	adduser -u 1001 -D apprunner && \
	chown -Rv apprunner /opt

#############################################################

# Create the production container image:
FROM node:16.3.0-alpine

# Copy the compiled files:
COPY --from=builder /opt /opt
RUN adduser -u 1001 -D apprunner

# Configure the image:
ENV STATIC_ASSET_DIR=/opt/web/dist
USER apprunner
WORKDIR /opt/backend
CMD npm run start
