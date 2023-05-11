pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'yarn'
            }
        }
        stage('Eslint fix and check') {
            steps {
                sh 'yarn eslint:fix'
            }
        }
        stage('Create Spring Configs Dev file for tests running') {
            steps {
                sh './prepare-tests.sh'
            }
        }
        stage('Run tests') {
            steps {
                sh 'yarn test --watchAll=false'
            }
        }
    }
}


