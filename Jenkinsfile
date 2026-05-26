pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // Name configured in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --watchAll=false'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building React application...'
                sh 'npm run build'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                sh '''
                    mkdir -p /var/www/staging
                    cp -r build/* /var/www/staging/
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}