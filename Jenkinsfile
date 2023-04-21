pipeline {
    agent any
    
    stages {
        stage('Building and create .jar file'){
            steps {
                echo 'Building the .jar file'
                
                //Builds and create our .jar file
                sh 'mvn clean package'
            }
        }
        
        stage('Creating Docker image') {
            steps {
                //Builds the image of our application
                sh 'sudo docker build -t connoreg/ecombackend:latest .'
            }
        }

        stage('Removing old container') {
            steps {
                //Stop any running containers of this image (do not fail if it can't)
                script {
                    try {
                        sh 'sudo docker rm -f $(sudo docker ps -af name=p2back -q)'
                    } catch (Exception err) {
                        echo err.getMessage()
                    }
                }
            }
        }

        stage('Deploying into docker container') {
            steps {
                //Run latest version of image in a container
                sh 'sudo docker run $dockerrunflags -p 4798:4798 --name p2back -e spring.ecommerce.url=$spring.ecommerce.url -e spring.username=$spring.username -e spring.password=$spring.password connoreg/p2backend:latest'
            }
        }
    }
}