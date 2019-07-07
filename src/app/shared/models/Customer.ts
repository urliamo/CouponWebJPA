import { User } from './User';

export class Customer {
 public constructor(
    public firstName: string,
	public lastName: string,
	public id?: number,
    public user?: User
 ){}
}