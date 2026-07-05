import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  artistName: string;

  @IsOptional()
  @IsString()
  musicalCategory?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  artistName?: string;

  @IsOptional()
  @IsString()
  musicalCategory?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}