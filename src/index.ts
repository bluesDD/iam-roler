#!/usr/bin/env node
'use strict'

import { IAM } from 'aws-sdk';
import { APIError } from './CustomError';
import { isArray, isUndefined } from 'util';

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

	async fetchAttachedPolicyArns (roleName: string) {
		const params = {	
			RoleName: roleName
		}
		return this.iam.listAttachedRolePolicies(params)
			.promise()
			.then(data => {
				if (data.AttachedPolicies) {
					const PolicyArns = data.AttachedPolicies.map(policy => policy.PolicyArn);
					return PolicyArns
				}
			})
			.catch(err => {
				throw new APIError(`${err} , listAttachedRolePolicies request went wrong`)
			});
	}

	async fetchPolicyInfo (policyNames: string[], roleName: string) {
	 	const policyDocument = policyNames.map(async name => {
			var params = {
				PolicyArn: name,
				VersionId: roleName
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
	}
}

function isStringArrayAndNotEmpty(x: any): x is Array<string> {
	if(x.length > 0) {
		return Array.isArray(x);
	} else {
		return false;
	}
}

const listiampolicy = new AttachedIAMPolicyCollector(iam);
(async () => {
		const policy = await listiampolicy.fetchAttachedPolicyArns("ec2-role")
		console.log(policy);
		if( isStringArrayAndNotEmpty(policy)) {
			const t = await listiampolicy.fetchPolicyInfo(policy,"v1");
			console.log(decodeURI(t[0].PolicyVersion.Document));
	}
	}
)();
