export interface EventModel {
  id: string;
  name: string;
  description: string;
  image: string;
  bannerImageUrl: string;
  tagline: string;
  location: string;
  category: string;
  slug: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  organization: {
    id: string;
    name: string;
  };
}