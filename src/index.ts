#!/usr/bin/env node

import { IAM } from "aws-sdk";

class ListIamRole {
	readonly iam: IAM

	constructor(iam: IAM) {
		this.iam = iam;
	}

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
			
	listRoleNames () {
		this.iam.listRoles((err, data) => {
			if (err) console.log(err, err.stack);
			else { 
				const roleNames = data.Roles.map(roleInfo => {
					return roleInfo.RoleName
				});
				roleNames.forEach(roleName => {
          this.listRolePolicies(roleName);
        });   
			}
		})
	}
}

const iam = new IAM();

const listiamrole = new ListIamRole(iam);

listiamrole.listRoleNames();