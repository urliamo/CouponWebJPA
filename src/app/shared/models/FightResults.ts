import { Coupon } from './Coupon';

export class FightResults {
 public constructor(
	public opponentCoupon: Coupon,
    public customerCoupon: Coupon
 ){}
}