import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);
      // new Function(this, 'LambdaFunction', {
      //   runtime: Runtime.NODEJS, //using node for this, but can easily use python or other
      //   handler: 'handler.handler',
      //   code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
      //   environment: { "stageName": stageName } //inputting stagename
      // });
   const codeDeployRole = new iam.Role(this, 'CodeDeployRole', {
        roleName: `${this.stackName}-code-deploy-role`, // Add stack name to the role name
        assumedBy: new iam.ServicePrincipal('codedeploy.amazonaws.com'),
        inlinePolicies: {
          CodeDeployPermissions: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                actions: [
                  "ec2:Describe*",
                  "s3:Get*",
                  "s3:List*",
                  "autoscaling:CompleteLifecycleAction",
                  "autoscaling:DeleteLifecycleHook",
                  "autoscaling:PutInstanceInStandby",
                  "autoscaling:PutLifecycleHook",
                  "autoscaling:RecordLifecycleActionHeartbeat",
                  "autoscaling:ResumeProcesses",
                  "autoscaling:SuspendProcesses",
                  "autoscaling:TerminateInstanceInAutoScalingGroup",
                  "cloudwatch:DescribeAlarms",
                  "cloudwatch:PutMetricAlarm",
                  "cloudwatch:DeleteAlarms",
                  "cloudwatch:GetMetricStatistics",
                  "cloudformation:DescribeStacks",
                  "cloudformation:ListStackResources",
                  "cloudformation:DescribeStackResources",
                  "sns:Publish",
                  "sns:ListTopics",
                  "sns:GetTopicAttributes",
                  "lambda:ListFunctions",
                  "lambda:GetFunctionConfiguration",
                  "ecs:DescribeServices",
                  "ecs:DescribeTaskDefinition",
                  "ecs:DescribeTasks",
                  "ecs:ListTasks",
                  "ecs:RegisterTaskDefinition",
                  "ecs:UpdateService",
                  "iam:PassRole"
                ],
                resources: ["*"],
              }),
            ],
          }),
        },
        // environment: { "stageName": stageName }
      });

        
    }
    
    
}
