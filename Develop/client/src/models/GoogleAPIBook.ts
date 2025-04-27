export interface GoogleAPIVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  infoLink?: string; // Added infoLink
}

export interface GoogleAPIBook {
  id: string;
  volumeInfo: GoogleAPIVolumeInfo;
}