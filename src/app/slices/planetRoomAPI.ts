import MessageListData from '../../assets/dummy/data';
import {IMessage} from '../../models/message';

//just fake API

export function fetchMessage() {
  return new Promise<{data: IMessage[]}>(resolve =>
    setTimeout(() => resolve({data: MessageListData.messages}), 500),
  );
}
