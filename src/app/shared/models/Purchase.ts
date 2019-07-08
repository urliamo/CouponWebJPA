import { Coupon } from './Coupon';
import { Customer } from './Customer';

export class Purchase {
 public constructor(
    public coupon: Coupon,
	public amount: number,
	public customer: Customer,
	public date?: string,
	public purchaseId?: number,

 ){}
}