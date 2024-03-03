pipeline {
  agent any
  stages {
    stage('login docker') {
      steps {
        script {
          sh 'docker login -u duangkamon -p dckr_pat_opRb6fcxVIwEin5SrH0RRP1lQPg'
        }
      }
    }
    stage('Build image frontend') {
      steps {
        dir('ChaoCarHub/ChaoCarHub/') {
          sh 'docker build -t duangkamon/devtool-frontend:latest .'
        }
      }
    }
    stage('Build image backend') {
      steps {
        dir('ChaoCarHub/Backend/') {
          sh 'docker build -t duangkamon/devtool-backend:latest .'
        }
      }
    }
    stage('Push to docker hub') {
      steps {
        sh 'docker push duangkamon/devtool-backend:latest'
        sh 'docker push duangkamon/devtool-frontend:latest'
      }
    }
    stage('run container') {
      steps {
        sh 'docker run -d -p 80:80 --name frontend duangkamon/devtool-frontend:latest'
        sh 'docker run -d -p 3000:3000 --name backend duangkamon/devtool-backend:latest'
      }
    }
    stage('check docker run image') {
      steps {
        dir('ChaoCarHub') {
          sh "docker ps"
        }
      }
    }
  }
}
