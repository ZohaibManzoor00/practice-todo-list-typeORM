import { IsBoolean, IsString } from 'class-validator'

export class CreateTodoDto {
    @IsString()
    public description: string;

    @IsBoolean()
    public completed: boolean
}