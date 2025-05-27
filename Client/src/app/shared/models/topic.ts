export interface Topic {
  topicId: number;
  name: string;
  description: string;
}

export interface TopicCreateDto {
  name: string;
  description: string;
}

export interface TopicReadDto {
  topicId: number;
  name: string;
  description: string;
}

export interface TopicUpdateDto {
  name?: string;
  description?: string;
}
