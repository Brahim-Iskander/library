pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'master',
                url: 'https://github.com/Brahim-Iskander/library.git'
            }
        } 
        stage('Build Docker Image') {
            steps { 
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }

    }
}