#!/usr/bin/env node

import { IAM } from "aws-sdk";

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
const iam = new IAM();

const listiamrole = new IAMRoleNameCollector(iam);

(async () => console.log (await listiamrole.listRoleNames()))();