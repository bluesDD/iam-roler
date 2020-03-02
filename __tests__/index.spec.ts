import { IAMRoleNameCollector,  } from '../src/index';
import { IAM } from 'aws-sdk';

describe('the test of IAMRoleNameCollector', () => {
	const iam = new IAM;
	const iamRoleNames = new IAMRoleNameCollector(iam);
	it('listrolenames returns string[]', async ()=> {
		const result =  await iamRoleNames.listRoleNames();
		await expect(result).toContain('AWSServiceRoleForSupport');

	})
}) 