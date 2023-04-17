import { ApiProperty } from '@nestjs/swagger';

export class GetUsersParams {

  @ApiProperty({ description: 'Pagination limit' })
  readonly limit?: number;

  @ApiProperty({ description: 'Pagination offset' })
  readonly offset?: number;

  @ApiProperty({ description: 'Order by field' })
  readonly orderBy?: string;

  @ApiProperty({ description: 'Order type: ASC, DESC' })
  readonly orderType?: string;
}
