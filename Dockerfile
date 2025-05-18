#this frst container takes all source code and builds it
FROM node:18-alpine as build

WORKDIR /usr/src/app

#copy package files to our work dir
COPY package*.json .

#install dependencies
RUN npm install

#Copy is after npm install as to not trigger a re-install of all dependecies every time source code changes.
COPY . . 

#build all of the ts code in this container
RUN npm run build



#second container will take all the built source code and serve it (on a webserver?)
FROM nginx:stable-alpine as production

ARG NODE_ENV=production
ENV NODE_END=${NODE_ENV}

#WORKDIR /usr/src/app

#copy package files to our work dir
COPY package*.json .

#might add --only=production to this after I fix the dependencies
#RUN npm install

COPY --from=build /usr/src/app/dist/first-app/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
