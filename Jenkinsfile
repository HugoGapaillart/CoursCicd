pipeline {
  agent any

  environment {
    GITHUB_USER = 'HugoGapaillart'
    GITHUB_REPO = 'CoursCicd'
    IMAGE_NAME  = 'todolist'
    BUILD_VERSION = "v${BUILD_NUMBER}"
    REGISTRY = "ghcr.io/${GITHUB_USER}/${IMAGE_NAME}"
    GITHUB_TOKEN = credentials('github-token')// Ton PAT GitHub enregistré dans Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Clone repo"
        git branch: 'main', url: "https://github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
      }
    }

    stage('Build') {
      steps {
        echo 'Build project'
        sh '''
          npm install
          npm run build
        '''
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
        script {
          echo "Build image Docker ${REGISTRY}:${BUILD_VERSION}..."
          dockerImage = docker.build("${REGISTRY}:${BUILD_VERSION}")
        }
      }
    }

    stage('Push to GitHub Packages') {
      steps {
        echo 'Push image Docker to GHCR'
        sh '''
          echo "${GITHUB_TOKEN}" | docker login ghcr.io -u ${GITHUB_USER} --password-stdin
          docker push ${REGISTRY}:${BUILD_VERSION}
          docker tag ${REGISTRY}:${BUILD_VERSION} ${REGISTRY}:latest
          docker push ${REGISTRY}:latest
        '''
      }
    }

    stage('Tag GitHub Repo') {
      steps {
        echo "Tag Git ${BUILD_VERSION}..."
        sh '''
          git config user.email "jenkins@local"
          git config user.name "Jenkins"
          git tag ${BUILD_VERSION}
          git push https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git ${BUILD_VERSION}
        '''
      }
    }
  }

  post {
    success {
      echo "Success : ${BUILD_VERSION}"
    }
    failure {
      echo "Erreur"
    }
  }
}
