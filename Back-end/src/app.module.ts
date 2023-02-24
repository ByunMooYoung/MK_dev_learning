import { Module } from '@nestjs/common';
import { KindagooseModule } from 'kindagoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './modules/attendance/attendance.module';

const dbUrl = `mongodb+srv://dango11371137:11371137@dango1.n7vxk0j.mongodb.net/test`;

@Module({
  imports: [AttendanceModule, KindagooseModule.forRoot(dbUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
