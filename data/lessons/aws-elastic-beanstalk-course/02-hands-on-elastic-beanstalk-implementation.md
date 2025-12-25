---
sectionIndex: 1
name: Elastic Beanstalk Implementation
metaDescription: Complete hands-on tutorial deploying a Node.js application to AWS Elastic Beanstalk, configuring environment variables, and exploring the infrastructure created automatically.
---

# Elastic Beanstalk Implementation

<lite-youtube videoid="SgwPxZ4YQJs"></lite-youtube>

# Video Description Resources:

- Github Repository: https://github.com/rslim087a/aws-elastic-beanstalk
- Docker Course: https://rayanslim.com/course/docker-course

# Key Takeaways

**Elastic Beanstalk as Platform Abstraction:** Elastic Beanstalk is AWS's Platform as a Service (PaaS) that sits between raw infrastructure (EC2) and serverless (Lambda). Upload your application code and Beanstalk automatically creates EC2 instances, installs dependencies, configures security groups, sets up health monitoring, and manages deployments. What would take 1-2 hours of manual EC2 configuration happens automatically in 5-7 minutes.

**Automatic Infrastructure Provisioning:** Behind the scenes, Beanstalk creates an entire infrastructure stack from a simple ZIP upload. It provisions an EC2 instance with the appropriate runtime (Node.js, Python, Java, etc.), creates security groups allowing HTTP traffic on port 80, attaches a public IP address, configures CloudWatch monitoring, and sets up automated health checks. You get all the benefits of EC2 without touching server configuration files.

**Environment Variables for Configuration:** Beanstalk environments support runtime configuration through environment properties that inject into your application as `process.env` variables. This separates configuration from code—database URLs, API keys, feature flags, and instance identifiers can change per environment (dev, staging, production) without redeploying your application. Changes to environment variables trigger automatic application restarts with zero downtime.

**Single Instance vs Load-Balanced Deployments:** The "Presets" configuration determines infrastructure complexity. Single instance (free tier eligible) creates one EC2 server running your app—perfect for development and testing. Load-balanced deployments create an Auto Scaling Group with multiple EC2 instances behind an Elastic Load Balancer, providing high availability and automatic scaling. For learning environments, single instance avoids unnecessary costs while demonstrating core PaaS concepts.

**Public IP Requirement for Internet Access:** The "Public IP address" setting determines if your application is accessible from the internet. Without it, your EC2 instance remains isolated in the VPC with no external connectivity—localhost only. This checkbox is the difference between a working web application and an unreachable server. In production, load-balanced environments use load balancers for public access instead of directly exposing instances.

**IAM Roles for Service Permissions:** Beanstalk requires two IAM roles—the service role (`aws-elasticbeanstalk-service-role`) allows Beanstalk to create and manage AWS resources on your behalf, while the EC2 instance profile (`aws-elasticbeanstalk-ec2-role`) attaches to your servers, granting them permissions to access CloudWatch logs, S3 deployment artifacts, and other AWS services. These roles follow the principle of least privilege, granting only necessary permissions.

**Mandatory Cleanup to Avoid Charges:** Unlike Lambda's pay-per-invocation model, Beanstalk environments run EC2 instances continuously—even when idle. A single t2.micro instance costs approximately $0.012/hour ($8.64/month if left running). Cleanup requires **both** terminating the environment (stops the EC2 instance and deletes infrastructure) **and** deleting the application (removes the container). Skipping either step can result in unexpected charges from orphaned resources.

---


