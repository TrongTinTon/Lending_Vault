import { Test, TestingModule } from '@nestjs/testing';
import { LendingVaultService } from './lending-vault.service';


describe('LendingVaultService', () => {
  let service: LendingVaultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LendingVaultService],
    }).compile();

    service = module.get<LendingVaultService>(LendingVaultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
