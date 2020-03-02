#!/usr/bin/env node

import { IAM } from "aws-sdk";

const iam = new IAM();

export class IAMRoleNameCollector {
	readonly iam: IAM
	roleNames: null | Promise<any>;

	constructor(iam: IAM) {
		this.iam = iam;
		this.roleNames = null;
	}

	async listRoleNames () {
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

	async listAttachedPolicies (roleNames: any) {
		const params = {	
			RoleName: roleNames
		}
		return this.iam.listAttachedRolePolicies(params)
			.promise()
			.then(data => data.AttachedPolicies[0].PolicyName)
			.catch(err => err);
	}

}
/*
roleNames.forEach(roleName => {
	this.listRolePolicies(roleName);
});  

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
(async () => console.log (await listiampolicy.listAttachedPolicies('CdkWorkshopStack-HelloHandlerServiceRole11EF7C63-1HS3I653KNLZY')))();
