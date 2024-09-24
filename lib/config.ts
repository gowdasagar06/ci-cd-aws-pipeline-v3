export const config = {
  gitHubUser: 'gowdasagar06',
  gitHubRepo: 'gowdasagar06/matson-hello-world',
  gitHubBranch: 'main',
  codeBuildEnvironmentType: 'LINUX_CONTAINER',
  codeBuildComputeType: 'BUILD_GENERAL1_SMALL',
  codeBuildImage: 'aws/codebuild/amazonlinux2-x86_64-standard:5.0',
  labAccountId: '264852106485',
  sourcestage: 'Source-stage',
  buildstage: 'Build-stage',
 codeStarConnectionArn: 'arn:aws:codeconnections:eu-central-1:264852106485:connection/f124b64a-7530-43d0-9f4b-e0511e7fb78e',
 codeStarRoleArn: 'arn:aws:codeconnections:us-east-1:891377353125:connection/*',
  bucketLifecyclePolicy: {
    id: 'lifecycle-policy',
    status: 'Enabled',
    prefix: 'SourceArti/',
    transitionInDays: 30,
    expirationInDays: 300,
  },
  buildSpecs: {
    lab: 'cdk-matson-cross-account/buildspec.yml',
    // lab: 'buildspec-sratch.yml',
  },

};
