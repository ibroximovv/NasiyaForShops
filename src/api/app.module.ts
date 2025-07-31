import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { DebtorModule } from './debtor/debtor.module';
import { PaymentModule } from './payment/payment.module';
import { DebtModule } from './debt/debt.module';
import { ExampleModule } from './example/example.module';
import { FileModule } from './file/file.module';
import { AppService } from './app.service';


@Module({
  imports: [PrismaModule, AdminModule, SellerModule, DebtorModule, PaymentModule, DebtModule, ExampleModule, FileModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
