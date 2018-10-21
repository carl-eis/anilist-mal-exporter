export interface AnimeListResponse {
  data: {
    MediaListCollection: MediaListCollection;
  };
}

interface MediaListCollection {
  lists: List[];
  user: User;
}

interface User {
  id: number;
  name: string;
  avatar: Avatar;
  mediaListOptions: MediaListOptions;
}

interface MediaListOptions {
  scoreFormat: string;
  rowOrder: string;
}

interface Avatar {
  large: string;
}

interface List {
  name: string;
  isCustomList: boolean;
  isSplitCompletedList: boolean;
  entries: Entry[];
}

interface Entry {
  id: number;
  score: number;
  scoreRaw: number;
  progress: number;
  progressVolumes?: any;
  repeat: number;
  private: boolean;
  priority: number;
  notes?: any;
  hiddenFromStatusLists: boolean;
  startedAt: StartedAt;
  completedAt: StartedAt;
  updatedAt: number;
  createdAt: number;
  media: Media;
}

interface Media {
  id: number;
  title: Title;
}

interface Title {
  userPreferred: string;
}

interface StartedAt {
  year?: any;
  month?: any;
  day?: any;
}