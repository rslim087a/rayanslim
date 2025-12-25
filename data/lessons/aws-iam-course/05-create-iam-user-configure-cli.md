---
sectionIndex: 2
name: Create IAM User & Configure CLI
metaDescription: Create an IAM user with proper permissions and configure the AWS CLI to authenticate and run AWS commands from your terminal.
---

# Create IAM User & Configure CLI

When you create an AWS account, that's your **root account** - it has complete control over everything. IAM users are separate accounts for everyday work with specific permissions you assign, keeping your root account secure for critical tasks only.

You'll create this IAM user, generate an access key for it, and configure the AWS CLI on your machine to authenticate as that user.

<lite-youtube videoid="QzTkIfQNsVw"></lite-youtube>

## Resources from **Video Description**

AWS Setup Resource: [https://rayanslim.com/course/aws-iam-course](https://rayanslim.com/course/aws-iam-course)

## Key Takeaways

**Root Account vs IAM Users:** Your root account has unrestricted access to everything in AWS. Creating an IAM user with specific permissions keeps your root account safe and follows AWS security best practices.

**Access Keys for CLI:** IAM users authenticate to AWS CLI using access keys (Access Key ID and Secret Access Key). These credentials allow your terminal to make authenticated requests to AWS services.

**AWS CLI Configuration:** The `aws configure` command stores your credentials and default settings locally, enabling you to run AWS commands from your terminal without re-entering credentials each time.

**Principle of Least Privilege:** While this tutorial creates an admin user for learning purposes, in production environments you should grant only the minimum permissions needed for each user's role.

---


