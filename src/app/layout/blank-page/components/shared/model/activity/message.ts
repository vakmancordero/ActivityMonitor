import {Module} from './module';

export class Message {
  id: number;
  message: string;
  module: Module;
  statusId: number;
  status: string;
}
