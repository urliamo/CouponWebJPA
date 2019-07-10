import {Coupon} from './Coupon';

export class FightResults {
 public constructor(
    public customerCoupon: Coupon,
    public opponentCoupon: Coupon
 ){}
}