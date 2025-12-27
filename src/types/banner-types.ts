export interface BannerBackground {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  page: string;
  site: string;
  bannerTitle: string;
  subtitle: string;
  backgroundId: string;
  createdAt: string;
  updatedAt: string;
  background: BannerBackground;
}
