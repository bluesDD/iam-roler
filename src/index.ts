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

	async fetchPolicyInfo (roleNames: string[]) {
	 	const te = roleNames.map(async name => {
			var params = {
				PolicyArn: name
			};
			try {
				return  await this.iam.getPolicy(params).promise();
			} catch (err) {
				throw new APIError(`${err} , getPolicy request went wrong`)
			}
		})
		return Promise.all(te);
		
	}
}

const listiampolicy = new AttachedIAMPolicyCollector(iam);
(async () => {
		const t = await listiampolicy.fetchPolicyInfo(['arn:aws:iam::aws:policy/AmazonEC2FullAccess']);
		console.log(t);
	}
)();
