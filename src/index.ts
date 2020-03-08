#!/usr/bin/env node
'use strict'

import { IAM } from 'aws-sdk';
import { APIError } from './CustomError';

const iam = new IAM();

export class IAMRoleNameCollector {
	readonly iam: IAM
	roleNames: null | Promise<any>;

	constructor(iam: IAM) {
		this.iam = iam;
		this.roleNames = null;
	}

	async listRoleNames <T>() : Promise<T> {
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
	readonly iam: IAM;

	constructor(iam: IAM) {
		this.iam = iam;

	}

	async listAttachedPolicyArn (roleName: string) {
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

}
/*

listAttachedRolePolicies (roleNames: []) {
	roleNames.forEach(roleName => {
		const params = {
			RoleName: roleName
		}
		this.iam.listAttachedRolePolicies(params, (err, data) => {
			if (err) console.log(err, err.stack);
			else console.log(data)
		})			
	});

}

private listRolePolicies(roleName: string) {
	const params = {	
		RoleName: roleName	
	}
	this.iam.listAttachedRolePolicies(params, (err, data) => {
		if (err) console.log(err, err.stack);
		else console.log(data.AttachedPolicies)
	})		  
}
*/
const listiampolicy = new AttachedIAMPolicyCollector(iam);
(async () => console.log (await listiampolicy.getPolicyInfo(['ec2-role'])))();
