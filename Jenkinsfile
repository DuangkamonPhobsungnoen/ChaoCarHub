pipeline {
  agent any
  stages {
    stage('logout') {
      steps {
        script {
          sh 'docker logout'
        }
      }
    }
    stage('login docker') {
      steps {
        script {
          sh 'docker login -u duangkamon -p dckr_pat_opRb6fcxVIwEin5SrH0RRP1lQPg'
        }
      }
    }
    stage('Build docker') {
      steps {
        dir('ChaoCarHub') {
          sh 'docker-compose build'
        }
      }
    }
    stage('Push to docker hub') {
      steps {
        sh 'docker-compose push'
      }
    }
    stage('docker run image') {
      steps {
        dir('ChaoCarHub') {
          sh "docker-compose up -d"
        }
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