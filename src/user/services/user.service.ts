import { getEndDate, getStartDate, isANumber } from '@/utils/utils.constants';
import { Injectable } from '@nestjs/common';
import { Between, In, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryService } from './user.repository.service';
import { UserOrder, UserParams, UserParamsFilter } from '../entities/user.interface';
import { UserOrderColumnException, UserOrderValue } from '../entities/user.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = await this.userRepositoryService.create(createUserDto);
    await this.userRepositoryService.save(userEntity);
    const user = userEntity?.id
      ? await this.userRepositoryService.findOne({ id: userEntity.id })
      : null;
    return await this.userInfo(user);
  }

  async update(id: number, upateUserDto: UpdateUserDto): Promise<User> {
    const userEntity = await this.userRepositoryService.create(upateUserDto);
    await this.userRepositoryService.update(id, userEntity);
    const user = await this.userRepositoryService.findOne({ id });
    return await this.userInfo(user);
  }

  async createFilters(params: UserParamsFilter): Promise<UserParams> {
    const filters: UserParams = {};
    if (params.start_create_datetime && params.end_create_datetime) {
      const start = getStartDate(params.start_create_datetime.toString());
      const end = getEndDate(params.end_create_datetime.toString());
      filters.create_datetime = Between(start, end);
    }
    if (params.start_update_datetime && params.end_update_datetime) {
      const start = getStartDate(params.start_update_datetime.toString());
      const end = getEndDate(params.end_update_datetime.toString());
      filters.update_datetime = Between(start, end);
    }
    if (params.id?.length > 0) {
      filters.id = In(params.id);
    }
    if (params.name) {
      filters.name = Like(`%${params.name}%`);
    }
    if (params.email) {
      filters.email = Like(`%${params.email}%`);
    }
    return filters;
  }

  async findByFilters(filters: UserParams, order?: UserOrder): Promise<User[]> {
    const users = await this.userRepositoryService.find(filters, order);
    const result: User[] = [];
    for (const user of users) {
      const userInfo = await this.userInfo(user);
      result.push(userInfo);
    }
    return result;
  }

  async findByFiltersPaged(
    skip: number,
    take: number,
    filters: UserParams,
    order?: UserOrder
  ): Promise<[User[], number]> {
    const users = await this.userRepositoryService.findPaged(skip, take, filters, order);
    for (let user of users[0]) {
      user = await this.userInfo(user);
    }
    return users;
  }

  async findUserIdsBySearch(search: string): Promise<number[]> {
    const result: number[] = [];
    const usersBySearch = await this.userRepositoryService.find([
      { id: isANumber(search) ? +search : null },
      { name: Like(`%${search}%`) },
    ]);
    for (const user of usersBySearch) {
      result.push(user.id);
    }
    return result;
  }

  async findOneInfo(id: number): Promise<User> {
    const user = await this.userRepositoryService.findOne({ id });
    if (!user) {
      return null;
    }
    return await this.userInfo(user);
  }

  async userInfo(user: User): Promise<User> {
    delete user.password;
    return user;
  }

  async orderExceptionFunction(
    users: User[],
    orderColumn: string,
    orderValue: string
  ): Promise<User[]> {
    if (!users || users?.length === 0) {
      return [];
    }
    if (orderColumn === UserOrderColumnException.NAME) {
      if (orderValue === UserOrderValue.asc || orderValue === UserOrderValue.ASC) {
        return await this.orderUsersByNameAsc(users);
      }
      if (orderValue === UserOrderValue.desc || orderValue === UserOrderValue.DESC) {
        return await this.orderUsersByNameAsc(users);
      }
    }
    return users;
  }

  async orderUsersByNameAsc(users: User[]): Promise<User[]> {
    return users.sort(function (a: User, b: User): number {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name === b.name) {
        if (a.id >= b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
      }
      return 1;
    });
  }

  async orderUsersByNameDesc(users: User[]): Promise<User[]> {
    return users.sort(function (a: User, b: User): number {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      if (a.name === b.name) {
        if (a.id >= b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
      }
      return 1;
    });
  }
}
