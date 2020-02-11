import { IAM } from "aws-sdk";

class ListIamRole {
	readonly iam: IAM

	constructor(iam: IAM) {
		this.iam = iam;
	}

	listAttachedRolePolicies () {
		this.iam.listAttachedRolePolicies((err, data) => {
			if (err) console.log(err, err.stack);
			else console.log(data)
		})
	}

	listRoleNames () {
		this.iam.listRoles((err, data) => {
			if (err) console.log(err, err.stack);
			else { 
				const roleNames = data.Roles.map(roleInfo => {
					return roleInfo.RoleName
				});
				console.log(roleNames);
			}
		})
	}
}

const iam = new IAM();

const listiamrole = new ListIamRole(iam);

listiamrole.listRoleNames();