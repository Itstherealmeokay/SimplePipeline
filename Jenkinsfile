pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
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
                    # Create staging directory in Jenkins workspace
                    STAGING_DIR="${WORKSPACE}/staging"
                    mkdir -p ${STAGING_DIR}
                    cp -r build/* ${STAGING_DIR}/
                    echo "Deployed to ${STAGING_DIR}"
                    ls -la ${STAGING_DIR}
                '''
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh '''
                    if [ -f "${WORKSPACE}/staging/index.html" ]; then
                        echo "✅ Deployment verified - index.html exists"
                        cat ${WORKSPACE}/staging/index.html
                    else
                        echo "❌ Deployment failed - index.html not found"
                        exit 1
                    fi
                '''
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline completed successfully!'
            echo "Build number: ${BUILD_NUMBER}"
        }
        failure {
            echo '❌ Pipeline failed. Check the logs for details.'
        }
        always {
            echo "Workspace: ${WORKSPACE}"
            echo "Build URL: ${BUILD_URL}"
        }
    }
}