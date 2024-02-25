import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthDecorator, Decorator, GetUser, UploadDecorator } from '@/utils/utils.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepositoryService } from './services/user.repository.service';
import { createOrder, stringIdsToArray } from '@/utils/utils.constants';
import { DeleteResult } from 'typeorm';
import { ApiQuery } from '@nestjs/swagger';
import { UserOrderColumn, UserOrderValue } from './entities/user.enum';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepositoryService: UserRepositoryService
  ) {}

  @Post()
  @Decorator('user', 'Cria um novo usuário')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepositoryService.findOne({ email: createUserDto.email });
    if (userExists) {
      throw new ConflictException('E-mail já existente!');
    }

    const newUser = await this.userService.create(createUserDto);
    if (!newUser) {
      throw new ConflictException('Erro ao cadastrar usuário');
    }
    return newUser;
  }

  @Get()
  @AuthDecorator()
  @ApiQuery({ name: 'id', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'start_create_datetime', required: false })
  @ApiQuery({ name: 'end_create_datetime', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'order_column', required: false })
  @ApiQuery({ name: 'order_value', required: false })
  @Decorator('user', 'Busca todos os usuários')
  async findAllWithFilters(
    @Query('id') id?: string,
    @Query('search') search?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('start_create_datetime') startCreateDatetime?: string,
    @Query('end_create_datetime') endCreateDatetime?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('order_column') orderColumn?: string,
    @Query('order_value') orderValue?: string
  ): Promise<User[] | [User[], number]> {
    let idsParams: number[] = [];
    if (search) {
      idsParams = await this.userService.findUserIdsBySearch(search);
    }
    if (id) {
      idsParams = [...idsParams, ...stringIdsToArray(id)];
    }
    const filters = await this.userService.createFilters({
      id: idsParams.length > 0 ? idsParams : null,
      name,
      email,
      start_create_datetime: startCreateDatetime,
      end_create_datetime: endCreateDatetime,
    });
    if (!filters) {
      throw new ConflictException('Falha ao aplicar filtros');
    }
    let order = null;
    if (orderColumn && orderValue) {
      const orderParam = createOrder(orderColumn, orderValue, UserOrderColumn, UserOrderValue);
      order = orderParam;
    }
    if ((skip || +skip === 0) && take) {
      return await this.userService.findByFiltersPaged(+skip, +take, filters, order);
    }
    return await this.userService.findByFilters(filters, order);
  }

  @Get(':id')
  @AuthDecorator()
  @Decorator('user', 'Busca usuário por ID')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOneInfo(+id);
    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }
    return user;
  }

  @Patch()
  @AuthDecorator('user-update-self')
  @UploadDecorator('file')
  @Decorator('user', 'Atualiza usuário logado')
  async updateSelf(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | null> {
    if (updateUserDto?.email && updateUserDto?.email !== user.email) {
      const userExists = await this.userRepositoryService.findOne({ email: updateUserDto.email });
      if (userExists) {
        throw new ConflictException('E-mail já existente!');
      }
    }
    return await this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @AuthDecorator()
  @Decorator('user', 'Remove o usuário logado (softDelete)')
  async remove(@GetUser() user: User): Promise<DeleteResult> {
    const deleteResult = await this.userRepositoryService.remove(+user.id);
    if (deleteResult?.affected === 0) {
      throw new ConflictException('Erro ao excluir usuário logado');
    }
    return deleteResult;
  }
}
