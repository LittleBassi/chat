import { FindOperator, FindOptionsOrderValue } from 'typeorm';

export interface MessageParams {
  id?: number | FindOperator<number>;
  user_id?: number | FindOperator<number>;
  user_reciever_id?: number | FindOperator<number>;
  message_group_id?: number | FindOperator<number>;
  description?: string | FindOperator<string>;
  create_datetime?: Date | FindOperator<Date>;
  update_datetime?: Date | FindOperator<Date>;
}

export interface MessageOrder {
  id?: FindOptionsOrderValue;
  user_id?: FindOptionsOrderValue;
  user_reciever_id?: FindOptionsOrderValue;
  message_group_id?: FindOptionsOrderValue;
  description?: FindOptionsOrderValue;
  create_datetime?: FindOptionsOrderValue;
  update_datetime?: FindOptionsOrderValue;
}

export interface MessageParamsFilter {
  id?: number[];
  user_id?: number[];
  user_reciever_id?: number[];
  message_group_id?: number[];
  description?: string;
  start_create_datetime?: string;
  end_create_datetime?: string;
  start_update_datetime?: string;
  end_update_datetime?: string;
}
