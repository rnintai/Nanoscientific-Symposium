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
                 sh "npm install -g yarn"
                 sh "yarn install"
            }
        }
        stage('client-build') {
            steps {
                    dir('client'){
                        sh '''
                        ls -al
                        yarn install
                        echo "REACT_APP_S3_ACCESS_KEY=${REACT_APP_S3_ACCESS_KEY_EXT}\nREACT_APP_S3_SECRET_ACCESS_KEY=${REACT_APP_S3_SECRET_ACCESS_KEY_EXT}\nREACT_APP_PAYPAL_CLIENT_ID=${REACT_APP_PAYPAL_CLIENT_ID_EXT}\nREACT_APP_PAYPAL_CLIENT_ID_DEV=${REACT_APP_PAYPAL_CLIENT_ID_DEV_EXT}" >> .env.production
                        CI=false yarn run build
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
                     yarn install
                     sudo cp -r . /home/ubuntu/server
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
