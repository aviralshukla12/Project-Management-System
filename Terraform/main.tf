terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Create Security Group
resource "aws_security_group" "mern_sg" {
  name        = "mern-app-sg"
  description = "Security group for MERN application"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node.js
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # MongoDB
  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create EC2 Instance
resource "aws_instance" "mern_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name
  
  security_groups = [aws_security_group.mern_sg.name]

  tags = {
    Name = "MERN-Application-Server"
  }

  # Generate Ansible inventory file
  provisioner "local-exec" {
    command = <<-EOT
      echo "[mern_servers]" > ../ansible/inventory.ini
      echo "${self.public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/${var.key_name}.pem" >> ../ansible/inventory.ini
    EOT
  }
}