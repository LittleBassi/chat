import { FindOperator, FindOptionsOrderValue } from 'typeorm';

export interface MessageUserGroupParams {
  id?: number | FindOperator<number>;
  user_id?: number | FindOperator<number>;
  message_group_id?: number | FindOperator<number>;
  create_datetime?: Date | FindOperator<Date>;
  update_datetime?: Date | FindOperator<Date>;
}

export interface MessageUserGroupOrder {
  id?: FindOptionsOrderValue;
  user_id?: FindOptionsOrderValue;
  message_group_id?: FindOptionsOrderValue;
  create_datetime?: FindOptionsOrderValue;
  update_datetime?: FindOptionsOrderValue;
}

export interface MessageUserGroupParamsFilter {
  id?: number[];
  user_id?: number[];
  message_group_id?: number[];
  start_create_datetime?: string;
  end_create_datetime?: string;
  start_update_datetime?: string;
  end_update_datetime?: string;
}
