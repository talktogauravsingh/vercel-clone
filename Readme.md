### command to build a build-server image

```bash
docker build -t build-server .
```

### Command to run build-server

```bash

docker run -itd -v /var/www/html/vercel-clone/output:/home/app/__outputs -e GIT_REPOSITORY_URL="https://github.com/talktogauravsingh/multidomain-handling-react-app.git" -e PROJECT_ID="project-two" build-server

```

### Adding --rm flag to automatically remove a container once processes exited

```bash
docker run --rm -itd -v /var/www/html/vercel-clon
e/output:/home/app/__outputs -e GIT_REPOSITORY_URL="https://github.com/talktogauravsingh/multidomain-handling-react-app.git" -e PROJECT_ID="project-third" build-server

```