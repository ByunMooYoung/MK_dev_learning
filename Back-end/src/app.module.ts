import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AnimalModule } from './modules/animal/animal.module';

@Module({
  imports: [AnimalModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
