import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, CodeBuildStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
import * as iam from 'aws-cdk-lib/aws-iam'; // Import iam module
 
export class CiCdAwsPipelineDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    const pipeline = new CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
      pipelineName: 'TestPipeline',
      synth: new CodeBuildStep('Build', {
        input: CodePipelineSource.connection("gowdasagar06/ci-cd-aws-pipeline-v3", 'main', {
          connectionArn: 'arn:aws:codeconnections:eu-central-1:264852106485:connection/f124b64a-7530-43d0-9f4b-e0511e7fb78e',
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      }),
      selfMutation: false,
    });
 
    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "954503069243", region: "ap-south-1" }
    }));
 
    // Create an IAM role for the CodeBuildStep
    const testRole = new iam.Role(this, 'TestRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      inlinePolicies: {
        AssumeRolePolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: ['sts:AssumeRole'],
              resources: [
                'arn:aws:iam::954503069243:role/cdk-hnb659fds-deploy-role-954503069243-ap-south-1',
                'arn:aws:iam::954503069243:role/cdk-hnb659fds-file-publishing-role-954503069243-ap-south-1'
              ],
            }),
          ],
        }),
      },
    });
 
    // Use the created role in the CodeBuildStep
    testingStage.addPre(new CodeBuildStep("Run Unit Tests", {
      commands: ['npm install'],
      role: testRole // Assign the role to the CodeBuildStep
    }));
 
    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));
 
    // const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
    //   env: { account: "954503069243", region: "ap-south-1" }
    // }));
  }
}
