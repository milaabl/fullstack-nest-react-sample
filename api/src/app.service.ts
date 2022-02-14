import { Model } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AppState } from './config/schemas/app-state.schema';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectModel(AppState.name) private readonly appStateModel: Model<AppState>) {}

  onModuleInit() {
    this.initAppState();
  }

  async getAppState(): Promise<AppState> {
    return this.appStateModel.findOne().exec();
  }

  private async initAppState() {
    let appState: AppState = await this.getAppState();

    if (!appState) {
      appState = new this.appStateModel({});
      appState.save();
    }
  }
}
