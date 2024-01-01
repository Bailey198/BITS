import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
   
    @IsNotEmpty()
    body:string;

    @IsNotEmpty()
    productId:number;

    parentId:number
}