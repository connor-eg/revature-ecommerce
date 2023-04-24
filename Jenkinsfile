pipeline {
    agent any
    
    stages {
        stage('Building and create .jar file'){
            steps {
                echo 'Building the .jar file'
                
                //Builds and create our .jar file
                bat 'mvn clean package'
            }
        }
        
        stage('Creating Docker image') {
            steps {
                //Builds the image of our application
                bat 'docker build -t connoreg/ecombackend:latest .'
            }
        }

        stage('Removing old container') {
            steps {
                //Stop any running containers of this image (do not fail if it can't)
                script {
                    try {
                        bat 'docker rm -f ecomback'
                    } catch (Exception err) {
                        echo err.getMessage()
                    }
                }
            }
        }

        stage('Deploying into docker container') {
            steps {
                //Run latest version of image in a container
                bat 'docker run -p 8081:8081 --name ecomback -e spring.ecommerce.url=%spring.ecommerce.url% -e spring.username=%spring.username% -e spring.password=%spring.password% connoreg/ecombackend:latest'
            }
        }
    }
}