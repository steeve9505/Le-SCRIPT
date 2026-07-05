import { IsUUID, IsString, IsUrl } from 'class-validator';

export class CreateStreamingLinkDto {
  @IsUUID()
  projectId: string;

  @IsString()
  platform: string; // spotify, apple_music, youtube_music, etc.

  @IsUrl()
  url: string;
}