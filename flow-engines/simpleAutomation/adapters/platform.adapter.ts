export interface IPlatformAdapter {
  SendMessage: (data: SendMessageRequest) => Promise<SendMessageResult>;
}

export interface SendMessageRequest {

}

export interface SendMessageResult {

}