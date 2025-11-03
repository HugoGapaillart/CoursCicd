pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        echo "Clone repo"
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: '6ecd416d-1e7a-4888-ba66-45c2779f5f7d', url: 'https://github.com/HugoGapaillart/CoursCicd.git']])
      }
    }

    stage('Build') {
      steps {
        echo 'Build project'
        nodejs('node25') {
          sh '''
            npm i
            npm run build
          '''
        }
      }
    }

    stage('Tests') {
      steps {
        echo 'Test'
        nodejs('node25') {
          sh 'npm test'
        }
      }
    }
  } 
}
