import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDTO {
    @ApiProperty() @IsNotEmpty() @IsAlpha() firstName: string;
    @ApiProperty() @IsNotEmpty() @IsAlpha() lastName: string;
    @ApiProperty() @IsNotEmpty() @IsEmail() email: string;
    @ApiProperty() @IsNotEmpty() @MinLength(8) password: string;
}