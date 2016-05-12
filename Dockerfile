FROM node:argon

run npm install
EXPOSE 5005
CMD [ "npm", "start" ]