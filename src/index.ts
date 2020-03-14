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
	constructor(readonly iam: IAM) {
	}

	async listAttachedPolicies (roleName: string) {
		const params = {	
			RoleName: roleName
		}
		return this.iam.listAttachedRolePolicies(params)
			.promise()
			.then(data => {
				if (data.AttachedPolicies) {
					const PolicyNames = data.AttachedPolicies.map(policy => policy.PolicyName);
					return PolicyNames
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
(async () => console.log (await listiampolicy.listAttachedPolicies('ec2-role')))();
