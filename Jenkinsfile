pipeline { 
    agent any
    
    tools { 
        nodejs 'node'
    }

    environment {
        REGISTRY = 'ghcr.io'
        REPO_OWNER = 'hugogapaillart'
        REPO_NAME = 'courscicd'
        IMAGE = "${REGISTRY}/${REPO_OWNER}/${REPO_NAME}"
        VERSION = 'build-${env.BUILD_NUMBER}'
    }

    stages { 
        stage('Checkout') { 
            steps { 
                echo "Clone repo" 
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitToken', url: 'https://github.com/HugoGapaillart/CoursCicd']])
            } 
        } 
        stage('Build') { 
            steps { 
                echo 'Build project' 
                sh ''' npm install 
                npm run build ''' 
            } 
        } 
        stage('Tests') { 
            steps { 
                echo 'Test' 
                sh 'npm test'
            } 
        } 
        stage('Build Docker Image') {
            steps { 
              echo "Build Docker image"
              sh 'docker build -t ${IMAGE}:${VERSION} .'
            }
        }
    }
}