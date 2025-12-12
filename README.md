# Conference Room Booking Application Demo

Simple demo showing "Testing application" text change deployed through CI/CD pipeline.

## Change Made
- Replaced demo credentials with "Testing application" text in Login component
- Demonstrates clean CI/CD deployment workflow

## Local Testing
```bash
cd infrastructure
docker-compose up -d
```

## AWS Deployment
The application is deployed to AWS with:
- Frontend: http://98.92.32.221
- Backend services on ECS Fargate
- PostgreSQL and DynamoDB databases

This change will be deployed automatically through the CI/CD pipeline.