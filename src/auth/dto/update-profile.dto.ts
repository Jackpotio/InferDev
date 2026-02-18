import { IsBoolean, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  displayName?: string;

  @IsOptional()
  @IsBoolean()
  notifyResultSaved?: boolean;

  @IsOptional()
  @IsBoolean()
  notifyPremium?: boolean;

  @IsOptional()
  @IsIn(['free', 'premium'])
  plan?: 'free' | 'premium';
}
