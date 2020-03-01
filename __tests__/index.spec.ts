import { IAMRoleNameCollector } from '../src/index';
import { IAM } from 'aws-sdk';

describe('the test of IAMRoleNameCollector', () => {
	const iam = new IAM;
	const iamRoleNames = new IAMRoleNameCollector(iam);
	it('test', async ()=> {
		const result =  await iamRoleNames.listRoleNames();
		expect(result).toContain('ec2-role');

	})
}) 