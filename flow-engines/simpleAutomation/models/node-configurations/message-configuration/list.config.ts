export interface SendListConfigNode {
  title: string;
  buttonOpenText: string;
  list: {
    title: string;
    buttonTitle: string;
    sections: Array<{
      sectionTitle: string,
      options: Array<{
        title: string;
        description?: string;
        id: string;
        nextNode?: string | null;
      }>
    }>
  },
}