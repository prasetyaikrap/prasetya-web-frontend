export type PageProps = {
  params: {
    slug?: string[] | string;
  };
};

export type GenerateMetadataProps = {
  params: { slug?: string[] | string };
  searchParams: { [key: string]: string | string[] | undefined };
};
