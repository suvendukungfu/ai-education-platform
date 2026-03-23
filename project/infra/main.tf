provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "axion_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "Axion-Sovereign-VPC"
  }
}

resource "aws_ecs_cluster" "axion_cluster" {
  name = "axion-divinity-cluster"
}

resource "aws_db_instance" "axion_db" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  name                 = "axionsovereigndb"
  username             = "axionadmin"
  password             = "OrbitalSecurity2026"
  skip_final_snapshot  = true
}

resource "aws_s3_bucket" "axion_assets" {
  bucket = "axion-global-assets-2026"
  acl    = "private"
}
