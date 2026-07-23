export interface SendMessageConfigNode {
  message: string;
  buttons: Array<{
    id: string;
    text: string;
    nextNode: string;
  }>
}