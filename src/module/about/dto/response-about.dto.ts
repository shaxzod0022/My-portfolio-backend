export class AboutResponseDto {
  _id!: string;
  title!: string;
  description!: string;
  image!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export interface AboutFullLanguage {
  _id: string;
  trTitle: {
    uz: { title: string };
    ru: { title: string };
    en: { title: string };
  };
  trDes: {
    uz: { title: string };
    ru: { title: string };
    en: { title: string };
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUpdateResponse {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
