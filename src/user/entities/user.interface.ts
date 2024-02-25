import { FindOperator, FindOptionsOrderValue } from 'typeorm';

export interface UserParams {
  id?: number | FindOperator<number>;
  name?: string | FindOperator<string>;
  email?: string | FindOperator<string>;
  create_datetime?: Date | FindOperator<Date>;
  update_datetime?: Date | FindOperator<Date>;
}

export interface UserOrder {
  id?: FindOptionsOrderValue;
  name?: FindOptionsOrderValue;
  email?: FindOptionsOrderValue;
  create_datetime?: FindOptionsOrderValue;
  update_datetime?: FindOptionsOrderValue;
}

export interface UserParamsFilter {
  id?: number[];
  name?: string;
  email?: string;
  start_create_datetime?: string;
  end_create_datetime?: string;
  start_update_datetime?: string;
  end_update_datetime?: string;
}
