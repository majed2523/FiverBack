// libs/common/decorators/role.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client'; // assuming your Prisma generated Role enum

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
