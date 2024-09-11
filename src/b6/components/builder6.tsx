'use client';
import { BuilderComponent, useIsPreviewing } from '@builder6/react';
import DefaultErrorPage from 'next/error';
import '@builder6/widgets';

interface BuilderPageProps {
  content: any;
  data?: any;
}

export function RenderBuilderContent({ content, data }: BuilderPageProps) {

  if (content) {
    return <BuilderComponent content={content} data={data} model="page" />;
  }

  return <DefaultErrorPage statusCode={404} />;
}