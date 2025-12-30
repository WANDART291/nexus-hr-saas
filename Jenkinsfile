pipeline {
    agent any
    environment {
        IMAGE_NAME = "nexus-hr-api"
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh "docker run --rm ${IMAGE_NAME}:${BUILD_NUMBER} python manage.py test"
                }
            }
        }
    }
}