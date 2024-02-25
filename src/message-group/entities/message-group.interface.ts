import { FindOperator, FindOptionsOrderValue } from 'typeorm';

export interface MessageGroupParams {
  id?: number | FindOperator<number>;
  user_id?: number | FindOperator<number>;
  name?: string | FindOperator<string>;
  description?: string | FindOperator<string>;
  create_datetime?: Date | FindOperator<Date>;
  update_datetime?: Date | FindOperator<Date>;
}

export interface MessageGroupOrder {
  id?: FindOptionsOrderValue;
  user_id?: FindOptionsOrderValue;
  name?: FindOptionsOrderValue;
  description?: FindOptionsOrderValue;
  create_datetime?: FindOptionsOrderValue;
  update_datetime?: FindOptionsOrderValue;
}

export interface MessageGroupParamsFilter {
  id?: number[];
  user_id?: number[];
  name?: string;
  description?: string;
  start_create_datetime?: string;
  end_create_datetime?: string;
  start_update_datetime?: string;
  end_update_datetime?: string;
}
