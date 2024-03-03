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
        dir('ChaoCarHub/') {
          sh 'docker build -t duangkamon/devtool-frontend:latest .'
        }
      }
    }
    stage('Build image backend') {
      steps {
        dir('Backend/') {
          sh 'pwd'
          sh 'ls -l'
          sh 'docker build -t duangkamon/devtool-backend:latest .'
        }
      }
    }
    stage('Push to docker hub') {
      steps {
        sh 'docker push duangkamon/devtool-frontend:latest'
        sh 'docker push duangkamon/devtool-backend:latest'
      }
    }
    stage('run container') {
      steps {
        sh 'docker-compose up -d'
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
