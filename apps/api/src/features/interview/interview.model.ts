import { Field, ID, ObjectType } from '@nestjs/graphql';

export type InterviewContactType = 'active' | 'passive';
export type InterviewPriority = 'low' | 'medium' | 'high';

@ObjectType()
export class Interview {
  @Field(() => ID)
  id: string;

  @Field()
  company: string;

  @Field()
  jobTitle: string;

  @Field({ nullable: true })
  jobDescription?: string;

  @Field(() => String)
  contactType: InterviewContactType;

  @Field(() => String, { nullable: true })
  priority?: InterviewPriority | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
