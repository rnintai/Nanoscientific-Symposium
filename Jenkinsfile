pipeline {
    agent any
    tools {
        nodejs "node16"
    }
    stages {
        stage('prepare') {
            steps {
                echo 'prepare'
                 git branch: "main", credentialsId: "github_access_token_chanhyuk", url: 'https://github.com/Park-Systems-web/Nanoscientific-Symposium.git'
                 sh  'ls -al'
            }
        }
        stage('client-build') {
            steps {
                    dir('client'){
                        sh '''
                        'ls -al'
                        "npm install"
                        "CI=false npm run build"
                        '''
                }
            }
        }
        stage('client-deploy') {
            steps {
                    dir('client'){
                        sh '''
                        'ls -al'
                        "sudo rm -rf /home/ubuntu/client/build"
                        "sudo cp -r ./build /home/ubuntu/client/build"
                        '''
                }
            }
        }
        stage('server-deploy') {
            steps {
                    dir('server'){
                     sh '''
                     'ls -al'
                     "npm install"
                     'sudo cp -r . /home/ubuntu/server'
                     '''
                    }
            }
        }

    }
}
