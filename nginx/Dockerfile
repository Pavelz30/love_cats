FROM nginx:latest

ENTRYPOINT ["/bin/sh", "-c", "chown nginx:nginx /tmp/express.sock /tmp/flask.sock && nginx -g 'daemon off;'"]
