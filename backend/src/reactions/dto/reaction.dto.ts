import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateReactionDto {
  @IsUUID()
  projectId: string;

  @IsString()
  type: string; // 'like', 'dislike', 'comment', 'share', 'joker'

  @IsOptional()
  @IsString()
  content?: string; // Pour les commentaires
}