import { ClientType } from './ClientType';
import { Company } from './Company';


export class User {
 public constructor(
    public userName: string,
	public email: string,
	public password: string,
	public userId?: number,
	public type?:ClientType,
    public company?: Company
 ){}
}