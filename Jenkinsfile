pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        FRONTEND_IMAGE_NAME = 'frontend-chat'
        BACKEND_IMAGE_NAME = 'backend-chat'
        GITHUB_REPO_URL = 'https://github.com/AdarshTripathi-iiitb/spe_major_project.git'
        DOCKERHUB_CREDENTIALS = credentials('DockerHubCred')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from the GitHub repository
                    git branch: 'master', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh '''
                cd frontend
                docker build -t adarshtripathi1/frontend-chat .
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                cd backend
                docker build -t adarshtripathi1/backend-chat .
                '''
            }
        }

        stage('Testing') {
            steps {
                sh '''
                npm install
                npm run test
                '''
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker tag adarshtripathi1/frontend-chat:latest'
                        sh 'docker push adarshtripathi1/frontend-chat'
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker tag adarshtripathi1/backend-chat:latest'
                        sh 'docker push adarshtripathi1/backend-chat'
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory'
                    )
                }
            }
        }
    }
}