import { Test, TestingModule } from '@nestjs/testing';
import { InterviewRepository } from './interview.repository';

describe('InterviewRepository', () => {
  let service: InterviewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewRepository],
    }).compile();

    service = module.get<InterviewRepository>(InterviewRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
