import { IAMRoleNameCollector, AttachedIAMPolicyCollector,  } from '../src/index';
import { APIError } from '../src/CustomError';
import { IAM } from 'aws-sdk';

const iam = new IAM;

describe('the test of IAMRoleNameCollector', () => {
	const iamRoleNames = new IAMRoleNameCollector(iam);
	it('listrolenames returns string[]', async () => {
		const result =  await iamRoleNames.fetchRoleNames();
		await expect(result).toContain('AWSServiceRoleForSupport');
	})
})

describe('AttachedIAMPolicyCollector', () => {
	const listPolicies = new AttachedIAMPolicyCollector(iam);

	it('listAttachedPolicies', async () => {
    const result = await listPolicies.fetchAttachedPolicies('AWSServiceRoleForSupport');
    if (result) {      
      await expect(result[0].PolicyArn).toContain('arn:aws:iam::aws:policy/aws-service-role/AWSSupportServiceRolePolicy');
    }
	})
})

describe('APIErrorr', () => {
	it('api response error', async () => {
		const testErrorMessage = 'API Response went wrong'; 
		const apiError = new APIError(testErrorMessage);
		expect(apiError).toBeInstanceOf(Error);
		expect(apiError.message).toBe(testErrorMessage);
	})
})
