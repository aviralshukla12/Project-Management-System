variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.medium"
}

variable "ami_id" {
  description = "Ubuntu AMI ID"
  default     = "ami-0c7217cdde317cfec"  # Ubuntu 22.04 in us-east-1
}

variable "key_name" {
  description = "SSH key name"
  type        = string
}