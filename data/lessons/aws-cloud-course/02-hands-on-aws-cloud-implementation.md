---
sectionIndex: 1
name: AWS Cloud Implementation
metaDescription: Complete hands-on tutorial building CloudTask - a full-stack serverless task management app using S3, CloudFront, Cognito, Lambda, API Gateway, and DynamoDB.
---

# AWS Cloud Implementation

<lite-youtube videoid="rO5C4LJ-iNE"></lite-youtube>

# Helpful Resources

- Github Repository: https://github.com/rslim087a/aws-cloud-course-project-files
- Website: https://rayanslim.com/

# Key Takeaways

**S3 Static Website Hosting:** You created an S3 bucket with static website hosting enabled and configured a bucket policy to make all files publicly accessible. This allows browsers to fetch your HTML, CSS, and JavaScript files directly from S3, which automatically scales to handle any traffic volume without managing web servers. The static website hosting feature serves index.html as the default document and handles routing for single-page applications.

**CloudFront Global CDN:** You deployed a CloudFront distribution that caches your S3 content at edge locations worldwide, serving files from the nearest geographic location to reduce latency. The critical configuration step was using the S3 website endpoint (with `-website` in the URL) as the origin, not the S3 REST API endpoint, which enables proper index.html routing. CloudFront automatically provides HTTPS encryption and protects your origin from traffic spikes.

**Cognito User Authentication:** You created a Cognito user pool to manage user registration, login, and session tokens without building your own authentication system. After configuring the app client and enabling the USER_PASSWORD_AUTH flow, users can sign up with email verification and log in to receive JSON Web Tokens (JWT). These tokens are included in the Authorization header of API requests, which API Gateway validates before allowing access to protected endpoints.

**Lambda Serverless Functions:** You built four Lambda functions (CreateTask, GetTasks, UpdateTask, DeleteTask) that execute backend logic without provisioning servers, automatically scaling from zero to thousands of concurrent executions. Each function was configured with an IAM execution role granting permissions to CloudWatch Logs and DynamoDB, plus environment variables storing the table name. The functions receive API Gateway events, process business logic, and return responses that API Gateway forwards to the client.

**API Gateway REST APIs:** You created a REST API with four endpoints (POST /tasks, GET /tasks, PUT /tasks/{taskId}, DELETE /tasks/{taskId}) that route HTTP requests to Lambda functions using proxy integration. Each endpoint was secured with a Cognito authorizer that validates JWT tokens from the Authorization header before invoking Lambda functions. CORS was enabled on all methods to allow browser-based applications to call the API from different domains.

**DynamoDB NoSQL Database:** You created a DynamoDB table with a composite primary key consisting of a partition key (userId) and sort key (taskId), which determines how data is distributed across servers and queried. This design allows efficient queries for all tasks belonging to a specific user, with the partition key distributing data for horizontal scaling and the sort key ordering items within each user's partition. DynamoDB automatically scales read/write capacity and replicates data across availability zones for high availability.

---


