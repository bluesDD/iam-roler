#!/usr/bin/env node
'use strict'

import { IAM } from 'aws-sdk';
import { APIError } from './CustomError';

const iam = new IAM();

export class IAMRoleNameCollector {
	roleNames: null | Promise<any>;

	constructor(readonly iam: IAM) {
		this.roleNames = null;
	}

	async fetchRoleNames <T>() : Promise<T> {
		return this.roleNames = await this.iam.listRoles()
			.promise()
			.then(data => {
					return data.Roles.map(roleInfo => {
						return roleInfo.RoleName
					})
			})
			.catch(err => {
					return err;
				}
			)
	}
}

export class AttachedIAMPolicyCollector {
	constructor(readonly iam: IAM) {
	}

	async fetchAttachedPolicies (roleName: string) {
		const params = {	
			RoleName: roleName
		}
		return this.iam.listAttachedRolePolicies(params)
			.promise()
			.then(data => {
				if (data.AttachedPolicies) {
					return data.AttachedPolicies;
				}
			})
			.catch(err => {
				throw new APIError(`${err} , listAttachedRolePolicies request went wrong`)
			});
	}

	async fetchLatestPolicyVersion (policyArn: string ): Promise<any> {
		const params = {
			PolicyArn: policyArn
		}
		try {
			const results = await this.iam.listPolicyVersions(params).promise()
			if (typeof results.Versions !== 'undefined') {
				return results.Versions[0].VersionId;
			} else {
				throw new APIError('listPolicyVersion failed');
			}
		} catch (e) {
			return e;
		}
	}

	async fetchPolicyInfo (policyNames: string[], versionId: string) {
	 	const policyDocument = policyNames.map(async name => {
			var params = {
				PolicyArn: name,
				VersionId: versionId
			};
			try {
				return  await this.iam.getPolicyVersion(params).promise();
			} catch (err) {
				throw new APIError(`${err}  GetPolicy request went wrong`)
			}
		})
		return Promise.all(policyDocument).catch(e => {
			return e;
		}
		);
		// TODO：クラスからポリシドキュメントを返す
	}
}

const isStringArrayAndNotEmpty = (x: any): x is Array<string> => {
	if(x.length > 0) {
		return Array.isArray(x);
	} else {
		return false;
	}
}



const listiampolicy = new AttachedIAMPolicyCollector(iam);
(async () => {
		const policy = await listiampolicy.fetchAttachedPolicies("ec2-role")
		console.log(policy);
		if( isStringArrayAndNotEmpty(policy)) {
		await console.log(2);
	}
	}
)();
