import { Test, TestingModule } from '@nestjs/testing';
import { LendingVaultController } from './lending-vault.controller';
import { LendingVaultService } from './lending-vault.service';

describe('LendingVaultController', () => {
  let controller: LendingVaultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LendingVaultController],
      providers: [LendingVaultService],
    }).compile();

    controller = module.get<LendingVaultController>(LendingVaultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
