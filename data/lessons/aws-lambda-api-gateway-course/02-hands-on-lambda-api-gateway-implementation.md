---
sectionIndex: 1
name: Lambda and API Gateway Implementation
metaDescription: Complete hands-on tutorial creating an AWS Lambda function for QR code generation, exposing it via API Gateway, and testing your serverless API from external clients.
---

# Lambda and API Gateway Implementation

<lite-youtube videoid="C0S01rnN-Os"></lite-youtube>

# Helpful Resources

- Github Repository: https://github.com/rslim087a/aws-lambda-api-gateway-tutorial
- Docker Course: https://rayanslim.com/course/docker-course


#### json payload:
```
{
  "body": "{\"url\": \"https://www.youtube.com/@RayanSlim087\"}"
}

```

#### curl command:
```
curl -X POST https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/prod/generate -H "Content-Type: application/json" -d '{"url": "https://www.youtube.com/@RayanSlim087"}'
```
#### QR code conversion snippet:
```
const base64 = "PASTE_YOUR_BASE64_HERE";
const img = document.createElement('img');
img.src = 'data:image/png;base64,' + base64;
img.style.width = '300px';
document.body.appendChild(img);
```

# Warning

AWS Lambda runs on **Linux x86_64** or **Linux arm64**. When you install packages with **compiled C/C++ extensions** (like `Pillow`, `numpy`) on Mac or Windows, you get binaries for *your specific* OS, which won't work on the AWS architecture being used to run your function. You need to be mindful of which architecture you install the dependencies before uploading your package. Otherwise, Lambda won't be able to load the incompatible binaries, resulting in `ImportError` or `ModuleNotFoundError` when your function executes. 

**Solution:** Install everything for Linux x86_64 directly.

```bash
pip install \
  --platform manylinux2014_x86_64 \    # Download Linux binaries, not Mac/Windows
  --python-version 3.12 \               # Match Lambda's Python version
  --only-binary=:all: \                 # Use pre-compiled wheels only
  -r requirements.txt -t package/       # Install to package folder
```

**Why each flag matters:**
- `--platform`: Tells pip "pretend you're on Linux x86_64"
- `--python-version`: Ensures binary compatibility with Lambda's runtime
- `--only-binary`: Prevents attempting to compile on your local machine; forces pre-built wheels


The same would apply for Node.js packages containing native C/C++ addons. 

```bash
npm install --arch=x64 --platform=linux
```

However, Pure JavaScript packages (`axios`, `lodash`) work fine with regular `npm install`.


**Most reliable solution for every framework:** use docker and build your image for linux/amd64.


# Key Takeaways

**Lambda as Event-Driven Compute:** AWS Lambda executes your code only in response to events—HTTP requests, file uploads, database changes, or scheduled triggers. Unlike traditional servers running 24/7, Lambda functions spin up when called and shut down when idle. You only pay for actual compute time measured in milliseconds, making it dramatically more cost-effective for workloads with variable traffic.

**Serverless Cost Model:** With Lambda, there's no charge for idle time. Traditional EC2 instances cost $73/month running constantly, even serving zero requests. Lambda charges per invocation and execution duration—the first 1 million requests per month are free, with subsequent requests costing $0.20 per million. For most applications, this translates to near-zero costs during development and low traffic periods.

**API Gateway as HTTP Frontend:** API Gateway acts as the front door to your Lambda functions, translating HTTP requests into Lambda events and responses back to HTTP. It handles SSL/TLS encryption, request validation, rate limiting, and CORS headers automatically. When you enable Lambda proxy integration, API Gateway passes the entire request to your function, giving you full control over the response format.

**Function Configuration Trade-offs:** Lambda memory allocation (128MB to 10GB) determines both RAM and proportional CPU power. More memory means faster execution but higher per-millisecond cost. The timeout setting (1 second to 15 minutes) acts as a safety limit preventing runaway functions from accumulating charges. For QR code generation, 256MB memory and 10-second timeout balance performance with cost.

---


