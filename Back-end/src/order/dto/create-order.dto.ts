import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateOrderDto {

    @IsNotEmpty()
    orderTotal:number;

    @IsNotEmpty()
    address:string;

    status:number;

    user:User;
}