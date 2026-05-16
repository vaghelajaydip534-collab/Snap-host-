export interface ImgBBResponse {
  data: {
    id: string;
    title: string;
    url: string;
    url_viewer: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      url: string;
    };
    medium?: {
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

export interface UploadHistoryItem {
  id: string;
  title: string;
  url: string;
  thumb_url: string;
  viewer_url: string;
  uploaded_at: number;
}
