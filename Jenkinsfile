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
                        ls -al
                        npm install
                        echo "REACT_APP_S3_ACCESS_KEY=${REACT_APP_S3_ACCESS_KEY_EXT}\nREACT_APP_S3_SECRET_ACCESS_KEY=${REACT_APP_S3_SECRET_ACCESS_KEY_EXT}\nREACT_APP_PAYPAL_CLIENT_ID=${REACT_APP_PAYPAL_CLIENT_ID_EXT}" >> .env.production
                        CI=false npm run build
                        '''
                }
            }
        }
        stage('client-deploy') {
            steps {
                    dir('client'){
                        sh '''
                        ls -al
                        sudo rm -rf /home/ubuntu/client/dist
                        sudo cp -r ./dist /home/ubuntu/client/dist
                        '''
                }
            }
        }
        stage('server-deploy') {
            steps {
                    dir('server'){
                     sh '''
                     ls -al
                     npm install
                     sudo cp -r . /home/ubuntu/server
                     cd ~/server
                     sudo forever restart index.js
                     '''
                    }
            }
        }
        stage('cleanup-ws') {
            steps{
                cleanWs()
            }
        }
    }
}
