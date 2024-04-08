import { PartialType } from '@nestjs/mapped-types';
import { CreateLendingVaultDto } from './create-lending-vault.dto';

export class UpdateLendingVaultDto extends PartialType(CreateLendingVaultDto) { }
