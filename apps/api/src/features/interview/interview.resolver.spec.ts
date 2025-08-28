import { Test, TestingModule } from '@nestjs/testing';
import { InterviewResolver } from './interview.resolver';

describe('InterviewResolver', () => {
  let resolver: InterviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewResolver],
    }).compile();

    resolver = module.get<InterviewResolver>(InterviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
