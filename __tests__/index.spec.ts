import { IAMRoleNameCollector, AttachedIAMPolicyCollector,  } from '../src/index';
import { IAM } from 'aws-sdk';

const iam = new IAM;

describe('the test of IAMRoleNameCollector', () => {
	const iamRoleNames = new IAMRoleNameCollector(iam);
	it('listrolenames returns string[]', async () => {
		const result =  await iamRoleNames.listRoleNames();
		await expect(result).toContain('AWSServiceRoleForSupport');
	})
})

describe('AttachedIAMPolicyCollector', () => {
	const listPolicies = new AttachedIAMPolicyCollector(iam);

	it('listAttachedPolicies', async () => {
		const result = await listPolicies.listAttachedPolicies('AWSServiceRoleForSupport');
		await expect(result).toContain('AWSSupportServiceRolePolicy');
	})
})